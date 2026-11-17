/**
 * Page 3 of the handbook: "Slimme trucs". Tricks from people who have been
 * through long outages, not from official leaflets. Each one in
 * handbook/data/hacks-nl.json was checked on two questions: does it work,
 * and can it hurt someone who follows it as written. The popular ones that
 * fail the second question are printed on page 4 (pages/plan.mjs).
 */
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../data/hacks-nl.json', import.meta.url), 'utf8'));

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export const hacksCss = `
.hk-feat{display:grid;grid-template-columns:repeat(4,1fr);gap:4mm}
.hk-feat article{background:#f4f7f3;border-radius:3mm;padding:2.6mm 3.4mm 2.8mm;display:flex;flex-direction:column;gap:1.4mm}
.hk-feat svg{display:block;width:100%;height:auto}
.hk-feat h3{font-family:'Archivo Variable',Arial,sans-serif;font-stretch:112%;font-weight:750;font-size:10.4pt;line-height:1.12;letter-spacing:-.01em}
.hk-feat p{font-size:7.8pt;line-height:1.3;color:#2c3d34}
.hk-feat svg{max-height:16mm}
.hk-head p{max-width:96mm}
.hk-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:5.5mm;align-items:start}
.hk-group{margin-bottom:3mm}
.hk-group:last-child{margin-bottom:0}
.hk-group h2{font-size:11pt;border-bottom:.6mm solid #10231b;padding-bottom:1mm;margin-bottom:1.6mm}
.hk-group li{list-style:none;position:relative;padding:0 0 1.2mm 4.6mm;line-height:1.26;font-size:9pt}
.hk-group li::before{content:'';position:absolute;left:0;top:1.1mm;width:2.6mm;height:2.6mm;border-radius:.6mm;background:#ffd21f;border:.3mm solid #10231b}
.hk-group b{font-weight:700}
.hk-group span{display:block;font-size:7.7pt;line-height:1.3;color:#43544b}
`;

const INK = '#10231b';
const FIG = {
  /** Two cups of ice: the coin still on top, and the coin sunk to the bottom. */
  coin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70" role="img" aria-label="Een munt op een bevroren beker water">
    <g fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"><path d="M12 14h36l-4 46H16Z" fill="#cfe2f3"/><path d="M72 14h36l-4 46H76Z" fill="#cfe2f3"/></g>
    <ellipse cx="30" cy="15" rx="9" ry="3.4" fill="#ffd21f" stroke="${INK}" stroke-width="2"/>
    <ellipse cx="90" cy="54" rx="9" ry="3.4" fill="#ffd21f" stroke="${INK}" stroke-width="2"/>
    <text x="30" y="46" text-anchor="middle" font-family="'Archivo Variable',Arial,sans-serif" font-weight="800" font-size="20" fill="#5f6e65">?</text>
    <path d="M83 28l14 14M97 28 83 42" stroke="#c2331f" stroke-width="3.4" stroke-linecap="round"/>
  </svg>`,
  /** A torch strapped to a full bottle lights the room. */
  lantern: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70" role="img" aria-label="Een zaklamp tegen een volle fles water">
    <g stroke="#ffd21f" stroke-width="3" stroke-linecap="round"><path d="M70 12l10-7M80 26h13M78 42l11 6M40 12 30 5M30 26H17M32 42l-11 6"/></g>
    <rect x="50" y="2" width="10" height="7" rx="1.5" fill="${INK}"/>
    <path d="M44 16c0-5 6-7 6-7h10s6 2 6 7v44a5 5 0 0 1-5 5H49a5 5 0 0 1-5-5Z" fill="#cfe2f3" stroke="${INK}" stroke-width="2.4"/>
    <rect x="40" y="34" width="30" height="8" rx="2" fill="${INK}"/>
    <rect x="49" y="42" width="12" height="14" rx="3" fill="#ffd21f" stroke="${INK}" stroke-width="2"/>
  </svg>`,
  /** A pan wrapped in a duvet keeps cooking. */
  haybox: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70" role="img" aria-label="Een pan in een dekbed gewikkeld">
    <path d="M14 58c-8-14 0-40 20-44 10-8 42-8 52 0 20 4 28 30 20 44Z" fill="#fff" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M28 22c6 6 6 14 2 22M92 22c-6 6-6 14-2 22M46 14c2 5 2 9 0 13M74 14c-2 5-2 9 0 13" fill="none" stroke="#b9c4b9" stroke-width="2" stroke-linecap="round"/>
    <path d="M42 34h36v16a6 6 0 0 1-6 6H48a6 6 0 0 1-6-6Z" fill="#ffd21f" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M38 34h44M36 38h6M78 38h6" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M60 30v-5" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  /** Bottles of water lying in a freezer drawer. */
  frozen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70" role="img" aria-label="Flessen water in de vriezer">
    <rect x="10" y="8" width="100" height="56" rx="5" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
    <path d="M10 36h100" stroke="${INK}" stroke-width="2.4"/>
    <g fill="#cfe2f3" stroke="${INK}" stroke-width="2"><rect x="22" y="15" width="34" height="14" rx="5"/><rect x="64" y="15" width="34" height="14" rx="5"/><rect x="22" y="43" width="34" height="14" rx="5"/></g>
    <g fill="#ffd21f" stroke="${INK}" stroke-width="2"><rect x="17" y="18" width="6" height="8" rx="1.5"/><rect x="59" y="18" width="6" height="8" rx="1.5"/><rect x="17" y="46" width="6" height="8" rx="1.5"/></g>
    <g stroke="#1d5fa8" stroke-width="2.4" stroke-linecap="round"><path d="M82 42v16M74 46l16 8M90 46l-16 8"/></g>
  </svg>`,
};

/** Fill in the bits that follow the address and household. */
const personal = (text, d, needs) =>
  esc(text)
    .replaceAll('{radio}', esc(d.region?.broadcaster ?? 'je regionale omroep'))
    .replaceAll('{water}', String(needs.water))
    .replaceAll('{elevation}', d.elevation == null ? 'onbekend' : `${Number(d.elevation).toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} m ${d.elevation >= 0 ? 'boven' : 'onder'} NAP`);

export function hacksPage(d, needs) {
  const inFloodZone = d.floodRisk.length > 0;
  const show = (x) => !x.when || (x.when === 'flood' && inFloodZone) || (x.when === 'noflood' && !inFloodZone) || (x.when === 'pets' && d.household.pets > 0) || (x.when === 'children' && d.household.children > 0);
  const groups = data.groups.filter(show).map((g) => ({ ...g, items: g.items.filter(show) })).filter((g) => g.items.length);

  // Three columns of roughly equal height. Print layout does not balance CSS columns
  // reliably, so the split is made here: every way of dealing the groups over three
  // columns is tried and the one with the lowest tallest column wins.
  const weight = (g) => 3.2 + g.items.reduce((sum, x) => sum + 0.6 + 1.25 * Math.ceil(x.title.length / 27) + Math.ceil(x.text.length / 41), 0);
  const weights = groups.map(weight);
  let best = null;
  for (let code = 0; code < 3 ** groups.length; code++) {
    const heights = [0, 0, 0];
    let rest = code;
    const picks = groups.map((_, i) => {
      const c = rest % 3;
      rest = Math.floor(rest / 3);
      heights[c] += weights[i];
      return c;
    });
    const tallest = Math.max(...heights);
    if (!best || tallest < best.tallest) best = { tallest, picks };
  }
  const columns = [0, 1, 2].map((c) => groups.filter((_, i) => best.picks[i] === c));

  return `<section class="page">
<div class="fh-head hk-head">
  <h1>Slimme trucs</h1>
  <p>${esc(data.intro)}</p>
</div>

<div class="hk-feat">${data.featured.map((f) => `<article>${FIG[f.fig]}<h3>${personal(f.title, d, needs)}</h3><p>${personal(f.text, d, needs)}</p></article>`).join('')}</div>

<div class="hk-cols">${columns.map((col) => `<div>${col.map((g) => `<div class="hk-group"><h2>${esc(g.title)}</h2><ul>${g.items.map((x) => `<li><b>${personal(x.title, d, needs)}</b><span>${personal(x.text, d, needs)}</span></li>`).join('')}</ul></div>`).join('')}</div>`).join('')}</div>

<footer>${esc(data.footer)}</footer>
</section>`;
}
