/**
 * Outbound shop-click tracking. One delegated listener for the whole page,
 * including links rendered later by React islands.
 * Sends a GA4 event only if analytics consent was given (gtag handles that
 * through consent mode); always dispatches a DOM event for debugging/tests.
 */
import { decorateUrl, merchantOf } from '../lib/affiliate';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function report(a: HTMLAnchorElement) {
  const merchant = a.dataset.aff || merchantOf(a.href);
  if (!merchant) return;
  const detail = {
    merchant,
    tagged: a.dataset.affTagged === '1',
    link_url: a.href,
    link_text: (a.textContent || '').trim().slice(0, 80),
    placement: a.closest<HTMLElement>('[data-placement]')?.dataset.placement || 'inline',
    page_path: location.pathname,
  };
  window.gtag?.('event', 'affiliate_click', detail);
  document.dispatchEvent(new CustomEvent('kit72:affiliate-click', { detail }));
}

function anchorOf(e: Event) {
  return (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
}

/**
 * Links rendered by React islands are not seen by the build-time middleware
 * (hydration restores the raw URL), so tag them just before they are used.
 */
function ensureTagged(e: Event) {
  const a = anchorOf(e);
  if (!a || a.dataset.affTagged === '1' || !merchantOf(a.href)) return;
  const link = decorateUrl(a.href);
  a.dataset.aff = link.merchant ?? '';
  a.dataset.affTagged = link.tagged ? '1' : '0';
  a.rel = 'sponsored nofollow noopener';
  if (link.tagged) a.href = link.url;
}

function onClick(e: Event) {
  ensureTagged(e);
  const a = anchorOf(e);
  if (a) report(a);
}

for (const type of ['pointerdown', 'focusin', 'contextmenu']) {
  document.addEventListener(type, ensureTagged, { capture: true });
}
document.addEventListener('click', onClick, { capture: true });
document.addEventListener('auxclick', onClick, { capture: true });
