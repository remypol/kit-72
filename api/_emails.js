/**
 * The two emails the site sends itself. Everything later in the lifecycle
 * (see docs/EMAILS.md) is a Resend automation triggered by `kit72.subscribed`.
 */
import { needs, builderLink, siteUrl, PATHS } from './_lib.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function shell(locale, inner, footer) {
  return `<!doctype html><html lang="${locale}"><body style="margin:0;background:#f4f7f3;font-family:Arial,Helvetica,sans-serif;color:#10231b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #c9d3c9;border-radius:8px">
<tr><td style="padding:20px 28px;border-bottom:4px solid #0a7a43;font-size:20px;font-weight:bold">Kit-72</td></tr>
<tr><td style="padding:28px;font-size:16px;line-height:1.6">${inner}</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #dde4dc;font-size:12px;line-height:1.5;color:#5f6e65">${footer}</td></tr>
</table></td></tr></table></body></html>`;
}

const button = (href, label) =>
  `<p style="margin:24px 0"><a href="${esc(href)}" style="display:inline-block;background:#ffd21f;color:#1a1a00;font-weight:bold;text-decoration:none;padding:14px 22px;border-radius:6px">${esc(label)}</a></p>`;

const COPY = {
  nl: {
    confirmSubject: 'Bevestig je e-mailadres voor je noodpakketlijst',
    confirmLead: 'Eén klik en je lijst staat voor je klaar. Daarna sturen we je twee keer per jaar een herinnering om houdbaarheidsdata te controleren.',
    confirmButton: 'Bevestig en stuur mijn lijst',
    confirmIgnore: 'Niet aangevraagd? Dan hoef je niets te doen; zonder bevestiging bewaren we je adres niet.',
    welcomeSubject: 'Je noodpakketlijst voor 72 uur',
    welcomeLead: (n) => `Dit heeft jouw huishouden van ${n.people} ${n.people === 1 ? 'persoon' : 'personen'} nodig om 72 uur zonder hulp te kunnen:`,
    rows: (n) => [
      ['Drinkwater', `${n.waterLitres} liter`],
      ['Maaltijden die je niet hoeft te koelen', `${n.meals}`],
      ['Contant geld', `€ ${n.cashEur}`],
    ],
    welcomeNext: 'De volledige lijst, met wat je al in huis hebt afgevinkt, staat in de samensteller. Begin met water en licht: dat zijn de twee dingen die mensen bij een storing het eerst missen.',
    welcomeButton: 'Open mijn lijst',
    reminder: 'Over zes maanden krijg je van ons een korte herinnering om water, eten en batterijen te controleren.',
    footer: 'Je ontvangt deze e-mail omdat je je lijst hebt aangevraagd op kit-72.com. Afmelden kan in elke e-mail.',
    privacy: 'Privacy',
  },
  de: {
    confirmSubject: 'Bitte bestätige deine E-Mail-Adresse für deine Notfallliste',
    confirmLead: 'Ein Klick, dann liegt deine Liste bereit. Danach erinnern wir dich zweimal im Jahr daran, die Haltbarkeitsdaten zu prüfen.',
    confirmButton: 'Bestätigen und Liste senden',
    confirmIgnore: 'Nicht angefordert? Dann musst du nichts tun; ohne Bestätigung speichern wir deine Adresse nicht.',
    welcomeSubject: 'Deine Notfallliste für 72 Stunden',
    welcomeLead: (n) => `Das braucht dein Haushalt mit ${n.people} ${n.people === 1 ? 'Person' : 'Personen'}, um 72 Stunden ohne Hilfe auszukommen:`,
    rows: (n) => [
      ['Trinkwasser', `${n.waterLitres} Liter`],
      ['Mahlzeiten, die ohne Kühlung haltbar sind', `${n.meals}`],
    ],
    welcomeNext: 'Die vollständige Liste, in der du Vorhandenes abhaken kannst, findest du im Konfigurator. Fang mit Wasser und Licht an: Das fehlt bei einem Ausfall zuerst. Das BBK empfiehlt, den Vorrat danach auf zehn Tage auszubauen.',
    welcomeButton: 'Meine Liste öffnen',
    reminder: 'In sechs Monaten erinnern wir dich kurz daran, Wasser, Lebensmittel und Batterien zu prüfen.',
    footer: 'Du erhältst diese E-Mail, weil du deine Liste auf kit-72.com angefordert hast. Abmelden kannst du dich in jeder E-Mail.',
    privacy: 'Datenschutz',
  },
  es: {
    confirmSubject: 'Confirma tu correo para recibir tu lista de emergencia',
    confirmLead: 'Un clic y tu lista estará lista. Después te avisaremos dos veces al año para revisar las fechas de caducidad.',
    confirmButton: 'Confirmar y enviar mi lista',
    confirmIgnore: '¿No lo has pedido tú? No tienes que hacer nada; sin confirmación no guardamos tu dirección.',
    welcomeSubject: 'Tu lista de emergencia para 72 horas',
    welcomeLead: (n) => `Esto es lo que necesita tu hogar de ${n.people} ${n.people === 1 ? 'persona' : 'personas'} para aguantar 72 horas sin ayuda:`,
    rows: (n) => [
      ['Agua potable', `${n.waterLitres} litros`],
      ['Comidas que no necesitan nevera', `${n.meals}`],
    ],
    welcomeNext: 'La lista completa, donde puedes marcar lo que ya tienes en casa, está en el configurador. Empieza por el agua y la luz: es lo primero que se echa en falta en un apagón.',
    welcomeButton: 'Abrir mi lista',
    reminder: 'Dentro de seis meses te enviaremos un recordatorio breve para revisar agua, comida y pilas.',
    footer: 'Recibes este correo porque pediste tu lista en kit-72.com. Puedes darte de baja desde cualquier correo.',
    privacy: 'Privacidad',
  },
};

const footer = (locale) => {
  const c = COPY[locale];
  return `${esc(c.footer)} <a href="${siteUrl()}${PATHS[locale].privacy}" style="color:#5f6e65">${esc(c.privacy)}</a>`;
};

export function confirmEmail(sub, confirmUrl) {
  const c = COPY[sub.locale];
  return {
    subject: c.confirmSubject,
    html: shell(sub.locale, `<p style="margin:0">${esc(c.confirmLead)}</p>${button(confirmUrl, c.confirmButton)}<p style="margin:0;font-size:14px;color:#5f6e65">${esc(c.confirmIgnore)}</p>`, footer(sub.locale)),
    text: `${c.confirmLead}\n\n${c.confirmButton}: ${confirmUrl}\n\n${c.confirmIgnore}`,
  };
}

export function welcomeEmail(sub) {
  const c = COPY[sub.locale];
  const n = needs(sub);
  const rows = c.rows(n);
  const table = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;border-top:2px solid #10231b">${rows
    .map(([k, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #dde4dc">${esc(k)}</td><td align="right" style="padding:10px 0;border-bottom:1px solid #dde4dc;font-weight:bold;white-space:nowrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
  const link = builderLink(sub);
  return {
    subject: c.welcomeSubject,
    html: shell(sub.locale, `<p style="margin:0">${esc(c.welcomeLead(n))}</p>${table}<p style="margin:0">${esc(c.welcomeNext)}</p>${button(link, c.welcomeButton)}<p style="margin:0;font-size:14px;color:#5f6e65">${esc(c.reminder)}</p>`, footer(sub.locale)),
    text: `${c.welcomeLead(n)}\n\n${rows.map(([k, v]) => `- ${k}: ${v}`).join('\n')}\n\n${c.welcomeNext}\n\n${c.welcomeButton}: ${link}\n\n${c.reminder}`,
  };
}
