/**
 * The one email the site sends itself: the double opt-in confirmation.
 * Everything after confirmation (welcome, tips, reminders) is sent by Resend
 * automations triggered by `kit72.subscribed`; see emails/ and docs/EMAILS.md.
 */
import { siteUrl, PATHS } from './_lib.js';
import { shell, p, button, esc, footLink } from './_shell.js';

const COPY = {
  nl: {
    subject: 'Bevestig je e-mailadres voor je noodpakketlijst',
    preheader: 'Eén klik en je lijst komt eraan.',
    heading: 'Bevestig je e-mailadres',
    lead: 'Eén klik en je lijst komt eraan. Daarna sturen we je drie korte tips en twee keer per jaar een herinnering om houdbaarheidsdata te controleren.',
    button: 'Bevestig en stuur mijn lijst',
    ignore: 'Niet aangevraagd? Dan hoef je niets te doen. Zonder bevestiging bewaren we je adres niet.',
    footer: 'Je ontvangt deze e-mail omdat dit adres is ingevuld op kit-72.com.',
    privacy: 'Privacy',
  },
  de: {
    subject: 'Bitte bestätige deine E-Mail-Adresse für deine Notfallliste',
    preheader: 'Ein Klick, dann kommt deine Liste.',
    heading: 'Bestätige deine E-Mail-Adresse',
    lead: 'Ein Klick, dann kommt deine Liste. Danach schicken wir dir drei kurze Tipps und erinnern dich zweimal im Jahr daran, die Haltbarkeitsdaten zu prüfen.',
    button: 'Bestätigen und Liste senden',
    ignore: 'Nicht angefordert? Dann musst du nichts tun. Ohne Bestätigung speichern wir deine Adresse nicht.',
    footer: 'Du erhältst diese E-Mail, weil diese Adresse auf kit-72.com eingetragen wurde.',
    privacy: 'Datenschutz',
  },
  es: {
    subject: 'Confirma tu correo para recibir tu lista de emergencia',
    preheader: 'Un clic y te enviamos tu lista.',
    heading: 'Confirma tu correo',
    lead: 'Un clic y te enviamos tu lista. Después recibirás tres consejos breves y, dos veces al año, un aviso para revisar las fechas de caducidad.',
    button: 'Confirmar y enviar mi lista',
    ignore: '¿No lo has pedido tú? No tienes que hacer nada. Sin confirmación no guardamos tu dirección.',
    footer: 'Recibes este correo porque esta dirección se introdujo en kit-72.com.',
    privacy: 'Privacidad',
  },
};

export function confirmEmail(sub, confirmUrl) {
  const c = COPY[sub.locale];
  const html = shell({
    locale: sub.locale,
    preheader: c.preheader,
    heading: c.heading,
    body: p(esc(c.lead)) + button(confirmUrl, c.button) + p(esc(c.ignore), { soft: true, small: true }),
    footer: `${esc(c.footer)} ${footLink(siteUrl() + PATHS[sub.locale].privacy, c.privacy)}`,
  });
  return {
    subject: c.subject,
    html,
    text: `${c.lead}\n\n${c.button}: ${confirmUrl}\n\n${c.ignore}`,
  };
}
