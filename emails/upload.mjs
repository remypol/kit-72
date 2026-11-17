/**
 * Creates or updates the Kit-72 templates in Resend and publishes them.
 *
 *   node emails/build.mjs && RESEND_API_KEY=re_... node emails/upload.mjs
 *
 * Templates are matched by alias (kit72-<locale>-<key>), so other projects'
 * templates in a shared account are never touched. Writes the alias -> id
 * map to emails/out/templates.json for the automations.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const key = process.env.RESEND_API_KEY;
if (!key) throw new Error('RESEND_API_KEY is not set');
const out = join(dirname(fileURLToPath(import.meta.url)), 'out');
const manifest = JSON.parse(readFileSync(join(out, 'manifest.json'), 'utf8'));
const NUMBERS = new Set(['WATER_LITRES', 'MEALS', 'LIGHTS', 'CASH_EUR']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, path, body) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://api.resend.com${path}`, {
      method,
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429 && attempt < 5) {
      await sleep(1200);
      continue;
    }
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${text}`);
    return data;
  }
}

const existing = new Map();
let after;
for (;;) {
  const page = await api('GET', `/templates?limit=100${after ? `&after=${after}` : ''}`);
  for (const t of page.data) if (t.alias) existing.set(t.alias, t.id);
  if (!page.has_more || page.data.length === 0) break;
  after = page.data[page.data.length - 1].id;
}

const ids = {};
for (const m of manifest) {
  const body = {
    name: m.name,
    alias: m.alias,
    subject: m.subject,
    from: 'Kit-72 <hallo@kit-72.com>',
    html: readFileSync(join(out, m.file), 'utf8'),
    variables: m.variables.map((v) => ({ key: v, type: NUMBERS.has(v) ? 'number' : 'string' })),
  };
  let id = existing.get(m.alias);
  if (id) await api('PATCH', `/templates/${id}`, body);
  else id = (await api('POST', '/templates', body)).id;
  await sleep(600);
  await api('POST', `/templates/${id}/publish`);
  await sleep(600);
  ids[m.alias] = id;
  console.log(`${existing.has(m.alias) ? 'updated' : 'created'} + published  ${m.alias}`);
}
writeFileSync(join(out, 'templates.json'), JSON.stringify(ids, null, 2) + '\n');
