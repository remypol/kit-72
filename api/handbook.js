/**
 * Step 2 of the free handbook: the link from the email posts its token here
 * and gets the finished handbook back as one HTML document.
 *
 * The facts are collected at this moment from public sources (PDOK, AHN,
 * Rijkswaterstaat, CBS, RIVM table, OpenStreetMap), so every opening is a
 * fresh version. Nothing about the address is stored.
 */
import { unseal, resend, json, needs, householdLabel } from './_lib.js';
import { geocodeExact } from '../handbook/lib/pdok.mjs';
import { collect } from '../handbook/collect.mjs';
import { renderHtml } from '../handbook/render.mjs';

/** Adds the reader to the list, once, and only if they ticked the box on the form. */
async function subscribe(email, household) {
  const sub = { ...household, locale: 'nl' };
  const n = needs(sub);
  const base = { email, unsubscribed: false };
  if (process.env.RESEND_SEGMENT_ID) base.segments = [{ id: process.env.RESEND_SEGMENT_ID }];
  const properties = {
    kit72_locale: 'nl',
    kit72_household_size: String(n.people),
    kit72_has_children: String(household.children > 0),
    kit72_has_pets: String(household.pets > 0),
    kit72_signup_source: 'handbook',
  };
  let contact = await resend('/contacts', { ...base, properties });
  if (!contact.ok && contact.status !== 409) contact = await resend('/contacts', base);
  // 409: already on the list. The welcome sequence must not start again each time the link is opened.
  if (!contact.ok) return;
  await resend('/events/send', {
    event: 'kit72.subscribed',
    email,
    payload: {
      locale: 'nl',
      household: householdLabel(n.people, 'nl'),
      household_size: n.people,
      water_litres: n.waterLitres,
      meals: n.meals,
      lights: n.lights,
      cash_eur: n.cashEur,
      source: 'handbook',
    },
  });
}

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }
  const t = unseal(input?.t);
  if (!t) return json(410, { error: 'link_expired' });

  const household = { adults: t.h?.[0] ?? 2, children: t.h?.[1] ?? 0, pets: t.h?.[2] ?? 0 };
  try {
    const address = await geocodeExact(t.pc, t.nr, t.sx);
    if (!address) return json(404, { error: 'address_not_found' });
    const data = await collect(address, household, (line) => console.log('handbook:', line.trim()));
    const html = renderHtml(data, { web: true });
    if (t.tips) await subscribe(t.email, household).catch((err) => console.error('handbook: subscribe failed', err));
    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  } catch (err) {
    console.error('handbook: failed', err);
    return json(502, { error: 'generation_failed' });
  }
}
