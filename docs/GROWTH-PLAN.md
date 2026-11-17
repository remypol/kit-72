# Kit-72: audit, ranked changes and plan

Written 2026-11-17 on branch `growth-overhaul`. Evidence and the full trail are in [LOG.md](LOG.md).

## The short version

Kit-72 was not failing to monetise; it had no monetisation switched on. Of 296 outbound shop links, 7 carried a partner ID. There was no email capture, no click tracking, and most colour styling was silently dropped by the CSS build, which is why the site looked broken.

Those are now fixed in code. What remains is account sign-ups only you can do (section 4), and one business decision (section 5).

## 1. Can this reach €10k a month?

There is no traffic data in the repo and I had no analytics access, so this is a model, not a forecast. The numbers that matter are now measurable because clicks are tracked.

| Route | Earnings per order | Orders needed for €10k/month |
|---|---|---|
| Amazon.de / .es, €40 basket at 3–5 % | €1.20 – €2.00 | 5,000 – 8,300 |
| Amazon.nl, €40 basket at 10 % | €4.00 | 2,500 |
| ration1.de food pack, €119 at 15 % | €17.85 | 560 |
| ration1.de power-outage pack, €299 at 15 % | €44.85 | 223 |
| Own curated kit, €130 at an assumed 25 % margin | €32.50 | 308 |

Reading it honestly:

- Affiliate income from the old link mix (Amazon.de/.es search links) cannot get there at any realistic traffic for a site this size.
- Specialist merchants paying 10–15 % with 30-day cookies change the arithmetic by roughly ten times per order. That is the first lever and it costs nothing.
- Affiliate income is not recurring revenue. It follows news events: the Dutch government booklet (Nov 2025), the Iberian blackout (Apr 2025), the Berlin outage (Jan 2026). The email list is what turns a spike into repeat visits, which is why it ranks third.
- €10k a month on affiliate alone is plausible only with strong rankings in all three countries. A margin product or bulk sales to organisations (section 5) is the more dependable second half. I would treat €1–3k a month from affiliate plus list as the first milestone and decide on the second engine with real click data.

## 2. The ten changes, ranked by likely money

| # | Change | Evidence | Status |
|---|---|---|---|
| 1 | Put a partner ID on every shop link, from one place | 178 of 185 Amazon links and all 111 bol.com links were untagged; Amazon.es was never tagged | **Done.** `src/lib/affiliate.ts` + `src/middleware.ts`. Amazon.es/.de links now tagged in the build (92 of 104); the rest wait for IDs |
| 2 | Move buying links to merchants that pay 10–15 % | ration1 (Awin) 15 %, 30-day cookie; SicherSatt 10 % recurring; Amazon.nl 10 % on outdoor/home/grocery; Amazon.de/.es 1–5 %, 24 h | **Built, needs accounts.** Awin and bol.com links activate when the IDs are set |
| 3 | Capture email with a reason to stay: your list now, an expiry reminder twice a year | No competitor offers a reminder, saved list or quiz; best offer seen is a €5–10 voucher. 42 % of Dutch booklet readers took no action (NOS, Apr 2026) | **Built, needs Resend keys.** Double opt-in endpoints, form on every content page, tested with a mocked provider |
| 4 | Repair and replace the design | 2,494 colour classes compiled to invalid CSS; article typography relied on an uninstalled plugin; global link colour overrode every button | **Done.** New light design system, self-hosted fonts |
| 5 | Pages for people ready to buy: "buy or build", with real prices | Shops charge €57 – €980; Kassa warns against expensive ready-made kits; retailers and media hold the "kopen" searches, nobody shows prices side by side | **Done** in NL, DE, ES with prices read from the shops on 17 Nov 2026 |
| 6 | Make the homepage do the job: household in, needs out, one action | Old homepage led with three static numbers and four scenario cards; the tool was below the fold | **Done.** Shared component, calculator hero |
| 7 | A where-to-buy box at the top of each product page; drop invented ratings | NL/DE product pages had one untagged link at the very bottom; ES pages showed hand-typed star ratings and prices, which Amazon's programme rules forbid | **Done** on 14 NL/DE pages; ratings and static prices removed from ES cards |
| 8 | Measure what earns, legally | No outbound click events existed; Analytics loaded without consent and fonts came from Google, a known exposure in Germany and a blocker for affiliate network approval | **Done.** `affiliate_click` and `generate_lead` events; Analytics loads only after a yes |
| 9 | A product with margin, or bulk sales to organisations | Specialists earn on €100 – €1,300 bundles; ration1 runs a desk for companies and authorities; the table in section 1 | **Not built.** Needs your decision, see section 5 |
| 10 | Named product picks and deeper pillar pages | The main Dutch pillar page (`/nl/noodpakket-samenstellen/`) is 52 lines; product pages recommend categories, not products | **Not built.** Needs product research with verified data, see section 6 |

Also fixed along the way: the Spanish blackout page dated the event 28 April 2024 (it was 2025; URL redirected), 24 icons rendered as "?", `llms.txt` pointed at URLs that do not exist, the sitemap stamped every page with the build date, and the "Home" nav item was highlighted on every page.

## 3. What was built

- **Affiliate engine**: `src/lib/affiliate.ts` (pure, unit-tested), `src/middleware.ts` (rewrites every shop link at build time and adds `rel="sponsored nofollow"`), `src/scripts/outbound.ts` (tags links rendered by React, reports clicks). Page authors keep writing plain shop URLs.
- **Email**: `api/subscribe.js` and `api/confirm.js` (Vercel Functions, no database: the confirm link is an HMAC-signed token). Confirmation and welcome emails in three languages in `api/_emails.js`. The rest of the sequence is drafted in [EMAILS.md](EMAILS.md).
- **Pages**: three homepages on one component, three buy-or-build pages, three confirmation pages.
- **Design**: tokens and base styles in `src/styles/global.css`; green of European safety signs as the brand colour, yellow reserved for the one main action, red for "critical" only.
- **Data files**: `src/data/site.ts` (routes and copy), `src/data/compare.ts` (prices, with the date they were checked), `src/data/shop.ts` (where-to-buy links).

Not verified: the email endpoints against the real Resend API (no key in this environment), and the production deployment. The site builds (104 pages) and was checked in a browser at desktop and phone width in all three languages.

## 4. What only you can do

In rough order of value. Each ID goes into Vercel → Project → Environment Variables, then redeploy. Names are in `.env.example`.

1. **bol.com Partnerprogramma**: sign up, set `PUBLIC_BOL_PARTNER_ID`. Activates 39+ Dutch links.
2. **Awin**: join as publisher, apply to ration1 (advertiser 23193), set `PUBLIC_AWIN_PUBLISHER_ID`.
3. **Amazon.nl Associates**: set `PUBLIC_AMAZON_TAG_NL`. Confirm `kit72es-21` and `kit72de-21` are live accounts (both are now set in Vercel).
4. **Resend**: blocked on the plan's domain limit (10 of 10 used by other projects). Upgrade, or open a separate Resend account for Kit-72 (recommended: contacts and unsubscribes are account-wide). Then add `kit-72.com`, put the DNS records in at Squarespace Domains, set `RESEND_API_KEY` and `RESEND_SEGMENT_ID`, and switch on `PUBLIC_SIGNUP_ENABLED=true`. `SUBSCRIBE_SECRET` and `EMAIL_FROM` are already set.
5. **SicherSatt**: apply to their in-house programme; send me the link format and I will add it (it is recognised for tracking already).
6. **Vercel domains**: change the `kit-72.com` → `www` redirect from 307 to 308.
7. **Search Console**: submit the three new URLs and check that the 2024 → 2025 redirect is picked up.

## 5. The decision: what is the second engine?

Pick after four to six weeks of click data.

- **A. Curated kit with a fulfilment partner.** Kit-72 specifies a "what's usually missing" box; a shop packs and ships it; you take a margin instead of a commission. Fits the "don't overpay" position if priced under the €100 entry kits. Needs a partner and customer service.
- **B. Bulk for organisations.** Housing associations, employers and owners' associations buying for many households. One deal equals hundreds of consumer orders. Needs outbound sales, which a content site does not do by itself. A referral arrangement with a shop that already has a business desk is the low-effort version.
- **C. Stay pure affiliate and grow traffic.** Lowest effort, lowest ceiling, most exposed to Amazon's commission changes (cuts of up to 50 % for some publishers were reported in May 2026).

My recommendation is B as a referral arrangement first, because it needs no stock and no support, then A if the click data shows people want a ready answer.

## 6. Next content work

1. Named picks on each product page (three per category: basic, better, long-life), each with a price read from the shop and a check date, in the same pattern as `compare.ts`.
2. Rebuild the three pillar pages around the builder, starting with `/nl/noodpakket-samenstellen/`.
3. One page per event when it happens (outage, flood warning), linked from the homepage for that week and sent to the list.
4. A Dutch and German page for power stations: EcoFlow pays about 5 % on baskets above €1,000.
