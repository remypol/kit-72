/**
 * Generates every brand asset from one definition of the mark:
 *   public/favicon.svg, public/logo.svg, apple-touch-icon, PWA icons,
 *   and the share images (public/images/og-*.jpg).
 *
 *   node scripts/brand.mjs
 *
 * The mark is a carry case with a handle (the "kit") carrying the number 72,
 * in the green of European safe-condition signs. Numerals are drawn as
 * strokes, so nothing depends on an installed font.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const GREEN = '#0a7a43';
const DEEP = '#0a3d26';
const INK = '#10231b';
const PAPER = '#f4f7f3';
const YELLOW = '#ffd21f';

/** The mark on a 64x64 grid. `keyline` adds the white inset line of a safety sign (large sizes only). */
export function mark({ keyline = false, fg = '#ffffff', bg = GREEN } = {}) {
  return `
  <path d="M23 15V11.5a5.5 5.5 0 0 1 5.5-5.5h7a5.5 5.5 0 0 1 5.5 5.5V15" fill="none" stroke="${bg}" stroke-width="5" stroke-linecap="butt"/>
  <rect x="4" y="13" width="56" height="47" rx="9" fill="${bg}"/>
  ${keyline ? `<rect x="7.5" y="16.5" width="49" height="40" rx="6" fill="none" stroke="${fg}" stroke-width="1.5"/>` : ''}
  <g fill="none" stroke="${fg}" stroke-width="6" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="2.2">
    <path d="M12.5 26.5H28.2L19.2 49.6"/>
    <path d="M36.4 33.6a7.1 7.1 0 0 1 14.2 0c0 4.6-3.6 7.2-12.6 14.9H52"/>
  </g>`;
}

const svg = (size, inner, viewBox = '0 0 64 64') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">${inner}</svg>`;

mkdirSync('public/icons', { recursive: true });
mkdirSync('public/images', { recursive: true });

// --- favicon + standalone logo (SVG) ---
writeFileSync('public/favicon.svg', svg(64, mark()) + '\n');
writeFileSync('public/logo.svg', svg(256, mark({ keyline: true })) + '\n');

// --- raster icons ---
const padded = (size, pad, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" fill="${bg}"/><g transform="translate(${pad} ${pad}) scale(${(64 - 2 * pad) / 64})">${mark({ keyline: true })}</g></svg>`;
const png = (s, file) => sharp(Buffer.from(s)).png({ compressionLevel: 9 }).toFile(file);
await png(padded(180, 7, PAPER), 'public/apple-touch-icon.png');
await png(padded(192, 9, PAPER), 'public/icons/icon-192.png');
await png(padded(512, 9, PAPER), 'public/icons/icon-512.png');

// --- share images, 1200x630 ---
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const FONT = "Arial, Helvetica, sans-serif";
const OG = {
  nl: { lines: ['Wat heeft jouw', 'huishouden nodig', 'voor 72 uur?'], sub: 'Bereken het en stel zelf je noodpakket samen.', title: '72 uur zonder hulp', rows: [['Drinkwater', '27 L'], ['Maaltijden', '27'], ['Zaklampen', '3']] },
  de: { lines: ['Was braucht dein', 'Haushalt für', '72 Stunden?'], sub: 'Berechne es und stelle deinen Notvorrat selbst zusammen.', title: '72 Stunden ohne Hilfe', rows: [['Trinkwasser', '18 L'], ['Mahlzeiten', '27'], ['Taschenlampen', '3']] },
  es: { lines: ['¿Qué necesita tu', 'hogar para aguantar', '72 horas?'], sub: 'Calcúlalo y monta tú mismo el kit de emergencia.', title: '72 horas sin ayuda', rows: [['Agua potable', '27 L'], ['Comidas', '27'], ['Linternas', '3']] },
  default: { lines: ['What does your', 'household need', 'for 72 hours?'], sub: 'Guides and tools in Dutch, German and Spanish.', title: '72 hours without help', rows: [['Drinking water', '27 L'], ['Meals', '27'], ['Flashlights', '3']] },
};
for (const [key, c] of Object.entries(OG)) {
  const rows = c.rows
    .map(
      ([label, value], i) => `
      <text x="792" y="${300 + i * 92}" font-family="${FONT}" font-size="30" font-weight="700" fill="#ffffff">${esc(label)}</text>
      <text x="1104" y="${306 + i * 92}" text-anchor="end" font-family="${FONT}" font-size="58" font-weight="700" fill="#ffffff">${esc(value)}</text>
      ${i < c.rows.length - 1 ? `<rect x="792" y="${336 + i * 92}" width="312" height="1.5" fill="#4fa37a"/>` : ''}`,
    )
    .join('');
  const image = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${PAPER}"/>
    <rect width="1200" height="14" fill="${GREEN}"/>
    <g transform="translate(72 70) scale(1.25)">${mark({ keyline: true })}</g>
    <text x="172" y="128" font-family="'Arial Black', ${FONT}" font-size="46" font-weight="900" fill="${INK}">Kit-72</text>
    ${c.lines.map((l, i) => `<text x="72" y="${270 + i * 78}" font-family="'Arial Black', ${FONT}" font-size="66" font-weight="900" letter-spacing="-1.5" fill="${INK}">${esc(l)}</text>`).join('')}
    <text x="72" y="${270 + c.lines.length * 78 - 6}" font-family="${FONT}" font-size="28" fill="#43544b">${esc(c.sub)}</text>
    <rect x="72" y="548" width="196" height="8" rx="2" fill="${YELLOW}"/>
    <text x="72" y="596" font-family="${FONT}" font-size="26" font-weight="700" fill="${DEEP}">kit-72.com</text>
    <rect x="752" y="150" width="392" height="400" rx="22" fill="${GREEN}"/>
    <rect x="764" y="162" width="368" height="376" rx="14" fill="none" stroke="#ffffff" stroke-width="3"/>
    <text x="792" y="220" font-family="${FONT}" font-size="26" font-weight="700" fill="#ffffff">${esc(c.title)}</text>
    <rect x="792" y="240" width="312" height="3" fill="#ffffff"/>
    ${rows}
  </svg>`;
  await sharp(Buffer.from(image)).jpeg({ quality: 86, mozjpeg: true }).toFile(`public/images/og-${key}.jpg`);
}
console.log('brand assets written');
