/**
 * Shared email design for Kit-72: the two emails the site sends itself
 * (api/_emails.js) and the Resend templates built by emails/build.mjs.
 *
 * Email clients need table layout and inline styles, so this is plain string
 * building. Colours follow the site: safety green, hi-vis yellow for the one
 * action, dark ink on white.
 */

export const C = {
  page: '#e9eee8',
  card: '#ffffff',
  ink: '#10231b',
  soft: '#43544b',
  muted: '#5f6e65',
  line: '#c9d3c9',
  green: '#0a7a43',
  greenTint: '#d6efe0',
  yellow: '#ffd21f',
  yellowEdge: '#d4a900',
  yellowInk: '#1a1a00',
};

const FONT = "Arial, Helvetica, sans-serif";
const T = 'cellpadding="0" cellspacing="0" border="0" role="presentation"';

export const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Paragraph. `html` is trusted markup (already escaped by the caller). */
export const p = (html, { soft = false, small = false } = {}) =>
  `<p style="margin-top:0;margin-right:0;margin-bottom:16px;margin-left:0;font-family:${FONT};font-size:${small ? 14 : 16}px;line-height:${small ? 21 : 26}px;color:${soft ? C.soft : C.ink};">${html}</p>`;

export const link = (href, label) =>
  `<a href="${esc(href)}" style="color:${C.green};font-weight:bold;text-decoration:underline;">${esc(label)}</a>`;

/** The one main action of an email. */
export const button = (href, label) =>
  `<table ${T} style="margin-top:8px;margin-bottom:24px;"><tr><td align="center" bgcolor="${C.yellow}" style="background-color:${C.yellow};border-radius:6px;border-bottom-width:3px;border-bottom-style:solid;border-bottom-color:${C.yellowEdge};">` +
  `<a href="${esc(href)}" style="display:inline-block;padding-top:14px;padding-right:28px;padding-bottom:13px;padding-left:28px;font-family:${FONT};font-size:16px;line-height:20px;font-weight:bold;color:${C.yellowInk};text-decoration:none;">${esc(label)}</a>` +
  `</td></tr></table>`;

/**
 * The green panel from the homepage calculator: label left, figure right.
 * rows: [label, note, value] — value may be a template variable.
 */
export function sign(title, rows) {
  const body = rows
    .map(
      ([label, note, value], i) =>
        `<tr><td style="padding-top:14px;padding-bottom:14px;${i < rows.length - 1 ? 'border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#4fa37a;' : ''}font-family:${FONT};font-size:16px;line-height:22px;font-weight:bold;color:#ffffff;">${esc(label)}` +
        `<br><span style="font-size:13px;line-height:18px;font-weight:normal;color:${C.greenTint};">${esc(note)}</span></td>` +
        `<td align="right" valign="middle" style="padding-top:14px;padding-bottom:14px;padding-left:12px;white-space:nowrap;${i < rows.length - 1 ? 'border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#4fa37a;' : ''}font-family:${FONT};font-size:30px;line-height:34px;font-weight:bold;color:#ffffff;">${value}</td></tr>`,
    )
    .join('');
  return (
    `<table ${T} width="100%" bgcolor="${C.green}" style="background-color:${C.green};border-radius:10px;margin-bottom:24px;"><tr><td style="padding-top:22px;padding-right:24px;padding-bottom:10px;padding-left:24px;">` +
    `<table ${T} width="100%"><tr><td colspan="2" style="padding-bottom:12px;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#ffffff;font-family:${FONT};font-size:15px;line-height:20px;font-weight:bold;color:#ffffff;">${esc(title)}</td></tr>${body}</table>` +
    `</td></tr></table>`
  );
}

/** A numbered list for things done in order. items: [boldLead, rest] or plain strings. */
export function steps(items) {
  const rows = items
    .map((item, i) => {
      const [lead, rest] = Array.isArray(item) ? item : [null, item];
      const text = lead ? `<strong>${esc(lead)}</strong> ${esc(rest)}` : esc(rest);
      return (
        `<tr><td width="34" valign="top" style="padding-top:13px;padding-bottom:13px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:${C.line};font-family:${FONT};font-size:20px;line-height:26px;font-weight:bold;color:${C.green};">${i + 1}</td>` +
        `<td valign="top" style="padding-top:13px;padding-bottom:13px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:${C.line};font-family:${FONT};font-size:16px;line-height:26px;color:${C.ink};">${text}</td></tr>`
      );
    })
    .join('');
  return `<table ${T} width="100%" style="margin-bottom:24px;border-top-width:2px;border-top-style:solid;border-top-color:${C.ink};">${rows}</table>`;
}

/** An unnumbered list with a mark per row (default: a cross, for "not included"). */
export function marks(items, mark = '&#10005;', color = '#c2331f') {
  const rows = items
    .map(
      (item) =>
        `<tr><td width="28" valign="top" style="padding-top:11px;padding-bottom:11px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:${C.line};font-family:${FONT};font-size:15px;line-height:26px;font-weight:bold;color:${color};">${mark}</td>` +
        `<td valign="top" style="padding-top:11px;padding-bottom:11px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:${C.line};font-family:${FONT};font-size:16px;line-height:26px;color:${C.ink};">${esc(item)}</td></tr>`,
    )
    .join('');
  return `<table ${T} width="100%" style="margin-bottom:24px;border-top-width:2px;border-top-style:solid;border-top-color:${C.ink};">${rows}</table>`;
}

/**
 * Full document.
 * heading: plain text. body: trusted HTML built from the helpers above.
 * footer: trusted HTML (small print, unsubscribe link).
 */
export function shell({ locale, preheader, heading, body, footer }) {
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(heading)}</title>
</head>
<body style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;background-color:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${C.page};">${esc(preheader)}</div>
<table ${T} width="100%" bgcolor="${C.page}" style="background-color:${C.page};">
<tr><td align="center" style="padding-top:32px;padding-right:12px;padding-bottom:32px;padding-left:12px;">
<table ${T} width="600" style="width:100%;max-width:600px;">
<tr><td style="padding-bottom:16px;padding-left:4px;">
<table ${T}><tr>
<td width="38" height="38" align="center" valign="middle" bgcolor="${C.green}" style="background-color:${C.green};border-radius:6px;font-family:${FONT};font-size:16px;line-height:38px;font-weight:bold;color:#ffffff;">72</td>
<td valign="middle" style="padding-left:10px;font-family:'Arial Black', ${FONT};font-size:20px;line-height:38px;font-weight:bold;color:${C.ink};">Kit-72</td>
</tr></table>
</td></tr>
<tr><td bgcolor="${C.card}" style="background-color:${C.card};border-width:1px;border-style:solid;border-color:${C.line};border-top-width:6px;border-top-color:${C.green};border-radius:10px;">
<table ${T} width="100%"><tr><td style="padding-top:34px;padding-right:36px;padding-bottom:14px;padding-left:36px;">
<h1 style="margin-top:0;margin-right:0;margin-bottom:18px;margin-left:0;font-family:${FONT};font-size:28px;line-height:34px;font-weight:bold;letter-spacing:-0.5px;color:${C.ink};">${esc(heading)}</h1>
${body}
</td></tr></table>
</td></tr>
<tr><td style="padding-top:20px;padding-right:8px;padding-bottom:0;padding-left:8px;font-family:${FONT};font-size:12px;line-height:19px;color:${C.muted};">${footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export const footLink = (href, label) => `<a href="${esc(href)}" style="color:${C.muted};text-decoration:underline;">${esc(label)}</a>`;
