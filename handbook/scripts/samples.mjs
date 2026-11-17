/**
 * Builds the sample handbooks shown on the site: three town halls that differ
 * as much as three Dutch addresses can (below sea level, behind a river dike,
 * in the hills), each with a different household.
 *
 *   node handbook/scripts/samples.mjs
 *
 * Writes public/images/handboek/*.jpg and src/data/handbook-samples.json.
 * Needs Chrome (for the pdf) and pdftoppm (poppler) for the images.
 * Only public buildings belong in this list: the pages are published.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const out = join(root, 'handbook', 'out');
const images = join(root, 'public', 'images', 'handboek');

const SAMPLES = [
  { id: 'rotterdam', query: 'Coolsingel 40, Rotterdam', what: 'Stadhuis Rotterdam', household: { adults: 2, children: 1, pets: 0 } },
  { id: 'almere', query: 'Stadhuisplein 1, Almere', what: 'Stadhuis Almere', household: { adults: 1, children: 0, pets: 0 } },
  { id: 'vaals', query: 'Von Clermontplein 15, Vaals', what: 'Gemeentehuis Vaals', household: { adults: 2, children: 2, pets: 1 } },
];

const nl = (n, digits = 0) => Number(n).toLocaleString('nl-NL', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const count = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const jpg = (pdf, target, width, pages) =>
  execFileSync('pdftoppm', ['-f', String(pages[0]), '-l', String(pages[1]), '-scale-to-x', String(width), '-scale-to-y', '-1', '-jpeg', '-jpegopt', 'quality=80,progressive=y', pdf, target]);

const result = [];
for (const s of SAMPLES) {
  const h = s.household;
  const log = execFileSync('node', [join(root, 'handbook', 'build.mjs'), s.query, '--adults', h.adults, '--children', h.children, '--pets', h.pets].map(String), { encoding: 'utf8' });
  const pdf = log.match(/^PDF: (\S+\.pdf)/m)?.[1];
  if (!pdf || /LET OP/.test(log)) throw new Error(`${s.query}: ${log}`);
  const d = JSON.parse(readFileSync(pdf.replace(/\.pdf$/, '.json'), 'utf8'));

  // page 1 for the preview; the first sample also supplies the four pages under "Wat erin staat"
  jpg(pdf, join(images, `voorbeeld-${s.id}`), 1000, [1, 1]);
  if (s === SAMPLES[0]) jpg(pdf, join(images, 'voorbeeld-pagina'), 778, [1, 4]);

  const people = h.adults + h.children;
  const [first, second] = d.hospitals;
  const shop = d.nearby.supermarket?.[0];
  result.push({
    id: s.id,
    what: s.what,
    street: d.address.label.split(',')[0].replace(/^./, (c) => c.toUpperCase()),
    place: d.address.place,
    image: `/images/handboek/voorbeeld-${s.id}-1.jpg`,
    household: [count(h.adults, 'volwassene', 'volwassenen'), h.children && count(h.children, 'kind', 'kinderen'), h.pets && count(h.pets, 'huisdier', 'huisdieren')].filter(Boolean).join(', '),
    // same sums as handbook/render.mjs
    water: people * 9 + h.pets,
    cash: h.adults * 70 + h.children * 30,
    level: `${nl(Math.abs(d.elevation), 1)} m ${d.elevation < 0 ? 'onder' : 'boven'} NAP`,
    flood: d.floodRisk.length > 0,
    hospital: { name: first.name, place: first.place, minutes: Math.round(first.drive.minutes), allDay: first.allDay },
    hospitalNight: first.allDay || !second ? null : { name: second.name, place: second.place, minutes: Math.round(second.drive.minutes) },
    broadcaster: d.region.broadcaster,
    dab: d.region.dab ?? null,
    shop: shop?.walk ? { name: shop.name, metres: Math.round(shop.walk.metres / 10) * 10, minutes: Math.max(1, Math.round(shop.walk.minutes)) } : null,
  });
  console.log(`${s.what}: ${d.address.label}`);
}

writeFileSync(join(root, 'src', 'data', 'handbook-samples.json'), `${JSON.stringify({ generated: new Date().toISOString().slice(0, 10), samples: result }, null, 2)}\n`);
