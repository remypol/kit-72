import { verify, resend, sendEmail, siteUrl, PATHS, needs } from './_lib.js';
import { welcomeEmail } from './_emails.js';

const redirect = (path) => new Response(null, { status: 302, headers: { Location: siteUrl() + path, 'Cache-Control': 'no-store' } });

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('t');
  const sub = verify(token);
  if (!sub) return redirect('/?confirm=expired');

  const done = PATHS[sub.locale].done;
  try {
    const n = needs(sub);
    // Prefixed: contact properties are account-wide in Resend, and the account
    // may be shared with other projects.
    const properties = {
      kit72_locale: sub.locale,
      kit72_household_size: String(n.people),
      kit72_has_children: String(sub.children > 0),
      kit72_has_pets: String(sub.pets > 0),
      kit72_signup_source: sub.source,
    };
    const base = { email: sub.email, unsubscribed: false };
    if (process.env.RESEND_SEGMENT_ID) base.segments = [{ id: process.env.RESEND_SEGMENT_ID }];

    // Custom properties must exist in Resend first; fall back to a bare contact
    // so a missing property never loses a confirmed subscriber.
    let contact = await resend('/contacts', { ...base, properties });
    if (!contact.ok && contact.status !== 409) contact = await resend('/contacts', base);
    if (!contact.ok && contact.status !== 409) {
      console.error('confirm: could not create contact', contact.status, contact.data);
      return redirect(done + '?status=error');
    }

    const mail = await sendEmail({ to: sub.email, ...welcomeEmail(sub) });
    if (!mail.ok) console.error('confirm: welcome email failed', mail.status, mail.data);

    const event = await resend('/events/send', {
      event: 'kit72.subscribed',
      email: sub.email,
      payload: { locale: sub.locale, household_size: n.people, water_litres: n.waterLitres, source: sub.source },
    });
    if (!event.ok) console.error('confirm: event not accepted', event.status, event.data);
  } catch (err) {
    console.error('confirm: failed', err);
    return redirect(done + '?status=error');
  }
  return redirect(done);
}
