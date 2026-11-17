/**
 * Small fetch helper with a disk cache, so re-running the proof does not
 * hammer public services, and with a timeout so a dead service fails fast.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The disk cache is for local runs. A serverless function has no writable project folder
// and must always fetch fresh data, so the cache is off there.
const CACHE = process.env.VERCEL || process.env.KIT72_NO_CACHE ? null : join(dirname(fileURLToPath(import.meta.url)), '..', '.cache');
const UA = 'kit72-handbook/0.2 (+https://www.kit-72.com)';

export async function getJson(url, { body, timeoutMs = 25000, cache = true } = {}) {
  if (!CACHE) cache = false;
  const key = createHash('sha1').update(url + (body ?? '')).digest('hex');
  const file = cache ? join(CACHE, key + '.json') : null;
  if (cache && existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'));
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { 'User-Agent': UA, ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) },
    body,
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`);
  const text = await res.text();
  const data = JSON.parse(text.replace(/^callback\(|\)$/g, ''));
  if (cache) {
    mkdirSync(CACHE, { recursive: true });
    writeFileSync(file, JSON.stringify(data));
  }
  return data;
}

/** Distance in metres between two lat/lon points (haversine). */
export function metres(a, b) {
  const R = 6371000;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
