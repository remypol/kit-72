/**
 * Collects every fact the handbook needs for one address. Used by the command
 * line (handbook/build.mjs) and by the site's function (api/handbook.js).
 * Independent lookups run side by side; a lookup that fails leaves a gap on
 * the page instead of failing the whole handbook.
 */
import { readFileSync } from 'node:fs';
import { elevation, floodRisk, safetyRegion } from './lib/pdok.mjs';
import { nearby, mapFeatures, route } from './lib/osm.mjs';
import { emergencyDepartments, sehSource } from './lib/seh.mjs';

const regions = JSON.parse(readFileSync(new URL('./data/regions-nl.json', import.meta.url), 'utf8'));

export async function collect(address, household, log = () => {}) {
  const step = async (label, fn, fallback) => {
    const t = Date.now();
    try {
      const v = await fn();
      log(`  ok   ${label} (${((Date.now() - t) / 1000).toFixed(1)} s)`);
      return v;
    } catch (err) {
      log(`  FAIL ${label}: ${err.message}`);
      return fallback;
    }
  };

  const [elev, flood, region, near, hospitals, area] = await Promise.all([
    step('hoogte (AHN)', () => elevation(address), null),
    step('overstromingsrisicogebied', () => floodRisk(address), []),
    step('veiligheidsregio', () => safetyRegion(address), null),
    step('punten in de buurt (OpenStreetMap)', () => nearby(address), null),
    step('spoedeisende hulp (RIVM)', () => emergencyDepartments(address), []),
    step('kaartgegevens (OpenStreetMap)', () => mapFeatures(address), null),
  ]);

  // Inside the map square the map data is complete; beyond it only the search service knows more.
  const nearest = near ?? (area ? {} : null);
  if (nearest && area) for (const [kind, list] of Object.entries(area.pois)) if (list.length) nearest[kind] = list;

  if (nearest) {
    await Promise.all(
      Object.values(nearest).map(async (list) => {
        const first = list?.[0];
        if (!first) return;
        first.walk = await route(address, first, 'walking');
        // beyond two kilometres nobody walks for groceries; give the cycling time as well
        if (first.walk && first.walk.metres > 2000) first.bike = await route(address, first, 'cycling');
      }),
    );
  }

  const info = regions.regions[region] ?? null;
  return {
    generated: new Date().toISOString(),
    address,
    household,
    elevation: elev,
    floodRisk: flood,
    safetyRegion: region,
    region: info ? { ...info, ...regions.broadcasters[info.broadcaster] } : null,
    nearby: nearest,
    hospitals,
    sehSource,
    mapFeatures: area?.ways ?? null,
  };
}
