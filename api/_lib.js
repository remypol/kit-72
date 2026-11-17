/**
 * Shared helpers for the email endpoints (Vercel Functions, Node runtime).
 * Files starting with "_" are not exposed as routes.
 *
 * Flow (double opt-in, no database):
 *   POST /api/subscribe  -> signs the request into a token, emails a confirm link
 *   GET  /api/confirm?t= -> verifies the token, creates the Resend contact and
 *                           fires `kit72.subscribed`; Resend automations then
 *                           send the welcome email, tips and reminders
 *
 * Required env: RESEND_API_KEY, SUBSCRIBE_SECRET, EMAIL_FROM
 * Optional env: RESEND_SEGMENT_ID, SITE_URL
 */
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const LOCALES = ['nl', 'de', 'es'];
export const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export const siteUrl = () => (process.env.SITE_URL || 'https://www.kit-72.com').replace(/\/$/, '');

export const PATHS = {
  nl: { builder: '/nl/tools/noodpakket-samenstellen/', done: '/nl/aangemeld/', privacy: '/nl/privacy/' },
  de: { builder: '/de/tools/notfallpaket-zusammenstellen/', done: '/de/angemeldet/', privacy: '/de/datenschutz/' },
  es: { builder: '/es/herramientas/configurador-kit/', done: '/es/suscrito/', privacy: '/es/privacidad/' },
};

const b64u = (buf) => Buffer.from(buf).toString('base64url');

export function sign(payload, secret = process.env.SUBSCRIBE_SECRET) {
  if (!secret) throw new Error('SUBSCRIBE_SECRET is not set');
  const body = b64u(JSON.stringify(payload));
  const mac = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${mac}`;
}

export function verify(token, secret = process.env.SUBSCRIBE_SECRET, now = Date.now()) {
  if (!secret || typeof token !== 'string') return null;
  const [body, mac] = token.split('.');
  if (!body || !mac) return null;
  const expected = createHmac('sha256', secret).update(body).digest();
  let given;
  try {
    given = Buffer.from(mac, 'base64url');
  } catch {
    return null;
  }
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (typeof payload.ts !== 'number' || now - payload.ts > TOKEN_MAX_AGE_MS) return null;
  return payload;
}

/**
 * Sealed tokens for the handbook link. Unlike sign(), the payload is
 * encrypted (AES-256-GCM), because it holds a home address and the link sits
 * in a mailbox. The key is derived from SUBSCRIBE_SECRET.
 */
const sealKey = (secret) => createHash('sha256').update(`${secret}:handbook`).digest();
export const HANDBOOK_LINK_MAX_AGE_MS = 400 * 24 * 60 * 60 * 1000;

export function seal(payload, secret = process.env.SUBSCRIBE_SECRET) {
  if (!secret) throw new Error('SUBSCRIBE_SECRET is not set');
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', sealKey(secret), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString('base64url');
}

export function unseal(token, maxAgeMs = HANDBOOK_LINK_MAX_AGE_MS, secret = process.env.SUBSCRIBE_SECRET, now = Date.now()) {
  if (!secret || typeof token !== 'string' || token.length > 2000) return null;
  try {
    const raw = Buffer.from(token, 'base64url');
    if (raw.length < 29) return null;
    const decipher = createDecipheriv('aes-256-gcm', sealKey(secret), raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const payload = JSON.parse(Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString('utf8'));
    if (typeof payload.ts !== 'number' || now - payload.ts > maxAgeMs) return null;
    return payload;
  } catch {
    return null;
  }
}

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i;
const int = (v, min, max, dflt) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : dflt;
};

/** Validates and normalises untrusted form input. Returns null if unusable. */
export function parseSubscription(input) {
  if (!input || typeof input !== 'object') return null;
  const email = String(input.email || '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return null;
  const locale = LOCALES.includes(input.locale) ? input.locale : 'nl';
  return {
    email,
    locale,
    adults: int(input.adults, 1, 12, 2),
    children: int(input.children, 0, 12, 0),
    pets: int(input.pets, 0, 12, 0),
    source: String(input.source || 'unknown').replace(/[^a-z0-9_-]/gi, '').slice(0, 40) || 'unknown',
  };
}

/** Validates the handbook form. Returns null if unusable. Dutch addresses only. */
export function parseHandbookRequest(input) {
  const sub = parseSubscription({ ...input, locale: 'nl', source: 'handbook' });
  if (!sub) return null;
  const postcode = String(input.postcode || '').replace(/\s+/g, '').toUpperCase();
  const number = String(input.number || '').trim();
  const suffix = String(input.suffix || '').replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 6);
  if (!/^\d{4}[A-Z]{2}$/.test(postcode) || !/^\d{1,5}$/.test(number)) return { ...sub, addressError: true };
  return { ...sub, postcode, number, suffix, tips: input.tips === true };
}

export async function resend(path, body) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  const res = await fetch(`https://api.resend.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON error body */
  }
  return { ok: res.ok, status: res.status, data };
}

export const sendEmail = ({ to, subject, html, text }) =>
  resend('/emails', { from: process.env.EMAIL_FROM || 'Kit-72 <hallo@kit-72.com>', to: [to], subject, html, text });

export const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

/** Litres per person per day in each country's official advice (keep in sync with src/data/site.ts). */
const WATER_PER_DAY = { nl: 3, es: 3, de: 2 };

/** What a household needs for 72 hours. */
export function needs({ adults, children, pets, locale }) {
  const people = adults + children;
  const perDay = WATER_PER_DAY[locale] ?? 3;
  return {
    people,
    waterLitres: people * perDay * 3 + pets,
    meals: people * 9,
    lights: Math.max(2, people),
    cashEur: adults * 70 + children * 30,
  };
}

const PEOPLE = { nl: ['persoon', 'personen'], de: ['Person', 'Personen'], es: ['persona', 'personas'] };

/** "3 personen" / "1 Person": used in the welcome email. */
export const householdLabel = (people, locale) => `${people} ${(PEOPLE[locale] ?? PEOPLE.nl)[people === 1 ? 0 : 1]}`;
