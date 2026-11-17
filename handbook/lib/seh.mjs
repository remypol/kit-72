/**
 * Emergency departments (SEH) from the table built out of RIVM's yearly
 * questionnaire (handbook/data/seh-nl.json). OpenStreetMap was tried first
 * and got two of three test addresses wrong.
 */
import { readFileSync } from 'node:fs';
import { metres } from './http.mjs';
import { route } from './osm.mjs';

const table = JSON.parse(readFileSync(new URL('../data/seh-nl.json', import.meta.url), 'utf8'));
export const sehSource = { ...table.source, checked: table.checked };

/**
 * The two departments to print: the quickest to reach by car, and the next
 * one. If the quickest is closed at night, the second is the quickest one
 * that is open day and night, so the page never leaves a night-time gap.
 */
export async function emergencyDepartments(home) {
  // the five nearest in a straight line are routed; the quickest by road is always among them in practice
  const near = table.locations
    .map((x) => ({ ...x, dist: metres(home, x) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 5);
  for (const x of near) x.drive = await route(home, x, 'driving');
  const time = (x) => x.drive?.minutes ?? (x.dist / 1000) * 1.6; // no route: assume 1.6 minutes per straight-line km
  near.sort((a, b) => time(a) - time(b));
  const [first, ...rest] = near;
  const second = first.allDay ? rest[0] : rest.find((x) => x.allDay) ?? rest[0];
  return [first, second].filter(Boolean);
}
