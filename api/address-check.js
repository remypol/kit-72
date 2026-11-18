/**
 * Instant check for one Dutch address: ground level against NAP, whether it
 * lies in a designated flood-risk zone, and which emergency broadcaster
 * belongs to it. Used by the address check on /nl/hoogte-nap/ and
 * /nl/overstromingsrisico/. Nothing is stored or logged.
 */
import { json } from './_lib.js';
import { geocodeExact, elevation, floodRisk, safetyRegion } from '../handbook/lib/pdok.mjs';
import { readFileSync } from 'node:fs';

const regions = JSON.parse(readFileSync(new URL('../handbook/data/regions-nl.json', import.meta.url), 'utf8'));
const quiet = (promise) => promise.catch(() => undefined);

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }
  const postcode = String(input?.postcode || '').replace(/\s+/g, '').toUpperCase();
  const number = String(input?.number || '').trim();
  const suffix = String(input?.suffix || '').replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 6);
  if (!/^\d{4}[A-Z]{2}$/.test(postcode) || !/^\d{1,5}$/.test(number)) return json(400, { error: 'invalid_address' });

  let address;
  try {
    address = await geocodeExact(postcode, number, suffix);
  } catch {
    return json(502, { error: 'lookup_failed' });
  }
  if (!address) return json(404, { error: 'address_not_found' });

  // each lookup may fail on its own; the answer then says "unknown" for that part
  const [level, zones, region] = await Promise.all([quiet(elevation(address)), quiet(floodRisk(address)), quiet(safetyRegion(address))]);
  const broadcaster = region ? regions.regions[region]?.broadcaster ?? null : null;
  return json(200, {
    ok: true,
    label: address.label,
    municipality: address.municipality ?? null,
    elevation: typeof level === 'number' ? Math.round(level * 10) / 10 : null,
    // null: the lookup failed; []: not in a designated zone
    flood: Array.isArray(zones) ? zones : null,
    region: region ?? null,
    broadcaster,
  });
}
