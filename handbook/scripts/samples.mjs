/**
 * Builds the sample handbooks shown on the site: three town halls that differ
 * as much as three Dutch addresses can (below sea level, behind a river dike,
 * in the hills), each with a different household.
 *
 *   node handbook/scripts/samples.mjs
 *
 * Writes public/images/handboek/*.webp, public/images/og-noodhandboek.jpg and
 * src/data/handbook-samples.json.
 * Needs Chrome (for the pdf), pdftoppm (poppler) and cwebp for the images.
 * Only public buildings belong in this list: the pages are published.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

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
/** Cuts pages from the pdf as <target>-<n>.webp. */
const cut = (pdf, target, width, pages) => {
  execFileSync('pdftoppm', ['-f', String(pages[0]), '-l', String(pages[1]), '-scale-to-x', String(width), '-scale-to-y', '-1', '-png', pdf, `${target}-tmp`]);
  for (let n = pages[0]; n <= pages[1]; n++) {
    const png = `${target}-tmp-${n}.png`;
    execFileSync('cwebp', ['-quiet', '-q', '78', png, '-o', `${target}-${n}.webp`]);
    rmSync(png);
  }
};

const result = [];
for (const s of SAMPLES) {
  const h = s.household;
  const log = execFileSync('node', [join(root, 'handbook', 'build.mjs'), s.query, '--adults', h.adults, '--children', h.children, '--pets', h.pets].map(String), { encoding: 'utf8' });
  const pdf = log.match(/^PDF: (\S+\.pdf)/m)?.[1];
  if (!pdf || /LET OP/.test(log)) throw new Error(`${s.query}: ${log}`);
  const d = JSON.parse(readFileSync(pdf.replace(/\.pdf$/, '.json'), 'utf8'));

  // page 1 for the preview; the first sample also supplies the four pages under "Wat erin staat"
  cut(pdf, join(images, `voorbeeld-${s.id}`), 1000, [1, 1]);
  if (s === SAMPLES[0]) cut(pdf, join(images, 'voorbeeld-pagina'), 778, [1, 4]);

  const people = h.adults + h.children;
  const [first, second] = d.hospitals;
  const shop = d.nearby.supermarket?.[0];
  result.push({
    id: s.id,
    what: s.what,
    street: d.address.label.split(',')[0].replace(/^./, (c) => c.toUpperCase()),
    place: d.address.place,
    image: `/images/handboek/voorbeeld-${s.id}-1.webp`,
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

// Share image (1200 x 630) for the handbook and municipality pages: the three pages fanned out.
const file = (p) => pathToFileURL(join(root, p)).href;
const og = join(out, 'og-noodhandboek.html');
writeFileSync(
  og,
  `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Archivo Variable';font-weight:100 900;font-stretch:62% 125%;src:url('${file('public/fonts/archivo-wdth.woff2')}') format('woff2-variations')}
@font-face{font-family:'Public Sans Variable';font-weight:100 900;src:url('${file('public/fonts/public-sans-wght.woff2')}') format('woff2-variations')}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#0a3d26;color:#fff;font-family:'Public Sans Variable',Arial,sans-serif;position:relative}
.t{position:absolute;left:64px;top:64px;width:560px}
.b{font-family:'Archivo Variable';font-weight:800;font-size:30px;display:flex;align-items:center;gap:12px}
.b span{display:grid;place-items:center;width:46px;height:46px;border-radius:9px;background:#0a7a43;font-size:22px}
h1{font-family:'Archivo Variable';font-weight:800;font-stretch:110%;font-size:66px;line-height:1.02;letter-spacing:-1px;margin-top:70px}
p{font-size:28px;line-height:1.3;color:#cfe3d7;margin-top:26px}
.f{position:absolute;left:64px;bottom:60px;font-family:'Archivo Variable';font-weight:700;font-size:26px;background:#ffd21f;color:#1a1a00;padding:12px 22px;border-radius:8px}
img{position:absolute;width:330px;border-radius:4px;box-shadow:0 30px 50px -20px rgba(0,0,0,.7)}
.i1{left:650px;top:150px;transform:rotate(-7deg)}
.i2{left:790px;top:95px;transform:rotate(1deg)}
.i3{left:910px;top:170px;transform:rotate(8deg)}
</style>
<div class="t"><div class="b"><span>72</span>Kit-72</div><h1>Een noodhandboek voor jouw adres</h1><p>Hoogte, overstromingsrisico, spoedeisende hulp en rampenzender van je eigen huis.</p></div>
<div class="f">Gratis op kit-72.com</div>
${result.map((r, i) => `<img class="i${i + 1}" src="${file(`public${r.image}`)}">`).join('')}`,
);
const chrome = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
const shot = join(out, 'og-noodhandboek.png');
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,630', '--virtual-time-budget=4000', `--screenshot=${shot}`, pathToFileURL(og).href], { stdio: 'ignore' });
execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '85', shot, '--out', join(root, 'public', 'images', 'og-noodhandboek.jpg')], { stdio: 'ignore' });

writeFileSync(join(root, 'src', 'data', 'handbook-samples.json'), `${JSON.stringify({ generated: new Date().toISOString().slice(0, 10), samples: result }, null, 2)}\n`);
