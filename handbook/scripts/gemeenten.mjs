#!/usr/bin/env node
/**
 * Builds src/data/gemeenten-nl.json: the facts behind the page per
 * municipality on the site (/nl/noodplan/<gemeente>/).
 *
 *   node handbook/scripts/gemeenten.mjs
 *
 * Per municipality: safety region and emergency broadcaster, the two nearest
 * emergency departments, water boards, and a sample of 16 inhabited points
 * that gives the share lying in a flood-risk area and the range of ground
 * levels. The sample is seeded by the municipality code, so a re-run gives
 * the same points. Sources: CBS (borders, safety regions), PDOK Locatieserver,
 * AHN, Rijkswaterstaat flood-risk areas, and the RIVM table in
 * handbook/data/seh-nl.json. Takes a few minutes; answers are cached on disk.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { getJson, metres } from '../lib/http.mjs';
import { elevationAt, floodRisk, safetyRegion } from '../lib/pdok.mjs';

const SAMPLES = 16;
const WFS = 'https://service.pdok.nl/cbs/gebiedsindelingen/2025/wfs/v1_0?service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&typeName=gebiedsindelingen:gemeente_gegeneraliseerd';
const LS = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1';
const regions = JSON.parse(readFileSync(new URL('../data/regions-nl.json', import.meta.url), 'utf8'));
const seh = JSON.parse(readFileSync(new URL('../data/seh-nl.json', import.meta.url), 'utf8'));

// At most this many requests to PDOK at once.
let running = 0;
const waiting = [];
async function limited(fn) {
  if (running >= 20) await new Promise((r) => waiting.push(r));
  running++;
  try {
    return await fn();
  } finally {
    running--;
    waiting.shift()?.();
  }
}
const retry = async (fn, tries = 3) => {
  for (let i = 0; ; i++) {
    try {
      return await limited(fn);
    } catch (err) {
      if (i >= tries - 1) throw err;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
};

// RIVM writes some place names in registry style.
const PLACE = { 'Hoorn Nh': 'Hoorn', 's-Gravenhage': 'Den Haag', 's-Hertogenbosch': '’s-Hertogenbosch', 'Capelle a/d IJssel': 'Capelle aan den IJssel', 'Bergen Op Zoom': 'Bergen op Zoom', 'Amsterdam Zuidoost': 'Amsterdam' };
const PROVINCE = { 'L.': 'Limburg', 'NH.': 'Noord-Holland', 'O.': 'Overijssel', 'Z.': 'Zeeland', 'ZH.': 'Zuid-Holland', 'Gld.': 'Gelderland', 'NB.': 'Noord-Brabant', 'U.': 'Utrecht', 'Gr.': 'Groningen', 'Fr.': 'Fryslân', 'Dr.': 'Drenthe' };
const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const point = (wkt) => {
  const [lon, lat] = wkt.match(/-?\d+\.\d+/g).map(Number);
  return { lat, lon };
};

function rng(seed) {
  let a = [...seed].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const inRing = (p, ring) => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > p.lat !== yj > p.lat && p.lon < ((xj - xi) * (p.lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};
const inMulti = (p, polys) => polys.some((poly) => inRing(p, poly[0]) && !poly.slice(1).some((hole) => inRing(p, hole)));

async function one(feature) {
  const code = feature.properties.statcode;
  const name = feature.properties.statnaam;
  const polys = feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates];
  const all = polys.flatMap((poly) => poly[0]);
  const box = { w: Math.min(...all.map((c) => c[0])), e: Math.max(...all.map((c) => c[0])), s: Math.min(...all.map((c) => c[1])), n: Math.max(...all.map((c) => c[1])) };

  // Where "the centre" is: the place that carries the municipality's name, or else its largest place
  // by number of addresses. The point itself is the address nearest that place's middle, so it is
  // always on land and inside the municipality (some places' middles lie in the IJsselmeer).
  const gm = code.slice(2);
  const places = (await retry(() => getJson(`${LS}/free?rows=100&fq=type:woonplaats&fq=gemeentecode:${gm}&q=*:*&fl=woonplaatsnaam,provincienaam,centroide_ll`))).response.docs;
  const base = name.replace(/\s*\(.*\)$/, '');
  let main = places.find((d) => d.woonplaatsnaam === name) ?? places.find((d) => d.woonplaatsnaam.replace(/\s*\(.*\)$|\s+(L|NH|O|Z|ZH|Gld|NB|U)\.?$/, '') === base);
  if (!main && places.length) {
    const counted = await Promise.all(
      places.map(async (d) => ({ d, n: (await retry(() => getJson(`${LS}/free?rows=0&fq=type:adres&fq=gemeentecode:${gm}&fq=woonplaatsnaam:${encodeURIComponent(`"${d.woonplaatsnaam}"`)}&q=*:*`))).response.numFound })),
    );
    main = counted.sort((x, y) => y.n - x.n)[0].d;
  }
  const province = main?.provincienaam ?? places[0]?.provincienaam ?? null;
  const middle = main ? point(main.centroide_ll) : { lat: (box.s + box.n) / 2, lon: (box.w + box.e) / 2 };
  const anchor = (await retry(() => getJson(`${LS}/reverse?lat=${middle.lat}&lon=${middle.lon}&type=adres&rows=1&distance=20000&fq=gemeentecode:${gm}&fl=woonplaatsnaam,centroide_ll`))).response.docs[0];
  const centre = { ...(anchor ? point(anchor.centroide_ll) : middle), place: (main?.woonplaatsnaam ?? anchor?.woonplaatsnaam ?? name).replace(/\s*\(.*\)$|\s+(L|NH|O|Z|ZH|Gld|NB|U)\.?$/, '') };

  // Sample: random points inside the border that have a house within 400 m.
  // Candidates are drawn in a fixed order and checked a batch at a time; the first 16 that qualify are kept,
  // so the result does not depend on which request answers first.
  const rand = rng(code);
  const samples = [];
  for (let tries = 0; samples.length < SAMPLES && tries < 240; ) {
    const batch = [];
    while (batch.length < 12 && tries < 240) {
      const p = { lat: box.s + rand() * (box.n - box.s), lon: box.w + rand() * (box.e - box.w) };
      tries++;
      if (inMulti(p, polys)) batch.push(p);
    }
    const docs = await Promise.all(batch.map((p) => retry(() => getJson(`${LS}/reverse?lat=${p.lat.toFixed(6)}&lon=${p.lon.toFixed(6)}&type=adres&rows=1&distance=400&fl=waterschapsnaam,gemeentenaam`)).then((d) => d.response.docs[0]).catch(() => null)));
    batch.forEach((p, i) => {
      if (docs[i] && samples.length < SAMPLES) samples.push({ ...p, waterBoard: docs[i].waterschapsnaam ?? null });
    });
  }
  const measured = await Promise.all(
    samples.map(async (p) => ({
      region: await retry(() => safetyRegion(p)).catch(() => null),
      flood: await retry(() => floodRisk(p)).catch(() => null),
      level: await limited(() => elevationAt(p)),
      waterBoard: p.waterBoard,
    })),
  );
  const floodKnown = measured.filter((m) => m.flood !== null);
  const levels = measured.map((m) => m.level).filter((v) => v != null).sort((a, b) => a - b);
  const types = [...new Set(floodKnown.flatMap((m) => m.flood).map((t) => t.replace(/^\S+ type (\w) - /, '$1: ')))].sort();
  const boards = {};
  for (const m of measured) if (m.waterBoard) boards[m.waterBoard] = (boards[m.waterBoard] ?? 0) + 1;

  // The safety region at the centre; if that lookup comes back empty, the one most sample points agree on.
  const votes = {};
  for (const m of measured) if (m.region) votes[m.region] = (votes[m.region] ?? 0) + 1;
  const region = (await retry(() => safetyRegion(centre)).catch(() => null)) ?? Object.entries(votes).sort((x, y) => y[1] - x[1])[0]?.[0] ?? null;
  const info = regions.regions[region] ?? null;
  const nearest = seh.locations.map((x) => ({ name: x.name, place: PLACE[x.place] ?? x.place, allDay: x.allDay, km: Math.round(metres(centre, x) / 100) / 10 })).sort((a, b) => a.km - b.km);
  const first = nearest[0];
  const second = first.allDay ? nearest[1] : nearest.find((x) => x.allDay);

  return {
    code,
    // CBS marks namesakes as "Bergen (NH.)"; the site writes the province out
    name: name.replace(/\((\w+\.)\)$/, (m, k) => (PROVINCE[k] ? `(${PROVINCE[k]})` : m)),
    slug: slugify(name),
    province,
    centre: { lat: Number(centre.lat.toFixed(5)), lon: Number(centre.lon.toFixed(5)), place: centre.place },
    region,
    broadcaster: info?.broadcaster ?? null,
    regionWebsite: info?.website ?? null,
    waterBoards: Object.entries(boards).sort((a, b) => b[1] - a[1]).map(([n]) => n.replace(/^Waterschap |^Hoogheemraadschap (van )?|^Wetterskip /, '')),
    seh: [first, second],
    flood: { sampled: floodKnown.length, inZone: floodKnown.filter((m) => m.flood.length).length, types },
    level: levels.length ? { n: levels.length, min: Math.round(levels[0] * 10) / 10, max: Math.round(levels.at(-1) * 10) / 10, median: Math.round(levels[Math.floor(levels.length / 2)] * 10) / 10 } : null,
  };
}

const features = (await getJson(WFS, { timeoutMs: 120000 })).features;
console.log(`${features.length} gemeenten`);
const out = [];
let done = 0;
// five municipalities at a time; the limiter above caps the requests underneath
const queue = [...features];
await Promise.all(
  Array.from({ length: 5 }, async () => {
    for (let f = queue.shift(); f; f = queue.shift()) {
      try {
        out.push(await one(f));
      } catch (err) {
        console.log(`FOUT ${f.properties.statnaam}: ${err.message}`);
      }
      if (++done % 20 === 0) console.log(`${done} / ${features.length}`);
    }
  }),
);

out.sort((a, b) => a.name.localeCompare(b.name, 'nl'));
for (const g of out) {
  g.neighbours = out.filter((o) => o !== g).map((o) => ({ slug: o.slug, d: metres(g.centre, o.centre) })).sort((a, b) => a.d - b.d).slice(0, 6).map((o) => o.slug);
}
const slugs = new Set(out.map((g) => g.slug));
if (slugs.size !== out.length) throw new Error('Dubbele slug');
writeFileSync(new URL('../../src/data/gemeenten-nl.json', import.meta.url), JSON.stringify({ checked: new Date().toISOString().slice(0, 10), samplesPerMunicipality: SAMPLES, gemeenten: out }, null, 1) + '\n');
console.log(`Klaar: ${out.length} gemeenten, ${out.filter((g) => !g.region).length} zonder regio, ${out.filter((g) => !g.level).length} zonder hoogte, ${out.filter((g) => g.flood.sampled < SAMPLES).length} met minder dan ${SAMPLES} meetpunten`);
