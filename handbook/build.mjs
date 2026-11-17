/**
 * Phase 0 proof: one Dutch address in, one A4 handbook page out.
 *
 *   node handbook/build.mjs "Coolsingel 40, Rotterdam" --adults 2 --children 1 --pets 0
 *
 * Writes handbook/out/<slug>.json, .html and .pdf. That folder is not
 * committed, because it contains addresses.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { geocode, elevation, floodRisk, safetyRegion } from './lib/pdok.mjs';
import { nearby, emergencyHospitals, mapFeatures, route } from './lib/osm.mjs';
import { renderHtml } from './render.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const query = args.find((a) => !a.startsWith('--'));
if (!query) throw new Error('Geef een adres op, bijvoorbeeld: node handbook/build.mjs "Coolsingel 40, Rotterdam"');
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? Number(args[i + 1]) : dflt;
};
const household = { adults: flag('adults', 2), children: flag('children', 0), pets: flag('pets', 0) };

const step = async (label, fn, fallback) => {
  const t = Date.now();
  try {
    const v = await fn();
    console.log(`  ok   ${label} (${((Date.now() - t) / 1000).toFixed(1)} s)`);
    return v;
  } catch (err) {
    console.log(`  FAIL ${label}: ${err.message}`);
    return fallback;
  }
};

console.log(`Adres: ${query}`);
const address = await geocode(query);
console.log(`  ->   ${address.label}`);
const [elev, flood, region] = await Promise.all([
  step('hoogte (AHN)', () => elevation(address), null),
  step('overstromingsrisicogebied', () => floodRisk(address), []),
  step('veiligheidsregio', () => safetyRegion(address), null),
]);
const near = await step('punten in de buurt (OpenStreetMap)', () => nearby(address), null);
const hospitals = await step('spoedeisende hulp (OpenStreetMap)', () => emergencyHospitals(address), []);
const area = await step('kaartgegevens (OpenStreetMap)', () => mapFeatures(address), null);
const features = area?.ways ?? null;
// Inside the map square the map data is complete; beyond it only the search service knows more.
if (near && area) for (const [kind, list] of Object.entries(area.pois)) if (list.length) near[kind] = list;

for (const h of hospitals.slice(0, 2)) h.drive = await route(address, h, 'driving');
if (near) for (const list of Object.values(near)) {
  const first = list[0];
  if (!first) continue;
  first.walk = await route(address, first, 'walking');
  // beyond two kilometres nobody walks for groceries; give the cycling time as well
  if (first.walk && first.walk.metres > 2000) first.bike = await route(address, first, 'cycling');
}

const regions = JSON.parse(readFileSync(join(here, 'data', 'regions-nl.json'), 'utf8'));
const data = {
  generated: new Date().toISOString(),
  address,
  household,
  elevation: elev,
  floodRisk: flood,
  safetyRegion: region,
  region: regions.regions[region] ?? null,
  nearby: near,
  hospitals,
  mapFeatures: features,
};

const out = join(here, 'out');
mkdirSync(out, { recursive: true });
const slug = address.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
writeFileSync(join(out, `${slug}.json`), JSON.stringify({ ...data, mapFeatures: features ? `${features.length} ways` : null }, null, 2));
const htmlFile = join(out, `${slug}.html`);
writeFileSync(htmlFile, renderHtml(data));

const chrome = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (chrome) {
  const pdf = join(out, `${slug}.pdf`);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, pathToFileURL(htmlFile).href], { stdio: 'ignore' });
  // the proof is one page; more than one means the layout overflowed
  const pages = (readFileSync(pdf, 'latin1').match(/\/Type\s*\/Page\b/g) ?? []).length;
  console.log(`PDF: ${pdf}${pages > 1 ? `  LET OP: ${pages} pagina's, de opmaak loopt over` : ''}`);
} else {
  console.log(`Geen Chrome gevonden; open ${htmlFile} en print naar PDF.`);
}
