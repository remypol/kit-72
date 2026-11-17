/**
 * Affiliate link engine — the single place where outbound shop links get
 * their partner IDs. Used three ways:
 *   1. src/middleware.ts rewrites every shop <a> in the built HTML
 *   2. React components call decorateUrl() for links rendered client-side
 *   3. src/scripts/outbound.ts reports clicks to analytics
 *
 * IDs come from PUBLIC_* env vars (see .env.example). A merchant with no ID
 * configured keeps its plain link, so nothing breaks before sign-up.
 */

export type Merchant = 'amazon' | 'bol' | 'ration1' | 'sichersatt';

export interface AffiliateConfig {
  amazonTags: Partial<Record<'es' | 'de' | 'nl', string>>;
  bolPartnerId?: string;
  awinPublisherId?: string;
}

/** Awin advertiser IDs (verified on the Awin merchant profile pages). */
const AWIN_MERCHANT_IDS: Partial<Record<Merchant, string>> = {
  ration1: '23193',
};

export interface DecoratedLink {
  url: string;
  merchant: Merchant | null;
  /** true when a partner ID was applied */
  tagged: boolean;
}

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};

export function configFromEnv(e: Record<string, string | undefined> = env): AffiliateConfig {
  const clean = (v?: string) => (v && v.trim() ? v.trim() : undefined);
  return {
    amazonTags: {
      es: clean(e.PUBLIC_AMAZON_TAG_ES) ?? clean(e.PUBLIC_AMAZON_TAG),
      de: clean(e.PUBLIC_AMAZON_TAG_DE),
      nl: clean(e.PUBLIC_AMAZON_TAG_NL),
    },
    bolPartnerId: clean(e.PUBLIC_BOL_PARTNER_ID),
    awinPublisherId: clean(e.PUBLIC_AWIN_PUBLISHER_ID),
  };
}

export function merchantOf(rawUrl: string): Merchant | null {
  let host: string;
  try {
    host = new URL(rawUrl).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
  if (/^amazon\.(es|de|nl)$/.test(host)) return 'amazon';
  if (host === 'bol.com' || host === 'partner.bol.com') return 'bol';
  if (host === 'ration1.de') return 'ration1';
  if (host === 'sichersatt.de') return 'sichersatt';
  return null;
}

export function decorateUrl(rawUrl: string, cfg: AffiliateConfig = configFromEnv()): DecoratedLink {
  const merchant = merchantOf(rawUrl);
  if (!merchant) return { url: rawUrl, merchant: null, tagged: false };

  const url = new URL(rawUrl);

  if (merchant === 'amazon') {
    const tld = url.hostname.split('.').pop() as 'es' | 'de' | 'nl';
    const tag = cfg.amazonTags[tld];
    if (!tag) return { url: rawUrl, merchant, tagged: false };
    url.searchParams.set('tag', tag);
    return { url: url.toString(), merchant, tagged: true };
  }

  if (merchant === 'bol') {
    if (url.hostname === 'partner.bol.com') return { url: rawUrl, merchant, tagged: true };
    if (!cfg.bolPartnerId) return { url: rawUrl, merchant, tagged: false };
    const out = new URL('https://partner.bol.com/click/click');
    out.searchParams.set('p', '2');
    out.searchParams.set('t', 'url');
    out.searchParams.set('s', cfg.bolPartnerId);
    out.searchParams.set('f', 'TXL');
    out.searchParams.set('url', rawUrl);
    out.searchParams.set('name', 'kit-72');
    return { url: out.toString(), merchant, tagged: true };
  }

  // sichersatt.de runs an in-house programme whose link format is issued on
  // sign-up; recognised here for click tracking only until that is known.
  const mid = AWIN_MERCHANT_IDS[merchant];
  if (mid && cfg.awinPublisherId) {
    const out = new URL('https://www.awin1.com/cread.php');
    out.searchParams.set('awinmid', mid);
    out.searchParams.set('awinaffid', cfg.awinPublisherId);
    out.searchParams.set('ued', rawUrl);
    return { url: out.toString(), merchant, tagged: true };
  }
  return { url: rawUrl, merchant, tagged: false };
}

const ANCHOR_RE = /<a\b([^>]*?)\bhref="(https:\/\/(?:www\.)?(?:amazon\.(?:es|de|nl)|bol\.com|ration1\.de|sichersatt\.de)[^"]*)"([^>]*)>/g;

/** Rewrites every shop anchor in an HTML document. Pure; used by the middleware. */
export function decorateHtml(html: string, cfg: AffiliateConfig = configFromEnv()): string {
  return html.replace(ANCHOR_RE, (_m, before: string, href: string, after: string) => {
    const { url, merchant, tagged } = decorateUrl(href.replace(/&amp;/g, '&'), cfg);
    let attrs = `${before} ${after}`
      .replace(/\s*\brel="[^"]*"/g, '')
      .replace(/\s*\bdata-aff(?:-tagged)?="[^"]*"/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!/\btarget=/.test(attrs)) attrs += ' target="_blank"';
    const safe = url.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return `<a href="${safe}" rel="sponsored nofollow noopener" data-aff="${merchant}" data-aff-tagged="${tagged ? '1' : '0'}" ${attrs}>`;
  });
}
