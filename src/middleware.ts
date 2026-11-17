import { defineMiddleware } from 'astro:middleware';
import { decorateHtml } from './lib/affiliate';

/**
 * Runs for every page at build time (static output) and in dev.
 * Adds partner IDs + rel="sponsored" to all outbound shop links, so page
 * authors can keep writing plain shop URLs.
 */
export const onRequest = defineMiddleware(async (_ctx, next) => {
  const response = await next();
  const type = response.headers.get('content-type') ?? '';
  if (!type.includes('text/html')) return response;
  const html = await response.text();
  return new Response(decorateHtml(html), {
    status: response.status,
    headers: response.headers,
  });
});
