/**
 * Step 1 of the free handbook: check the address and email a personal link.
 * Nothing is stored. The address and household travel in the link itself,
 * encrypted, so opening the link is also the proof that the email address
 * works.
 */
import { parseHandbookRequest, seal, sendEmail, json, siteUrl } from './_lib.js';
import { handbookEmail } from './_emails.js';
import { geocodeExact } from '../handbook/lib/pdok.mjs';

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }
  // Honeypot: bots fill the hidden "website" field. Pretend it worked.
  if (input && input.website) return json(200, { ok: true });

  const req = parseHandbookRequest(input || {});
  if (!req) return json(400, { error: 'invalid_email' });
  if (req.addressError) return json(400, { error: 'invalid_address' });

  let address;
  try {
    address = await geocodeExact(req.postcode, req.number, req.suffix);
  } catch (err) {
    console.error('handbook-request: address lookup failed', err);
    return json(502, { error: 'lookup_failed' });
  }
  if (!address) return json(404, { error: 'address_not_found' });

  try {
    const token = seal({
      email: req.email,
      pc: req.postcode,
      nr: req.number,
      sx: req.suffix,
      h: [req.adults, req.children, req.pets],
      tips: req.tips,
      ts: Date.now(),
    });
    // The token goes in the fragment, so it is never sent in a page request or logged by analytics.
    const url = `${siteUrl()}/nl/noodhandboek/mijn/#t=${token}`;
    const result = await sendEmail({ to: req.email, ...handbookEmail(address.label, url) });
    if (!result.ok) {
      console.error('handbook-request: resend rejected the email', result.status, result.data);
      return json(502, { error: 'send_failed' });
    }
  } catch (err) {
    console.error('handbook-request: failed', err);
    return json(500, { error: 'not_configured' });
  }
  return json(200, { ok: true, label: address.label });
}
