/**
 * Turns the collected facts into HTML, one A4 sheet per page (printed to PDF
 * by headless Chrome). Page 1 is built here; pages 2 to 4 are pages/first-hour.mjs, pages/hacks.mjs and pages/plan.mjs. The map is drawn here as SVG from OpenStreetMap ways, so
 * no map tiles or tile licences are involved.
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { firstHourCss, firstHourPage } from './pages/first-hour.mjs';
import { hacksCss, hacksPage } from './pages/hacks.mjs';
import { planCss, planPage } from './pages/plan.mjs';

const require = createRequire(import.meta.url);
const font = (pkg, file) => pathToFileURL(require.resolve(`${pkg}/files/${file}`)).href;

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const nl = (n, digits = 0) => Number(n).toLocaleString('nl-NL', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const km = (m) => (m < 950 ? `${Math.round(m / 10) * 10} m` : `${nl(m / 1000, 1)} km`);
const mins = (m) => `${Math.max(1, Math.round(m))} min`;

const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64"><path d="M23 15V11.5a5.5 5.5 0 0 1 5.5-5.5h7a5.5 5.5 0 0 1 5.5 5.5V15" fill="none" stroke="#0a7a43" stroke-width="5"/><rect x="4" y="13" width="56" height="47" rx="9" fill="#0a7a43"/><g fill="none" stroke="#fff" stroke-width="6" stroke-miterlimit="2.2"><path d="M12.5 26.5H28.2L19.2 49.6"/><path d="M36.4 33.6a7.1 7.1 0 0 1 14.2 0c0 4.6-3.6 7.2-12.6 14.9H52"/></g></svg>`;

const KINDS = [
  ['supermarket', 'Supermarkt', '#0a7a43'],
  ['pharmacy', 'Apotheek', '#c2331f'],
  ['defibrillator', 'AED', '#b86b00'],
  ['drinking_water', 'Drinkwaterpunt', '#1d5fa8'],
  ['doctors', 'Huisarts', '#6d3fb8'],
];

/** Map of the surroundings: north up, 1 km to each side, markers numbered to match the list. */
function drawMap(home, features, markers, radius = 1000) {
  const size = 520;
  const mPerLat = 111320;
  const mPerLon = 111320 * Math.cos((home.lat * Math.PI) / 180);
  const scale = size / (2 * radius);
  const xy = (p) => [((p.lon - home.lon) * mPerLon + radius) * scale, (radius - (p.lat - home.lat) * mPerLat) * scale];
  const path = (line) => line.map((p, i) => `${i ? 'L' : 'M'}${xy(p).map((v) => v.toFixed(1)).join(' ')}`).join('');

  const layer = { forest: [], water: [], stream: [], rail: [], minor: [], path: [], major: [] };
  for (const f of features) {
    const t = f.tags;
    const d = path(f.line);
    if (t.landuse === 'forest' || t.natural === 'wood') layer.forest.push(d + 'Z');
    else if (t.natural === 'water') layer.water.push(d + 'Z');
    else if (t.waterway) layer.stream.push(d);
    else if (t.railway) layer.rail.push(d);
    else if (/^(motorway|trunk|primary|secondary|tertiary)(_link)?$/.test(t.highway)) layer.major.push(d);
    else if (/^(footway|path|cycleway|track|steps|bridleway|pedestrian)$/.test(t.highway)) layer.path.push(d);
    else if (t.highway) layer.minor.push(d);
  }
  const g = (paths, attrs) => (paths.length ? `<path d="${paths.join('')}" ${attrs}/>` : '');
  const [hx, hy] = xy(home);
  const placed = [];
  const pins = markers
    .map((m) => {
      let [x, y] = xy(m);
      let pointer = '';
      const pad = 20;
      if (x < pad || y < pad || x > size - pad || y > size - pad) {
        // outside the map: put the pin on the edge, in the direction of the place
        const dx = x - hx, dy = y - hy;
        const k = Math.min((size / 2 - pad) / Math.abs(dx || 1e-9), (size / 2 - pad) / Math.abs(dy || 1e-9));
        x = hx + dx * k;
        y = hy + dy * k;
        const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
        // slide along the edge until it is clear of the pins already there
        const alongX = Math.abs(dy) * k >= size / 2 - pad - 0.5;
        for (let tries = 0; tries < 12 && placed.some((q) => Math.hypot(q[0] - x, q[1] - y) < 23); tries++) {
          if (alongX) x += 23; else y += 23;
        }
        x = Math.min(size - pad, x);
        y = Math.min(size - pad, y);
        placed.push([x, y]);
        pointer = `<path d="M9 -6 L18 0 L9 6 Z" fill="${m.color}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(0)})"/>`;
      }
      return `<g>${pointer}<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9.5" fill="${m.color}" stroke="#fff" stroke-width="2"/><text x="${x.toFixed(1)}" y="${(y + 3.6).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">${m.n}</text></g>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" class="map" role="img" aria-label="Kaart van de omgeving">
    <defs><clipPath id="c"><rect width="${size}" height="${size}" rx="8"/></clipPath></defs>
    <g clip-path="url(#c)" font-family="'Public Sans Variable', Arial, sans-serif">
      <rect width="${size}" height="${size}" fill="#f4f7f3"/>
      ${g(layer.forest, 'fill="#dbe9db" stroke="none"')}
      ${g(layer.water, 'fill="#cfe2f3" stroke="none"')}
      ${g(layer.stream, 'fill="none" stroke="#9cc3e6" stroke-width="2"')}
      ${g(layer.path, 'fill="none" stroke="#c9d3c9" stroke-width="0.9" stroke-dasharray="3 2"')}
      ${g(layer.rail, 'fill="none" stroke="#8a968e" stroke-width="1.6" stroke-dasharray="6 3"')}
      ${g(layer.minor, 'fill="none" stroke="#ffffff" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"')}
      ${g(layer.minor, 'fill="none" stroke="#b9c4b9" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"')}
      ${g(layer.major, 'fill="none" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"')}
      ${g(layer.major, 'fill="none" stroke="#10231b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"')}
      <circle cx="${hx}" cy="${hy}" r="${500 * scale}" fill="none" stroke="#0a7a43" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/>
      <text x="${hx + 4}" y="${hy - 500 * scale - 4}" font-size="10" fill="#0a7a43" font-weight="700">500 m</text>
      ${pins}
      <g transform="translate(${hx} ${hy})"><path d="M0 -15 L12 -3 V11 H-12 V-3 Z" fill="#ffd21f" stroke="#10231b" stroke-width="2" stroke-linejoin="round"/><rect x="-3.5" y="2" width="7" height="9" fill="#10231b"/></g>
      <g transform="translate(${size - 34} 34)"><circle r="16" fill="#fff" stroke="#10231b" stroke-width="1.2"/><path d="M0 -11 L5 5 L0 2 L-5 5 Z" fill="#10231b"/></g>
      <g transform="translate(16 ${size - 18})"><rect width="${250 * scale}" height="4" fill="#10231b"/><text x="${250 * scale + 6}" y="5" font-size="10" fill="#10231b">250 m</text></g>
    </g>
  </svg>`;
}

/** Screen-only chrome for the version served by the site: a bar with a print button, pages shown as sheets. */
const WEB_CSS = `
@media screen{
  body{background:#e9eee8;padding:16mm 0 10mm}
  .page{margin:0 auto 8mm;background:#fff;box-shadow:0 1mm 6mm rgba(16,35,27,.18)}
  .webbar{position:fixed;inset:0 0 auto 0;z-index:5;background:#0a3d26;color:#fff;display:flex;justify-content:center;align-items:center;gap:5mm;padding:2.6mm 4mm;font-size:11pt}
  .webbar button{font:inherit;font-weight:700;background:#ffd21f;color:#1a1a00;border:0;border-bottom:.8mm solid #d4a900;border-radius:1.6mm;padding:1.8mm 5mm;cursor:pointer}
  .webbar button:focus-visible{outline:.8mm solid #fff;outline-offset:.6mm}
}
@media print{.webbar{display:none}}
`;
const WEB_BAR = `<div class="webbar"><span>Dit is jouw noodhandboek.</span><button type="button" onclick="window.print()">Print of bewaar als pdf</button></div>
<script>(function(){function fit(){var w=document.documentElement.clientWidth;document.body.style.zoom=w<820?(w/820).toFixed(3):''}fit();addEventListener('resize',fit);addEventListener('beforeprint',function(){document.body.style.zoom=''});addEventListener('afterprint',fit)})()</script>`;

/**
 * d: the collected facts (handbook/collect.mjs). With { web: true } the page
 * is meant to be served by the site: fonts come from /fonts and a print bar
 * is added. Without it the fonts are read from node_modules, for the local
 * PDF build.
 */
export function renderHtml(d, { web = false } = {}) {
  const fontUrl = web
    ? { archivo: '/fonts/archivo-wdth.woff2', publicSans: '/fonts/public-sans-wght.woff2' }
    : { archivo: font('@fontsource-variable/archivo', 'archivo-latin-wdth-normal.woff2'), publicSans: font('@fontsource-variable/public-sans', 'public-sans-latin-wght-normal.woff2') };
  const { address: a, household: h } = d;
  // "Straat 1, 1234AB Plaats" becomes a large street line and a smaller place line
  const [street, ...restOfLabel] = a.label.split(', ');
  const place = restOfLabel.join(', ').replace(/^(\d{4})([A-Z]{2})\b/, '$1 $2');
  const people = h.adults + h.children;
  const needs = { water: people * 9 + h.pets, meals: people * 9, lights: Math.max(2, people), cash: h.adults * 70 + h.children * 30 };

  // number the nearest of each kind; the same numbers are on the map
  let n = 0;
  const rows = [];
  for (const [key, label, color] of KINDS) {
    const item = d.nearby?.[key]?.[0];
    if (!item) {
      rows.push({ label, missing: true });
      continue;
    }
    n += 1;
    rows.push({ n, label, color, ...item });
  }

  const flood = d.floodRisk.length
    ? { value: 'Ja', note: d.floodRisk.map((t) => t.replace(/^\S+ type (\w) - /, 'type $1: ')).join('; ') }
    : { value: 'Nee', note: 'niet in een aangewezen overstromingsrisicogebied' };
  const elev = d.elevation == null ? 'onbekend' : `${nl(d.elevation, 1)} m`;
  const hospitals = d.hospitals.slice(0, 2);
  const region = d.region;
  const today = new Date(d.generated).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Noodhandboek ${esc(a.label)}</title>
<style>
@font-face{font-family:'Archivo Variable';font-weight:100 900;font-stretch:62% 125%;src:url('${fontUrl.archivo}') format('woff2-variations')}
@font-face{font-family:'Public Sans Variable';font-weight:100 900;src:url('${fontUrl.publicSans}') format('woff2-variations')}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Public Sans Variable',Arial,sans-serif;color:#10231b;font-size:9.4pt;line-height:1.4;background:#fff}
/* min-height, not height: a page that is too full spills onto an extra sheet, which the build reports */
.page{width:210mm;min-height:296.6mm;padding:9mm 12mm 7mm;display:flex;flex-direction:column;gap:3.8mm;break-after:page}
.page:last-child{break-after:auto}
.page>footer{margin-top:auto}
h1,h2,.big{font-family:'Archivo Variable',Arial,sans-serif;font-stretch:112%;font-weight:750;letter-spacing:-.02em}
header{display:flex;justify-content:space-between;align-items:flex-start;gap:8mm;border-bottom:1.2mm solid #0a7a43;padding-bottom:3.5mm}
.brand{display:flex;align-items:center;gap:2.2mm;font-family:'Archivo Variable';font-stretch:112%;font-weight:800;font-size:12pt}
.over{font-size:8.6pt;color:#43544b;margin-top:2.4mm}
h1{font-size:21pt;line-height:1.05}
.place{font-family:'Archivo Variable',Arial,sans-serif;font-stretch:112%;font-weight:600;font-size:11pt;margin-top:.6mm}
.meta{text-align:right;font-size:8pt;color:#43544b;white-space:nowrap}
.meta strong{color:#10231b;font-size:9pt}
.top{display:grid;grid-template-columns:86mm 1fr;gap:6mm}
.sign{background:#0a7a43;color:#fff;border-radius:3mm;padding:4.5mm 5mm 2.5mm}
.sign h2{font-size:10.5pt;padding-bottom:2mm;border-bottom:.6mm solid #fff}
.sign .row{display:flex;justify-content:space-between;align-items:baseline;gap:3mm;padding:2.1mm 0;border-bottom:.2mm solid #4fa37a}
.sign .row:last-child{border-bottom:0}
.sign .k{font-weight:650}.sign .k small{display:block;font-weight:400;font-size:7.6pt;color:#d6efe0}
.sign .v{font-family:'Archivo Variable';font-weight:800;font-size:17pt;line-height:1;white-space:nowrap}
.facts{display:grid;grid-template-columns:1fr 1fr;gap:0 6mm;align-content:start}
.fact{padding:2.3mm 0;border-bottom:.2mm solid #c9d3c9}
.fact:nth-child(-n+2){border-top:.6mm solid #10231b}
.fact .l{font-size:7.8pt;color:#43544b}
.fact .big{font-size:15pt;line-height:1.1}
.fact .s{font-size:7.8pt;color:#43544b}
.mid{display:grid;grid-template-columns:86mm 1fr;gap:6mm}
.map{width:86mm;height:86mm;border:.3mm solid #c9d3c9;border-radius:2mm;display:block}
.cap{font-size:7pt;color:#5f6e65;margin-top:1mm}
h2{font-size:11pt;margin-bottom:1.5mm}
table{width:100%;border-collapse:collapse}
tr.none strong{color:#5f6e65;font-weight:600}
td{padding:1.05mm 0;border-bottom:.2mm solid #c9d3c9;vertical-align:top}
tr:first-child td{border-top:.6mm solid #10231b}
.pin{display:inline-grid;place-items:center;width:4.6mm;height:4.6mm;border-radius:50%;color:#fff;font-weight:700;font-size:7pt;margin-right:1.6mm}
.d{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;font-weight:650}
.sub{color:#43544b;font-size:7.8pt}
.hosp{margin-bottom:2.4mm}
.warn{font-size:7pt;background:#ffd21f;color:#1a1a00;font-weight:700;padding:.3mm 1.3mm;border-radius:1mm;vertical-align:.3mm;margin-left:1mm;white-space:nowrap}
.bottom{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6mm;margin-top:auto}
.box h2{border-bottom:.6mm solid #10231b;padding-bottom:1.2mm}
.box li{list-style:none;padding:1.2mm 0;border-bottom:.2mm solid #c9d3c9;display:flex;justify-content:space-between;gap:3mm}
.box li b{font-weight:700;white-space:nowrap}
footer{font-size:6.8pt;color:#5f6e65;line-height:1.35;border-top:.2mm solid #c9d3c9;padding-top:2mm}
.proof{background:#ffd21f;color:#1a1a00;font-weight:700;padding:.6mm 2mm;border-radius:1mm;font-size:7pt}
${firstHourCss}${hacksCss}${planCss}${web ? WEB_CSS : ''}</style></head><body>
${web ? WEB_BAR : ''}
<section class="page">
<header>
  <div>
    <div class="brand">${LOGO}<span>Kit-72</span></div>
    <p class="over">Noodhandboek voor</p>
    <h1>${esc(street)}</h1>
    <p class="place">${esc(place)}</p>
  </div>
  <div class="meta"><span class="proof">BÈTA</span><br><br><strong>${h.adults} ${h.adults === 1 ? 'volwassene' : 'volwassenen'}${h.children ? `, ${h.children} ${h.children === 1 ? 'kind' : 'kinderen'}` : ''}${h.pets ? `, ${h.pets} huisdier${h.pets > 1 ? 'en' : ''}` : ''}</strong><br>Gemaakt op ${today}<br>Controleer de gegevens jaarlijks</div>
</header>

<section class="top">
  <div class="sign">
    <h2>72 uur zonder hulp: jouw voorraad</h2>
    <div class="row"><span class="k">Drinkwater<small>3 liter per persoon per dag</small></span><span class="v">${needs.water} L</span></div>
    <div class="row"><span class="k">Maaltijden<small>houdbaar zonder koelkast</small></span><span class="v">${needs.meals}</span></div>
    <div class="row"><span class="k">Zaklampen<small>één per persoon, minstens twee</small></span><span class="v">${needs.lights}</span></div>
    <div class="row"><span class="k">Contant geld<small>€ 70 per volwassene, € 30 per kind</small></span><span class="v">€ ${needs.cash}</span></div>
  </div>
  <div class="facts">
    <div class="fact"><div class="l">Hoogte van je perceel</div><div class="big">${elev}</div><div class="s">${d.elevation == null ? 'geen meting op dit punt' : `${d.elevation >= 0 ? 'boven' : 'onder'} NAP, maaiveld rond je huis`}</div></div>
    <div class="fact"><div class="l">In overstromingsrisicogebied</div><div class="big">${flood.value}</div><div class="s">${esc(flood.note)}</div></div>
    <div class="fact"><div class="l">Veiligheidsregio</div><div class="big" style="font-size:11.5pt">${esc(d.safetyRegion ?? 'onbekend')}</div><div class="s">${esc(region?.website ?? '')}</div></div>
    <div class="fact"><div class="l">Waterschap</div><div class="big" style="font-size:11.5pt">${esc(a.waterBoard.replace(/^Waterschap |^Hoogheemraadschap van /, ''))}</div><div class="s">gemeente ${esc(a.municipality)}</div></div>
  </div>
</section>

<section class="mid">
  <div>
    ${d.mapFeatures ? drawMap(a, d.mapFeatures, rows.filter((r) => !r.missing)) : '<div class="map" style="display:grid;place-items:center;color:#5f6e65">Kaart niet beschikbaar</div>'}
    <p class="cap">Jouw huis in het midden, noorden boven. Een nummer met een pijl ligt buiten de kaart, in die richting. Kaartgegevens © OpenStreetMap-bijdragers.</p>
  </div>
  <div>
    <div class="hosp">
      <h2>Spoedeisende hulp</h2>
      <table>${hospitals.length ? hospitals.map((x) => `<tr><td><strong>${esc(x.name)}</strong>${x.allDay ? '' : ` <span class="warn">${x.night ? 'beperkt open' : '’s nachts dicht'}</span>`}<div class="sub">${esc(x.address)}, ${esc(x.place)}${x.allDay ? ', dag en nacht open' : ''}</div></td><td class="d">${x.drive ? `${nl(x.drive.metres / 1000, 1)} km<div class="sub">${mins(x.drive.minutes)} met de auto</div>` : `${km(x.dist)}<div class="sub">hemelsbreed</div>`}</td></tr>`).join('') : '<tr><td>Niet gevonden; zoek zelf de dichtstbijzijnde spoedeisende hulp op.</td><td></td></tr>'}</table>
      <p class="sub" style="margin-top:1mm">Bij levensgevaar bel je 112 en ga je niet zelf rijden. Bron: RIVM, opgave van de ziekenhuizen, ${esc(d.sehSource?.version ?? '2026')}.</p>
    </div>
    <h2>Het dichtst bij huis</h2>
    <table>${rows.map((r) => r.missing
      ? `<tr class="none"><td colspan="2"><span class="pin" style="background:#c3ccc5"></span><strong>${r.label}</strong><span class="sub"> niet gevonden in OpenStreetMap</span></td></tr>`
      : `<tr><td><span class="pin" style="background:${r.color}">${r.n}</span><strong>${r.label}</strong>${r.name ? `<span class="sub"> ${esc(r.name)}</span>` : ''}${r.street ? `<div class="sub" style="margin-left:6.2mm">${esc(r.street)}</div>` : ''}</td><td class="d">${r.walk ? `${km(r.walk.metres)}<div class="sub">${r.bike ? `${mins(r.bike.minutes)} fietsen` : `${mins(r.walk.minutes)} lopen`}</div>` : `${km(r.dist)}<div class="sub">hemelsbreed</div>`}</td></tr>`).join('')}</table>
  </div>
</section>

<section class="bottom">
  <div class="box"><h2>Wie bel je</h2><ul>
    <li><span>Levensgevaar</span><b>112</b></li>
    <li><span>Stroom of gas uitgevallen</span><b>0800-9009</b></li>
    <li><span>Politie, geen spoed</span><b>0900-8844</b></li>
  </ul></div>
  <div class="box"><h2>Waar luister je</h2><ul>
    <li><span>Rampenzender (radio)</span><b>${esc(region?.broadcaster ?? 'regionale omroep')}</b></li>
    <li><span>Op je telefoon</span><b>NL-Alert</b></li>
    <li><span>Online</span><b>${esc(region?.website ?? 'je veiligheidsregio')}</b></li>
  </ul></div>
  <div class="box"><h2>Bij ${d.floodRisk.length ? 'hoogwater' : 'een storing'}</h2><ul>
    ${d.floodRisk.length
      ? '<li><span>Ga naar een hogere verdieping en neem water, eten en je telefoon mee.</span></li><li><span>Volg de aanwijzingen van de veiligheidsregio over vertrekken of blijven.</span></li>'
      : '<li><span>Blijf binnen, zet de radio aan en houd koelkast en vriezer dicht.</span></li><li><span>Je woont buiten overstromingsrisicogebied; reken wel op uitval van stroom en water.</span></li>'}
  </ul></div>
</section>

<footer>
  Bètaversie: de gegevens komen uit openbare bronnen en kunnen fouten bevatten; controleer wat voor jou belangrijk is. Bronnen: adres en waterschap PDOK Locatieserver; hoogte Actueel Hoogtebestand Nederland;
  overstromingsrisicogebied Rijkswaterstaat (Richtlijn Overstromingsrisico's); veiligheidsregio CBS; spoedeisende hulp RIVM (Vragenlijst aanbod SEH's 2026); punten in de buurt en kaart OpenStreetMap; routes OSRM.
  De verwachte waterdiepte bij een overstroming ontbreekt nog.
  Dit handboek vervangt geen aanwijzingen van hulpdiensten. kit-72.com
</footer>
</section>
${firstHourPage(d, needs)}
${hacksPage(d, needs)}
${planPage(d, needs)}
</body></html>`;
}
