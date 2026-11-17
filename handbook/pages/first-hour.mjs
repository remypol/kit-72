/**
 * Page 2 of the handbook: "Het eerste uur". What to do first when the power
 * goes, the tap runs dry, the water rises or you have to leave. The steps are
 * the same for everyone; the numbers, the broadcaster, the flood card and the
 * packing list follow the address and the household.
 *
 * Every instruction here is backed by a source listed in
 * handbook/data/first-hour-sources.json. Do not add a step without one.
 */
import { readFileSync } from 'node:fs';

const src = JSON.parse(readFileSync(new URL('../data/first-hour-sources.json', import.meta.url), 'utf8'));
const F = src.figures;

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const nl = (n, digits = 0) => Number(n).toLocaleString('nl-NL', { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const firstHourCss = `
.fh-head{display:flex;justify-content:space-between;align-items:flex-end;gap:8mm;border-bottom:1.2mm solid #0a7a43;padding-bottom:3mm}
.fh-head h1{font-size:25pt;line-height:1}
.fh-head p{font-size:8.6pt;color:#43544b;text-align:right;max-width:74mm}
.dark{background:#0a3d26;color:#fff;border-radius:3mm;padding:4mm 5.5mm 2mm;display:grid;grid-template-columns:1fr 48mm;gap:6mm}
.dark h2{font-size:15pt;margin-bottom:2.2mm}
.steps{list-style:none;counter-reset:s}
.steps li{counter-increment:s;position:relative;padding:0 0 1.5mm 7.2mm;line-height:1.28}
.steps li::before{content:counter(s);position:absolute;left:0;top:-.1mm;width:5.2mm;height:5.2mm;border-radius:50%;display:grid;place-items:center;font-family:'Archivo Variable',Arial,sans-serif;font-weight:800;font-size:8pt;background:#10231b;color:#fff}
.dark .steps li::before{background:#ffd21f;color:#10231b}
.steps b{font-weight:700}
.steps span{display:block;font-size:7.8pt;color:#43544b}
.dark .steps span{color:#cfe6d8}
.two{columns:2;column-gap:6mm}
.two li{break-inside:avoid;display:inline-block;width:100%}
.fig{display:flex;flex-direction:column;gap:2mm}
.fig svg{display:block;width:100%;height:auto}
.fig p{font-size:7.6pt;line-height:1.3;color:#cfe6d8}
.fig p b{color:#fff}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:6mm}
.card h2{font-size:13pt;border-bottom:.6mm solid #10231b;padding-bottom:1.3mm;margin-bottom:2.4mm}
.card .fig p{color:#43544b}
.card .fig p b{color:#10231b}
.card .fig{margin-top:1.5mm}
.nb{white-space:nowrap;font-style:normal}
.go{border:.5mm solid #10231b;border-radius:3mm;padding:3mm 5.5mm 2.6mm}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:5mm;margin-top:1.5mm}
.duo div{display:flex;align-items:center;gap:2.5mm;font-size:7.8pt;line-height:1.3;color:#43544b}
.duo svg{width:15mm;height:15mm;flex:none}
.duo b{display:block;white-space:nowrap;font-family:'Archivo Variable',Arial,sans-serif;font-stretch:112%;font-weight:800;font-size:12pt;line-height:1.1;color:#10231b}
.go .hd{display:flex;justify-content:space-between;align-items:baseline;gap:6mm;margin-bottom:2.2mm}
.go h2{font-size:13pt;margin:0}
.go .lead{font-size:8pt;color:#43544b}
.ticks{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:1.6mm 5mm}
.ticks li{position:relative;padding-left:6.4mm;line-height:1.3}
.ticks li::before{content:'';position:absolute;left:0;top:.2mm;width:3.8mm;height:3.8mm;border:.4mm solid #10231b;border-radius:.7mm;background:#fff}
.ticks span{display:block;font-size:7.6pt;color:#43544b}
.before{margin-top:2mm;padding-top:1.8mm;border-top:.2mm solid #c9d3c9;font-size:8.4pt}
.before b{font-weight:700}
`;

/** A bath filling from the tap, next to the bottles this household needs to drink in 72 hours. */
function bathFigure(drinkLitres) {
  const bottles = Math.ceil(drinkLitres / 1.5);
  const rows = Math.ceil(bottles / 16);
  const perRow = Math.ceil(bottles / rows);
  const step = Math.min(19.4, 228 / perRow);
  const bottle = (i) => {
    const inRow = Math.min(perRow, bottles - Math.floor(i / perRow) * perRow);
    const x = 120 - (inRow * step) / 2 + (i % perRow) * step + (step - 12) / 2;
    const y = 132 + Math.floor(i / perRow) * 31;
    return `<g transform="translate(${x} ${y})"><rect x="3.6" y="0" width="4.8" height="4" rx="1" fill="#ffd21f"/><path d="M2 6.5c0-1.6 1.6-2.5 1.6-2.5h4.8S10 4.9 10 6.5V25a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 25Z" fill="#9cc3e6"/></g>`;
  };
  const h = 132 + rows * 31;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 ${h}" role="img" aria-label="Een bad dat volloopt en de flessen drinkwater voor 72 uur">
    <path d="M186 20v-6a8 8 0 0 1 8-8h10a8 8 0 0 1 8 8v24" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <path d="M186 20v10" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
    <path d="M186 40v14M180 46v10M192 47v9" stroke="#9cc3e6" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M10 56h220v26a34 34 0 0 1-34 34H44a34 34 0 0 1-34-34Z" fill="#9cc3e6"/>
    <path d="M10 56h220v10c-18 6-37-6-55 0s-37 6-55 0-37-6-55 0-37 6-55 0Z" fill="#0a3d26"/>
    <path d="M4 44h232M10 44v38a34 34 0 0 0 34 34h152a34 34 0 0 0 34-34V44" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M48 116v9M192 116v9" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <text x="120" y="101" text-anchor="middle" font-family="'Archivo Variable',Arial,sans-serif" font-weight="800" font-size="25" fill="#0a3d26">± ${F.bathLitres} L</text>
    ${Array.from({ length: bottles }, (_, i) => bottle(i)).join('')}
  </svg>`;
}

/** How long food keeps with the door shut: three bars on one time scale. */
function coldFigure() {
  const max = Math.max(...F.cold.map((c) => c.hours));
  const rows = F.cold
    .map((c, i) => {
      const y = 2 + i * 19;
      const w = Math.max(8, (c.hours / max) * 82);
      return `<text x="0" y="${y + 10}" font-size="8.6" fill="#fff">${esc(c.label)}</text><rect x="72" y="${y}" width="${w.toFixed(1)}" height="13" rx="2.5" fill="${i === 0 ? '#ffd21f' : '#9cc3e6'}"/><text x="${(72 + w + 4).toFixed(1)}" y="${y + 10.4}" font-family="'Archivo Variable',Arial,sans-serif" font-weight="800" font-size="10" fill="#fff">${c.hours} uur</text>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 ${F.cold.length * 19}" role="img" aria-label="Hoe lang eten koud blijft met de deur dicht" font-family="'Public Sans Variable',Arial,sans-serif">${rows}</svg>`;
}

/** A person and a car on one ground line with the water depths that take them. */
function depthFigure() {
  const ground = 76;
  const px = (cm) => cm * 0.4; // the person is 175 cm tall, so the water band is as thin as it is in reality
  const depths = [...F.floodDepths].sort((x, y) => y.cm - x.cm);
  const top = depths[0].cm;
  const labels = depths
    .map((dpt, i) => {
      const y = ground - px(dpt.cm);
      const ly = 34 + i * 26; // labels are spread out; a leader line ties each to its water level
      return `<path d="M0 ${y.toFixed(1)}H118L134 ${ly - 3}" fill="none" stroke="#1d5fa8" stroke-width="1" stroke-dasharray="3 2.5"/><text x="138" y="${ly}" font-family="'Archivo Variable',Arial,sans-serif" font-weight="800" font-size="11.5" fill="#10231b">${esc(dpt.head)}</text><text x="138" y="${ly + 10}" font-size="8.4" fill="#43544b">${esc(dpt.label)}</text>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284 82" role="img" aria-label="Hoe weinig stromend water al gevaarlijk is" font-family="'Public Sans Variable',Arial,sans-serif">
    <g fill="#10231b"><circle cx="16" cy="${ground - px(164)}" r="4.6"/><rect x="9" y="${ground - px(150)}" width="14" height="${px(72)}" rx="3.4"/><rect x="10.200" y="${ground - px(84)}" width="5" height="${px(84)}" rx="2"/><rect x="16.800" y="${ground - px(84)}" width="5" height="${px(84)}" rx="2"/></g>
    <g transform="translate(34 ${ground - 37}) scale(.6)"><path d="M6 44v-13l13-4 12-20a6 6 0 0 1 5-3h50a6 6 0 0 1 5 2l15 20 20 5a6 6 0 0 1 5 6v7Z" fill="#10231b"/><path d="M35 9h20v17H25ZM60 9h25l13 17H60Z" fill="#fff"/><circle cx="33" cy="48" r="13" fill="#10231b" stroke="#fff" stroke-width="3"/><circle cx="105" cy="48" r="13" fill="#10231b" stroke="#fff" stroke-width="3"/></g>
    <rect x="0" y="${(ground - px(top)).toFixed(1)}" width="118" height="${px(top).toFixed(1)}" fill="#1d5fa8" opacity=".3"/>
    ${labels}
    <path d="M0 ${ground}H118" stroke="#10231b" stroke-width="2"/>
  </svg>`;
}

/** Two numbers to remember when the tap is dry: the bucket and the boil. */
function waterFigure() {
  return `<div class="duo">
    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="Emmer"><path d="M8 18c0-12 32-12 32 0" fill="none" stroke="#10231b" stroke-width="2.6"/><path d="M8 18h32l-4 24H12Z" fill="#cfe2f3" stroke="#10231b" stroke-width="2.6" stroke-linejoin="round"/></svg><span><b>${F.flushLitres} liter</b>is één grote spoelbeurt van het toilet</span></div>
    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="Pan"><path d="M17 6c-3 4 3 5 0 9M25 6c-3 4 3 5 0 9M33 6c-3 4 3 5 0 9" fill="none" stroke="#1d5fa8" stroke-width="2.2" stroke-linecap="round"/><path d="M8 22h34v14a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6Z" fill="#cfe2f3" stroke="#10231b" stroke-width="2.6" stroke-linejoin="round"/><path d="M2 26h6M42 26h5" stroke="#10231b" stroke-width="2.6" stroke-linecap="round"/></svg><span><b>${F.boilMinutes} minuten</b>koken bij een kookadvies</span></div>
  </div>`;
}

/** A house with everything shut. */
function shutFigure() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284 96" role="img" aria-label="Een huis met ramen, deuren en ventilatie dicht" font-family="'Public Sans Variable',Arial,sans-serif">
    <path d="M18 46 82 8l64 38v44H18Z" fill="#f4f7f3" stroke="#10231b" stroke-width="3" stroke-linejoin="round"/>
    <rect x="34" y="52" width="24" height="22" fill="#fff" stroke="#10231b" stroke-width="2.4"/><path d="M34 52l24 22M58 52 34 74" stroke="#c2331f" stroke-width="2.4"/>
    <rect x="70" y="56" width="20" height="34" fill="#fff" stroke="#10231b" stroke-width="2.4"/><path d="M70 56l20 34M90 56 70 90" stroke="#c2331f" stroke-width="2.4"/>
    <rect x="104" y="52" width="24" height="22" fill="#fff" stroke="#10231b" stroke-width="2.4"/><path d="M104 52l24 22M128 52l-24 22" stroke="#c2331f" stroke-width="2.4"/>
    <circle cx="82" cy="30" r="8" fill="#fff" stroke="#10231b" stroke-width="2.4"/><path d="M76.500 24.500l11 11M87.500 24.500l-11 11" stroke="#c2331f" stroke-width="2.4"/>
    <g font-size="9" fill="#10231b"><text x="166" y="26">Ventilatie uit</text><text x="166" y="50">Ramen dicht</text><text x="166" y="74">Deuren dicht</text></g>
    <path d="M160 23H96M160 47h-28M160 71H94" stroke="#10231b" stroke-width="1" stroke-dasharray="2 2"/>
  </svg>`;
}

const steps = (items, cls = '') => `<ol class="steps ${cls}">${items.filter(Boolean).map(([head, why]) => `<li><b>${head}</b>${why ? `<span>${why}</span>` : ''}</li>`).join('')}</ol>`;

export function firstHourPage(d, needs) {
  const { household: h } = d;
  const people = h.adults + h.children;
  const radio = d.region?.broadcaster ?? 'je regionale omroep';
  const inFloodZone = d.floodRisk.length > 0;
  const perDay = people * 3 + (h.pets ? h.pets / 3 : 0);

  // Each list below maps to a key under "claims" in first-hour-sources.json.
  const power = steps(
    [
      ['Kijk of het alleen bij jou is.', 'Aardlekschakelaar om? Licht bij de buren? Kijk op gasenstroomstoringen.nl of bel <i class="nb">0800-9009</i>, niet 112.'],
      ['Vul het bad, emmers en pannen.', 'De waterdruk kan wegvallen. In een flat valt boven de derde verdieping de pomp direct uit.'],
      ['Houd koelkast en vriezer dicht.', 'Eet eerst wat snel bederft. Weet je niet hoe lang het warm was? Gooi het weg.'],
      ['Trek stekkers uit het stopcontact.', 'Dat voorkomt schade als de stroom terugkomt.'],
      ['Zaklamp aan, koken doe je buiten.', 'Barbecue of campingbrander nooit binnen: koolmonoxide. Kaarsen uit als je de kamer verlaat.'],
      [`Zet de radio aan op ${esc(radio)}.`, 'Op batterijen, of de autoradio. Houd één telefoon aan voor NL-Alert.'],
      ['Blijf warm in de kleinste kamer.', 'Ramen, deuren en gordijnen dicht. De cv werkt niet zonder stroom.'],
      ['Kijk bij buren die hulp nodig hebben.', 'Medische apparatuur op stroom in huis? Bel de leverancier.'],
    ],
    'two',
  );

  const water = steps([
    [`Drink uit je voorraad: ${nl(perDay, 0)} liter per dag.`, `Drie liter per persoon${h.pets ? ', plus wat je huisdier drinkt' : ''}. Voor 72 uur is dat ${needs.water} liter.`],
    ['Spoel het toilet door met een emmer.', 'Met water uit het bad, de regenton of de sloot. Dat water drink je niet.'],
    [`Geldt er een kookadvies? Kook het water ${F.boilMinutes} minuten.`, 'Voor drinken, koffie en thee, flesvoeding, tandenpoetsen en rauwe groente. Douchen en afwassen kan gewoon.'],
    [`Na ${F.emergencyWaterAfterHours} uur zonder water komt er noodwater.`, `${F.emergencyWaterLitres} liter per persoon per dag, op uitdeelpunten die de gemeente aanwijst. Neem zelf schone flessen of een jerrycan mee.`],
  ]);

  const flood = steps([
    ['Zoek de hoogste plek in huis op.', `Je maaiveld ligt op ${nl(d.elevation ?? 0, 1)} m ${d.elevation >= 0 ? 'boven' : 'onder'} NAP. Kijk of je er via een dakraam uit kunt.`],
    ['Gashoofdkraan dicht, elektriciteit uit, stekkers eruit.', null],
    ['Leg een zware zak in toilet, wasbak en putjes.', 'Dan komt het rioolwater niet omhoog.'],
    ['Neem water, eten, medicijnen, radio en zaklamp mee naar boven.', 'Ook warme kleding, dekens en je identiteitsbewijs.'],
    ['Hang een wit laken uit het raam.', 'Zo zien hulpdiensten waar je bent.'],
    ['Loop en rijd nooit door het water.', null],
  ]);

  const shut = steps([
    ['Ga zo snel mogelijk naar binnen.', 'In de auto: motor uit en luchtroosters dicht.'],
    ['Sluit ramen en deuren.', 'Ook roosters, de afzuigkap en tussendeuren.'],
    ['Zet de mechanische ventilatie uit.', 'Trek de stekker eruit; die zit vaak in de meterkast of bij de <i class="nb">cv-ketel</i>.'],
    [`Zet de radio aan op ${esc(radio)}.`, 'En lees de NL-Alert op je telefoon.'],
    ['Ga pas naar buiten na het sein veilig.', null],
  ]);

  const pack = [
    ['Identiteitsbewijzen', null],
    ['Medicijnen', null],
    ['Telefoon en oplader', null],
    [`Contant geld: € ${needs.cash}`, null],
    ['Drinkwater en eten', null],
    ['Warme kleding en dekens', null],
    ['Stevige schoenen, regenkleding', null],
    ['Radio en zaklamp', 'met batterijen'],
    ['Huis- en autosleutels', null],
    h.children ? [h.children === 1 ? 'Voor je kind' : 'Voor je kinderen', 'wat het elke dag nodig heeft'] : null,
    h.pets ? [h.pets === 1 ? 'Je huisdier' : 'Je huisdieren', 'riem of reismand, voer'] : null,
    ['Dit handboek', null],
  ].filter(Boolean);

  return `<section class="page">
<div class="fh-head">
  <h1>Het eerste uur</h1>
  <p>Wat je meteen doet als het misgaat. Hang deze pagina aan de binnenkant van de meterkast.</p>
</div>

<div class="dark">
  <div>
    <h2>De stroom valt uit</h2>
    ${power}
  </div>
  <div class="fig">
    ${bathFigure(needs.water)}
    <p><b>Een bad is gemiddeld ${F.bathLitres} liter:</b> water om te spoelen en te wassen. De flessen zijn wat ${people === 1 ? 'je' : 'jullie'} in 72 uur ${people === 1 ? 'drinkt' : 'drinken'}: ${needs.water} liter, ${Math.ceil(needs.water / 1.5)} flessen van anderhalve liter.</p>
    ${coldFigure()}
    <p><b>Zo lang blijft eten koud</b> met de deur dicht. Het zijn schattingen.</p>
  </div>
</div>

<div class="pair">
  <div class="card">
    <h2>Er komt geen water uit de kraan</h2>
    ${water}
    ${waterFigure()}
  </div>
  <div class="card">
    ${inFloodZone
      ? `<h2>Het water komt</h2>${flood}<div class="fig">${depthFigure()}</div>`
      : `<h2>NL-Alert: ramen en deuren dicht</h2>${shut}<div class="fig">${shutFigure()}<p>Bij rook of een gevaarlijke stof in de lucht. Je woont buiten overstromingsrisicogebied; daarom staat hier geen hoogwaterkaart.</p></div>`}
  </div>
</div>

<div class="go">
  <div class="hd"><h2>Je moet weg: pak dit in tien minuten</h2><p class="lead">Zet het klaar in één tas bij de deur. Kruis af wat erin zit.</p></div>
  <ul class="ticks">${pack.map(([head, sub]) => `<li>${head}${sub ? `<span>${sub}</span>` : ''}</li>`).join('')}</ul>
  <p class="before"><b>Voor je de deur dichttrekt:</b> gas, water en elektriciteit afsluiten, huis op slot, familie laten weten waar je heen gaat. Rijd nooit door water.</p>
</div>

<footer>${esc(src.footer)}</footer>
</section>`;
}
