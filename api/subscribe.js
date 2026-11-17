import { parseSubscription, sign, sendEmail, json, siteUrl } from './_lib.js';
import { confirmEmail } from './_emails.js';

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend it worked.
  if (input && input.website) return json(200, { ok: true });
  if (!input || input.consent !== true) return json(400, { error: 'consent_required' });

  const sub = parseSubscription(input);
  if (!sub) return json(400, { error: 'invalid_email' });

  try {
    const token = sign({ ...sub, ts: Date.now() });
    const confirmUrl = `${siteUrl()}/api/confirm?t=${encodeURIComponent(token)}`;
    const result = await sendEmail({ to: sub.email, ...confirmEmail(sub, confirmUrl) });
    if (!result.ok) {
      console.error('subscribe: resend rejected the confirmation email', result.status, result.data);
      return json(502, { error: 'send_failed' });
    }
  } catch (err) {
    console.error('subscribe: failed', err);
    return json(500, { error: 'not_configured' });
  }
  return json(200, { ok: true });
}
