/**
 * Command-line build: one Dutch address in, a four-page A4 handbook out.
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
import { geocode } from './lib/pdok.mjs';
import { collect } from './collect.mjs';
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

console.log(`Adres: ${query}`);
const address = await geocode(query);
console.log(`  ->   ${address.label}`);
// PDOK matches loosely: a house number that does not exist silently becomes a neighbour
const asked = query.match(/\d+/)?.[0];
if (asked && address.houseNumber != null && String(address.houseNumber) !== asked) console.log(`  LET OP: gevraagd huisnummer ${asked}, gevonden ${address.houseNumber}`);
const data = await collect(address, household, console.log);
const features = data.mapFeatures;

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
  // four pages are expected; more means a page overflowed
  const pages = (readFileSync(pdf, 'latin1').match(/\/Type\s*\/Page\b/g) ?? []).length;
  console.log(`PDF: ${pdf}${pages !== 4 ? `  LET OP: ${pages} pagina's, de opmaak loopt over` : ''}`);
} else {
  console.log(`Geen Chrome gevonden; open ${htmlFile} en print naar PDF.`);
}
