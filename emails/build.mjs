/**
 * Builds the Resend templates from emails/content.mjs using the shared design
 * in api/_shell.js.
 *
 *   node emails/build.mjs
 *
 * Writes emails/out/<locale>-<key>.html plus manifest.json (name, alias,
 * subject, variables). Upload a changed file to its Resend template and
 * publish it again; the automations reference templates by ID.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell, p, button, sign, steps, marks, esc, footLink } from '../api/_shell.js';
import { emails, footer, url, paths } from './content.mjs';

const out = join(dirname(fileURLToPath(import.meta.url)), 'out');
mkdirSync(out, { recursive: true });

function block([kind, a, b]) {
  if (kind === 'p') return p(esc(a));
  if (kind === 'soft') return p(esc(a), { soft: true, small: true });
  if (kind === 'sign') return sign(a, b);
  if (kind === 'steps') return steps(a);
  if (kind === 'marks') return marks(a);
  throw new Error(`unknown block ${kind}`);
}

const manifest = [];
for (const [key, def] of Object.entries(emails)) {
  for (const locale of ['nl', 'de', 'es']) {
    const c = def[locale];
    const f = footer[locale];
    const body =
      c.blocks.map(block).join('\n') +
      '\n' +
      button(url(locale, c.button[0], key), c.button[1]) +
      (c.after ? '\n' + c.after.map(block).join('\n') : '');
    const foot =
      `${esc(f.why)} ${footLink('{{{RESEND_UNSUBSCRIBE_URL}}}', f.unsubscribe)} &nbsp;|&nbsp; ` +
      `${footLink('https://www.kit-72.com' + paths[locale].privacy, f.privacy)}<br><br>${esc(f.about)}`;
    const html = shell({ locale, preheader: c.preheader, heading: c.heading, body, footer: foot });
    const file = `${locale}-${key}.html`;
    writeFileSync(join(out, file), html);
    manifest.push({
      file,
      name: `Kit-72 ${locale.toUpperCase()} ${key}`,
      alias: `kit72-${locale}-${key}`,
      subject: c.subject,
      // CASH_EUR is only used in the Dutch welcome email
      variables: def.variables.filter((v) => html.includes(`{{{${v}}}}`)),
    });
  }
}
writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

// `node emails/build.mjs --preview` also writes emails/out/preview/ with sample
// values filled in, for looking at the design in a browser (not committed).
if (process.argv.includes('--preview')) {
  const { confirmEmail } = await import('../api/_emails.js');
  const sample = { HOUSEHOLD: { nl: '4 personen', de: '4 Personen', es: '4 personas' }, WATER_LITRES: '37', MEALS: '36', LIGHTS: '4', CASH_EUR: '200', RESEND_UNSUBSCRIBE_URL: '#' };
  const dir = join(out, 'preview');
  mkdirSync(dir, { recursive: true });
  const { readFileSync } = await import('node:fs');
  const links = [];
  for (const m of manifest) {
    const locale = m.file.slice(0, 2);
    let html = readFileSync(join(out, m.file), 'utf8');
    for (const [k, v] of Object.entries(sample)) html = html.replaceAll(`{{{${k}}}}`, typeof v === 'string' ? v : v[locale]);
    writeFileSync(join(dir, m.file), html);
    links.push(m.file);
  }
  for (const locale of ['nl', 'de', 'es']) {
    writeFileSync(join(dir, `${locale}-confirm.html`), confirmEmail({ locale }, 'https://www.kit-72.com/api/confirm?t=sample').html);
    links.push(`${locale}-confirm.html`);
  }
  writeFileSync(join(dir, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Kit-72 emails</title><ul>${links.map((l) => `<li><a href="${l}">${l}</a></li>`).join('')}</ul>`);
}
console.log(`built ${manifest.length} templates`);
