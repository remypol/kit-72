/**
 * Page 4 of the handbook: what not to do, and the household's own plan to
 * fill in by hand. The "do not" list is the part of handbook/data/hacks-nl.json
 * that failed the safety check; the plan fields follow the household.
 */
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../data/hacks-nl.json', import.meta.url), 'utf8'));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export const planCss = `
.pl-dont{border:.6mm solid #c2331f;border-radius:3mm;padding:4mm 5.5mm 2.4mm}
.pl-dont h2{font-size:15pt;color:#c2331f;margin-bottom:.4mm}
.pl-dont .lead{font-size:8.4pt;color:#43544b;margin-bottom:2.6mm}
.pl-dont ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:0 8mm}
.pl-dont li{position:relative;padding:1.7mm 0 1.7mm 9mm;border-top:.2mm solid #e6c3bd;line-height:1.3}
.pl-dont li::before{content:'';position:absolute;left:0;top:2.1mm;width:5.6mm;height:5.6mm;border-radius:50%;background:#c2331f linear-gradient(45deg,transparent 44%,#fff 44%,#fff 56%,transparent 56%) center/3.2mm 3.2mm no-repeat}
.pl-dont li::after{content:'';position:absolute;left:0;top:2.1mm;width:5.6mm;height:5.6mm;border-radius:50%;background:linear-gradient(-45deg,transparent 44%,#fff 44%,#fff 56%,transparent 56%) center/3.2mm 3.2mm no-repeat}
.pl-dont b{font-weight:700}
.pl-dont span{display:block;font-size:8pt;color:#43544b}
.pl-plan h2{font-size:15pt;margin-bottom:.4mm}
.pl-plan .lead{font-size:8.4pt;color:#43544b;margin-bottom:2.6mm}
.pl-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 8mm}
.pl-grid h3{font-family:'Archivo Variable',Arial,sans-serif;font-stretch:112%;font-weight:750;font-size:10.5pt;border-bottom:.6mm solid #10231b;padding-bottom:1mm}
.pl-field{border-bottom:.3mm solid #10231b;height:12.4mm;display:flex;align-items:flex-start;padding-top:1.1mm;font-size:7.8pt;color:#43544b}
.pl-radio{border-left:1.2mm solid #0a7a43;padding:.6mm 0 .6mm 3.4mm;font-size:8.8pt;line-height:1.35}
.pl-radio b{font-weight:700}
.pl-check{background:#f4f7f3;border-radius:3mm;padding:3.6mm 5.5mm 3.4mm}
.pl-check .hd{display:flex;justify-content:space-between;align-items:baseline;gap:6mm;margin-bottom:2.2mm}
.pl-check h2{font-size:12.5pt;margin:0}
.pl-check .next{font-size:8.6pt}
.pl-check .next b{font-family:'Archivo Variable',Arial,sans-serif;font-stretch:112%;font-weight:800}
.pl-check ul{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:1.8mm 6mm}
.pl-check li{position:relative;padding-left:6.2mm;line-height:1.3}
.pl-check li::before{content:'';position:absolute;left:0;top:.2mm;width:3.8mm;height:3.8mm;border:.4mm solid #10231b;border-radius:.7mm;background:#fff}
.pl-check span{display:block;font-size:7.7pt;color:#43544b}
`;

const fields = (list) => list.map((f) => `<div class="pl-field">${esc(f)}</div>`).join('');

export function planPage(d, needs) {
  const h = d.household;
  const people = [
    'Verzamelplek dichtbij huis',
    'Verzamelplek buiten de wijk',
    'Contactpersoon buiten de regio, met telefoonnummer',
    'Huisarts, met telefoonnummer',
    h.children ? (h.children === 1 ? 'Wie haalt je kind op van school of opvang' : 'Wie haalt de kinderen op van school of opvang') : 'Buren die hulp nodig hebben',
    h.pets ? (h.pets === 1 ? 'Waar kan je huisdier terecht' : 'Waar kunnen je huisdieren terecht') : 'Wie heeft een reservesleutel',
  ];
  const house = [
    'Hoofdkraan van het gas',
    'Hoofdkraan van het water',
    'Aardlekschakelaar en groepen',
    'Stekker van de mechanische ventilatie',
    'Zaklampen en radio',
    'Noodpakket en de tas voor als je weg moet',
  ];
  // the supplies and this handbook are checked twice a year, like the reminder email from the site
  const next = new Date(d.generated);
  next.setMonth(next.getMonth() + 6);
  const nextDate = next.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const checks = [
    ['Water ververst', `${needs.water} liter`],
    ['Houdbaarheid van het eten bekeken', `${needs.meals} maaltijden`],
    ['Batterijen en powerbank getest', null],
    ['Contant geld geteld', `€ ${needs.cash}, in kleine briefjes`],
    ['Medicijnen aangevuld', null],
    ['Dit handboek opnieuw gemaakt', 'adressen en openingstijden veranderen'],
  ];

  // the regional emergency broadcaster with every FM transmitter; which one comes in depends on where you are
  const r = d.region;
  const radio = r?.fm?.length
    ? `<p class="pl-radio"><b>Stel je radio nu af op ${esc(r.broadcaster)}.</b> FM ${r.fm.map(([place, mhz]) => `${esc(mhz.replace('.', ','))} (${esc(place)})`).join(', ')}${r.dab ? `; op DAB+ is het blok ${esc(r.dab)}` : ''}. Plak de frequentie die je ontvangt op de radio.</p>`
    : '';

  return `<section class="page">
<div class="fh-head">
  <h1>Jouw noodplan</h1>
  <p>Wat je laat, wat je vandaag opschrijft en wat je elk halfjaar naloopt.</p>
</div>

<div class="pl-dont">
  <h2>Doe dit niet, ook al lees je het overal</h2>
  <p class="lead">Deze trucs gaan rond op internet. Ze werken niet, of ze kunnen je het leven kosten.</p>
  <ul>${data.dont.map((x) => `<li><b>${esc(x.title)}</b><span>${esc(x.why)}</span></li>`).join('')}</ul>
</div>

<div class="pl-plan">
  <h2>Vul dit vandaag in</h2>
  <p class="lead">Met pen, want je telefoon kan leeg zijn. Loop het huis door en schrijf op waar alles zit.</p>
  <div class="pl-grid">
    <div><h3>Mensen</h3>${fields(people)}</div>
    <div><h3>In huis: waar zit het?</h3>${fields(house)}</div>
  </div>
</div>

${radio}
<div class="pl-check">
  <div class="hd"><h2>Elk halfjaar nalopen</h2><p class="next">Volgende keer: <b>${nextDate}</b></p></div>
  <ul>${checks.map(([head, sub]) => `<li>${esc(head)}${sub ? `<span>${esc(sub)}</span>` : ''}</li>`).join('')}</ul>
</div>

<footer>Dit handboek vervangt geen aanwijzingen van hulpdiensten. Bij levensgevaar bel je 112. kit-72.com</footer>
</section>`;
}
