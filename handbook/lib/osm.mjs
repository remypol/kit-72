/**
 * OpenStreetMap lookups for the proof.
 *
 * The public Overpass servers were all down when this was written (502s and
 * timeouts), so the proof uses three other public OSM services instead:
 *   - Photon (reverse search with a tag filter) for the nearest shop, pharmacy…
 *   - the OSM map API for the streets drawn on the map
 * None of these is meant for production traffic. A product needs its own
 * extract of OpenStreetMap, refreshed on a schedule.
 */
import { getJson, metres } from './http.mjs';

const KINDS = {
  supermarket: ['shop:supermarket', 5],
  pharmacy: ['amenity:pharmacy', 8],
  defibrillator: ['emergency:defibrillator', 3],
  drinking_water: ['amenity:drinking_water', 5],
  doctors: ['amenity:doctors', 8],
  fuel: ['amenity:fuel', 8],
};

/** Nearest points of interest per kind, nearest first. */
export async function nearby(home) {
  const entries = await Promise.all(
    Object.entries(KINDS).map(async ([kind, [tag, radiusKm]]) => {
      const url = `https://photon.komoot.io/reverse?lat=${home.lat}&lon=${home.lon}&radius=${radiusKm}&limit=5&osm_tag=${tag}`;
      let features = [];
      try {
        features = (await getJson(url)).features ?? [];
      } catch {
        /* one missing kind should not sink the page */
      }
      const list = features
        .map((f) => {
          const p = f.properties;
          const pos = { lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0] };
          return { name: p.name ?? null, street: p.street ? `${p.street} ${p.housenumber ?? ''}`.trim() : null, city: p.city ?? null, ...pos, dist: metres(home, pos) };
        })
        .sort((x, y) => x.dist - y.dist);
      return [kind, list];
    }),
  );
  return Object.fromEntries(entries);
}

/**
 * Everything in a square around the home from the OSM map API: the streets,
 * water and woods drawn on the map, and every tagged point of interest.
 */
export async function mapFeatures(home, radius = 1150) {
  const dLat = radius / 111320;
  const dLon = radius / (111320 * Math.cos((home.lat * Math.PI) / 180));
  const elements = [];
  // The map API refuses boxes with more than 50,000 nodes; split into quarters when that happens.
  async function load(w, s, e, n, depth = 0) {
    const bbox = [w, s, e, n].map((v) => v.toFixed(5)).join(',');
    try {
      const d = await getJson(`https://api.openstreetmap.org/api/0.6/map.json?bbox=${bbox}`, { timeoutMs: 60000 });
      elements.push(...d.elements);
    } catch (err) {
      if (depth >= 3 || !/400/.test(err.message)) throw err;
      const mx = (w + e) / 2;
      const my = (s + n) / 2;
      await Promise.all([[w, s, mx, my], [mx, s, e, my], [w, my, mx, n], [mx, my, e, n]].map((q) => load(...q, depth + 1)));
    }
  }
  await load(home.lon - dLon, home.lat - dLat, home.lon + dLon, home.lat + dLat);

  const nodes = new Map();
  for (const e of elements) if (e.type === 'node') nodes.set(e.id, { lat: e.lat, lon: e.lon });
  const seen = new Set();
  const ways = [];
  const pois = Object.fromEntries(Object.keys(KINDS).map((k) => [k, []]));
  const kindOf = (t) => (t.shop === 'supermarket' ? 'supermarket' : t.emergency === 'defibrillator' ? 'defibrillator' : pois[t.amenity] ? t.amenity : null);
  for (const e of elements) {
    if (seen.has(e.type + e.id)) continue;
    seen.add(e.type + e.id);
    const t = e.tags ?? {};
    const line = e.type === 'way' ? e.nodes.map((id) => nodes.get(id)).filter(Boolean) : null;
    // every tagged point in the box, named or not: this is complete where the search service is not
    const kind = kindOf(t);
    const pos = e.type === 'node' ? { lat: e.lat, lon: e.lon } : line?.[0];
    if (kind && pos) {
      pois[kind].push({ name: t.name ?? t.operator ?? t['defibrillator:location'] ?? null, street: t['addr:street'] ? `${t['addr:street']} ${t['addr:housenumber'] ?? ''}`.trim() : null, ...pos, dist: metres(home, pos) });
    }
    if (!line || line.length < 2) continue;
    if (t.highway || t.waterway || t.natural === 'water' || t.railway === 'rail' || t.landuse === 'forest' || t.natural === 'wood') ways.push({ tags: t, line });
  }
  for (const list of Object.values(pois)) list.sort((x, y) => x.dist - y.dist);
  return { ways, pois };
}

/** Driving or walking distance and time from the public OSRM servers. */
export async function route(from, to, mode = 'driving') {
  const host = { walking: 'https://routing.openstreetmap.de/routed-foot', cycling: 'https://routing.openstreetmap.de/routed-bike' }[mode] ?? 'https://router.project-osrm.org';
  const profile = { walking: 'foot', cycling: 'bike' }[mode] ?? 'driving';
  try {
    const d = await getJson(`${host}/route/v1/${profile}/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`);
    const r = d.routes?.[0];
    return r ? { metres: r.distance, minutes: r.duration / 60 } : null;
  } catch {
    return null;
  }
}
