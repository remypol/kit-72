# Kit-72 growth overhaul — running log

Branch: `growth-overhaul`. Started 2026-11-17. Newest entries at the bottom.

## 1. Orientation

- Kit-72 is a static Astro 5 site (Tailwind 4, a few React islands), three locales (ES, NL, DE), 98 built pages. Deployed on Vercel at www.kit-72.com.
- There is no product, pricing, onboarding or email anywhere in the repo. "Partners" means outbound links to Amazon.es, Amazon.de and bol.com. So the business audit is really: content site + affiliate links + three free tools.
- Five planning documents sit in the repo root (4,473 lines). None of the monetisation ideas in them were built.

## 2. Audit findings (verified in the code or on the live site)

| # | Finding | Evidence |
|---|---|---|
| A1 | **The site cannot earn.** 178 of 185 Amazon links have no affiliate tag; 0 of 111 bol.com links go through the partner programme; Amazon.es links are never tagged. | `grep` over `src/` before changes: 185 amazon links, 7 with `tag=`; 111 bol links, 0 partner links |
| A2 | Nearly every outbound shop link is a **search-results link** ("powerbank 20000mah"), not a product or a merchant with a real commission. | Same grep; top links are `amazon.es/s?k=…`, `bol.com/nl/nl/s/?searchtext=…` |
| A3 | **No email capture at all.** No newsletter, no saved list, no reminder. A visitor who builds a kit list leaves and is gone. | No form or endpoint in `src/`; only `mailto` match is unrelated |
| A4 | **The design is broken, not just dated.** 2,494 colour classes used Tailwind v3 syntax (`bg-[--color-x]`) which Tailwind v4 compiles to invalid CSS (`background-color:--color-x`), so they were silently ignored. | Found `background-color:--color-accent-primary` in built CSS |
| A5 | Article pages use `.prose` but the typography plugin is not installed, so headings, lists and paragraphs had no spacing. | `global.css` only set `--tw-prose-*` variables; no plugin in `package.json` |
| A6 | "Product" pages contain no products: generic advice plus one untagged search link at the bottom. No comparison, no prices, no recommendation. | e.g. `src/pages/nl/producten/ehbo-doos/index.astro` |
| A7 | Google Analytics loads with no consent, and Google Fonts load from Google's servers. Both are a legal exposure for a DE/NL/ES site and block acceptance into affiliate networks. | `BaseLayout.astro`; `PUBLIC_SHOW_COOKIE_BANNER` flag exists but nothing reads it |
| A8 | No click tracking on outbound shop links, so there is no way to know which pages make money. | No event code in `src/` |
| A9 | Housekeeping: `llms.txt` lists URLs that do not exist (`/es/tools/kit-builder/`), sitemap stamps every page with today's date, footer says 2025, `.old` page files in `src/pages`. | Files read |
| A10 | Live site responds fine (200, <0.5 s). `kit-72.com` → `www` is a 307 (temporary) redirect; should be 308. | `curl` |

## 3. Competitor research (sub-agent, pages fetched 2026-11-17)

Limits: search ran from the US, so local rankings were not observed; no traffic or search-volume data was obtainable.

| Competitor | Model | Prices seen | Lead capture | Affiliate programme |
|---|---|---|---|---|
| denkvooruit.nl (NL government) | Public information | free | none | — |
| noodpakket.nu (NL shop) | Own-brand kits | €99.95 – €129.95 entry kits; larger kits unpriced on homepage | none | none found |
| ration1.de (DE shop) | Food, power, kits, B2B | €119 (5-day food) – €980 (rucksack) | newsletter, €10 voucher | **Awin, 15 %, 30-day cookie** |
| sichersatt.de (CH→DE) | Long-life food packages | €349 – €1,320 | newsletter | **in-house, 10 %, recurring per customer, 30 days** |
| liofilizado.es (ES storefront) | Kits + brands | €56.97 – €553.14 | newsletter, €5 off | none public |

What matters:

- Government sites and consumer bodies own the informational searches, and Consumentenbond and Kassa (Jan 2026) tell people **not** to buy expensive ready-made kits. "Build it yourself, for less" is the credible position, and it is the one Kit-72 already half-holds.
- Specialist shops pay 10–15 % with 30-day cookies. Amazon.de/.es pay 1–5 % with a 24-hour cookie. Amazon.nl pays 10 % on sports/outdoor, home improvement and grocery.
- Nobody offers an expiry reminder, a saved list or a quiz. Lead capture is the open gap.
- Demand is event-driven and real: Dutch booklet to 8.5 m households (Nov 2025) with more campaign moments in June and October 2026; 44 % of Dutch households say they have a kit, 42 % of booklet readers took no action (NOS, Apr 2026); Iberian blackout Apr 2025; Berlin outage Jan 2026.
- Not found: search volumes, competitor traffic, commission rates for bol.com (official page 404), Coolblue, Decathlon, NL kit shops.

## 4. Work log

- Fixed A4: converted all 2,494 classes to valid Tailwind v4 syntax.
- New design system "Safe condition" (v3): light theme, ISO-7010 safety green as brand, hi-vis yellow reserved for the primary action, Archivo + Public Sans self-hosted (removes the Google Fonts request, part of A7). Article typography written by hand (A5).
- Found that the global `a { color }` rule and every custom class were unlayered CSS, which beats Tailwind utilities; buttons had green text on green. Moved base rules into `@layer base` and the rest into `@layer components`.
- Affiliate engine: `src/lib/affiliate.ts`, `src/middleware.ts`, `src/scripts/outbound.ts`. Eight unit checks pass. Dropped a SicherSatt link format I could not verify.
- Email: `api/subscribe.js`, `api/confirm.js`, `api/_lib.js`, `api/_emails.js`. Checked the Resend contact and event endpoints against their docs. Test with a mocked provider passes (validation, honeypot, token tamper and expiry, property fallback, redirects).
- Consent: Analytics now loads only after an explicit yes. Expect reported traffic to drop; a cookieless tool such as Vercel Web Analytics would restore totals.
- Homepage rebuilt as one component for three locales, with a household calculator. DE uses 2 L per person per day (BBK), NL and ES 3 L. FAQ is now visible on the page as well as in the schema.
- Verified shop prices by fetching noodpakket.nu, ration1.de and liofilizado.es, then built the buy-or-build pages. The Red Cross page shows no price, so none is quoted.
- Added where-to-buy boxes to 14 NL/DE product pages. Removed hand-typed star ratings and prices from ES product cards (A11).
- A12: the ES blackout page dated the Iberian blackout 28 April 2024. Corrected to 2025, renamed the URL, added a permanent redirect.
- A13: 24 icon names used on pages were missing from the icon component and rendered as "?". The component now falls back to lucide at build time.
- Housekeeping: `llms.txt` URLs, sitemap `lastmod`, active nav state, language selector colours, two dead `.old` files removed, five old plan documents moved to `docs/archive/`.
- Incident: running the production build while the dev server was up swapped the dev server's cached React runtime and blanked every React island. Cleared `node_modules/.vite` and restarted; not a code issue. Do not build while `npm run dev` is running.
- Build: 104 pages. In the built HTML, 92 of 104 Amazon links are tagged (the 12 others are Amazon.nl, no ID yet); bol.com (39) and ration1 (8) links wait for IDs.

## 5. Not done, and why

- Named product recommendations: needs product research with verified prices; I did not want to invent picks.
- Translating the day 3 / 8 / 15 emails to DE and ES, and creating the Resend automations: the account is yours and needs a verified domain first.
- A margin product or bulk-sales page: a business decision, see GROWTH-PLAN.md section 5.
- Real-API test of the email endpoints and a production deploy.

## 6. Go-live (2026-11-17, later)

- The Vercel project had **no environment variables at all**, so the deployed build would not have tagged a single link (the Amazon.es tag only existed in the local `.env`). Set `PUBLIC_AMAZON_TAG_ES`, `PUBLIC_AMAZON_TAG_DE`, `SUBSCRIBE_SECRET`, `EMAIL_FROM`, `SITE_URL` for production, and the same for the `growth-overhaul` preview branch.
- Resend: the account holds 10 verified domains for other projects and is at its plan limit, so `kit-72.com` could not be added. Nothing belonging to other projects was changed. Created only a segment named "Kit-72". No API key was created.
- Because email cannot send yet, the signup form is now behind `PUBLIC_SIGNUP_ENABLED` (off). Contact properties renamed with a `kit72_` prefix, since properties are account-wide.
- DNS for kit-72.com is at Squarespace Domains; the root SPF is `v=spf1 -all` and there is no MX, so the Resend records still have to be added there once the domain exists in Resend.

## 7. Email live (2026-11-17, later still)

- A domain slot was freed in Resend. Added `kit-72.com`, created the five `kit72_` contact properties and a key named `kit-72-site`; stored the key and segment ID in Vercel.
- DNS at Squarespace Domains: added DKIM (`resend._domainkey`), MX and SPF on `send`. All three verified by Resend; the DKIM value in DNS matches byte for byte.
- **Side effect:** saving the MX record made Squarespace drop its "Email Security" preset (root SPF `-all`, DMARC `p=reject`, wildcard null DKIM). Website records were not affected. DMARC must be re-added by hand.
- Squarespace asks for a fresh Google login before DNS edits; the `rsend` CNAME is filled in but not saved because that prompt came back.
- Redeployed production with the keys, ran the full flow against the live site with Resend's test address (all steps passed), then set `PUBLIC_SIGNUP_ENABLED=true` and redeployed. The form is live on content pages.
- Privacy pages (NL, DE, ES) rewritten to describe the email signup, Resend as processor and consent-gated analytics; they previously said no personal data was stored. The NL and DE privacy pages no longer show the signup form.
- Gaps found, not fixed: the privacy pages give no contact address, and the German site has no Impressum.
- After the owner logged in to Squarespace again: `rsend` CNAME saved; root SPF and DMARC re-added as custom records with their previous values. Checked at the authoritative nameserver.

## 8. Email sequence (2026-11-17, evening)

- Found a conflict before building: the form promised "nothing else" besides the list and two reminders a year, while the planned sequence adds three tips. Changed the form, consent line, confirmation pages and privacy pages to say so, and kept the automations off until that text is live.
- One email design for everything (`api/_shell.js`), checked in a browser at desktop and phone width. Copy for five emails in NL, DE and ES in `emails/content.mjs`.
- Created 15 templates and six automations in Resend (two per language). Confirmed with a probe automation that a condition can read `contact.unsubscribed`; every send after the welcome checks it.
- The welcome email moved from the site to the automation, so it carries an unsubscribe link. `/api/confirm` now only creates the contact and fires the event, and shows the error page if the event is rejected.
- Tested the NL welcome automation with Resend's sink address: delivered, all variables filled, unsubscribe link present. Then disabled it again until this change is deployed.
- Resend's REST format for automations differs from the workflow format used here, so the automations were created through the MCP tool from `emails/out/automations.json`.
- Merged, deployed, then enabled all six automations. Ran the live signup in NL, DE and ES with the sink address: each got the redesigned confirmation and the right welcome email (27 L for three people in NL and ES, 18 L in DE).

## 9. Brand, company details, organic search (2026-11-17, afternoon)

- Search Console baseline recorded in docs/SEO.md. Key finding: the submitted sitemap is the non-www URL, last read in January, with 0 discovered pages; 35 of about 100 pages are indexed.
- Company details taken from invoicenavigator.eu at the owner's instruction (CCC Impact B.V.). Added colofon (NL), Impressum (DE), aviso legal (ES); privacy pages now name the controller. The contact address is the Invoice Navigator one until Kit-72 has its own inbox.
- Cookie pages were wrong: the German one said Google Analytics was not used. Rewritten for all three languages, with a button to change the analytics choice.
- New logo: a carry case with a handle carrying "72". `scripts/brand.mjs` generates favicon, app icons and share images from one drawing; the old share images were still the dark design.
- Root URL now redirects by language, then country; the fallback page is redesigned.
- SEO changes listed in docs/SEO.md. `scripts/seo_audit.py` reports no long titles, duplicate titles, orphan pages or unreturned hreflang links.
- Partner accounts: applied to ration1 on Awin (publisher 2996923), pending. Amazon: the login in Chrome has **no** PartnerNet account, so `kit72de-21` and `kit72es-21` may never have been real tags for this owner. Started a new amazon.de sign-up for CCC Impact B.V. with preferred ID `kit72de`; it stopped at Amazon's puzzle check, which the owner has to complete. bol.com: not started; needs the owner's login.
- Resend test leftovers removed (test contact, probe automation). Confirmation email delivered to the owner's real mailbox.

## 10. Explainer: can AI cause a power outage? (2026-11-17)

- The owner asked for AI as a blackout cause to be covered as a topical angle. Research (sub-agent, 101 fetches) found **no documented case** of AI or AI data-centre demand cutting power to households, so the page says that first and then covers what is real: demand growth on congested grids, data centres dropping off the grid at once (NERC 2024, PJM 2026), AI in cyber attacks, and AI used by grid operators.
- Pages: `/nl/gidsen/ai-stroomuitval/`, `/de/ratgeber/ki-stromausfall/`, `/es/guias/ia-apagon/`. Copy and 20 sources in `src/data/ai-grid.ts`; template `ExplainerPage.astro` turns `{id}` into numbered references and fails the build on an unknown source.
- Left out because not verified at the source: TenneT's supply-security figures (a correction was reported), the number of Spanish grid-access requests, and press reports of flickering lights. Official Dutch sources do not name data centres as a cause of grid congestion, and the page says so.
- Search check: in all three languages the direct question has no authoritative answer page; German results for "Blackout durch KI" are blogs and tabloid pieces.
- Linked from the guide hubs, the header, and the blackout and cyber scenario pages.

## 11. "Why we exist" block and handbook plan (2026-11-17)

- The owner wanted the line that every rich American has a shelter. Checked: the source is Reid Hoffman's estimate in The New Yorker (2017) that more than half of Silicon Valley billionaires have "apocalypse insurance", confirmed through Business Insider's report of it (the New Yorker page itself could not be fetched). The homepages now say that, with the source, instead of "every".
- Handbook plan in docs/HANDBOEK-PLAN.md (Dutch). Probed the data sources with a test address in Rotterdam: PDOK geocoding and AHN elevation work in under half a second; live OpenStreetMap queries took 34 s; the nearest OSM "hospitals" were eye clinics; EU-wide elevation was 8 m off; the LIWO flood-depth service did not respond. Public shelters do not exist in the Netherlands, so that part of the idea is dropped.

## 12. Handbook phase 0: proof for three addresses (2026-11-17)

- Built `handbook/`: `node handbook/build.mjs "<address>"` geocodes with PDOK, reads elevation (AHN), flood-risk zone (Rijkswaterstaat) and safety region (CBS), finds nearby points and hospitals in OpenStreetMap, routes with OSRM, draws its own map from OSM ways and prints a one-page A4 PDF with headless Chrome. Output and cache are gitignored because they contain addresses.
- Hand check on three addresses (a rural one near Apeldoorn, Rotterdam centre, Zutphen centre): address, water board, elevation, flood-risk zone, safety region, emergency broadcaster and outage number are right. **Emergency departments from OpenStreetMap were wrong in two of three**: Rotterdam lists a children's hospital first, Zutphen misses the hospital in town (not tagged as emergency in OSM; its emergency department is open 8:00 to 21:00 per a 2024 ministerial answer).
- Fixed with RIVM's open data (2026 questionnaire answers per hospital, no use restrictions; the owner approved the download): `handbook/scripts/seh_from_rivm.py` builds `handbook/data/seh-nl.json` with 79 locations placed on their own address through PDOK, 3 of them closed at night. The page prints the quickest department by road and, if that one closes at night, the quickest that is always open. Re-checked: Rotterdam now gives Erasmus MC and Franciscus Gasthuis, Zutphen gives Gelre Zutphen (closed at night) and Deventer.
- Things that broke on the way: all Overpass servers were down, so the code now uses the OSM map API plus Photon and Nominatim; AHN has no terrain value under buildings, so elevation is the median of a ring of points around the house; LIWO flood depth still unreachable.
- Details and the check table are at the end of docs/HANDBOEK-PLAN.md.

## 13. Handbook page 2: "Het eerste uur" (2026-11-17)

- The owner asked for concrete first steps and tricks ("fill your bath right away") with good infographics. Added a second page: power outage (dark panel with a bath drawing and the household's bottles of drinking water, fridge and freezer bars), no tap water, a flood card or a "close windows and doors" card depending on the address, and a tick list for leaving.
- A sub-agent checked 20 candidate claims against official Dutch sources (128 fetches). Sources per step are in `handbook/data/first-hour-sources.json`. Dropped for lack of a source: leave one lamp on, text instead of calling, drinking from the boiler or cistern. "Fill the bath" is not official advice for outages; it is kept with the reason that is official (pressure can drop, booster pumps in flats stop). The US 15/30/60 cm flood figures contradict the Dutch ones, so only the Dutch ones are printed.
- `.page` now uses min-height so an over-full page spills onto a third sheet and the build warns; a fixed height hid overflow before.

## 14. Handbook pages 3 and 4: tricks and the household plan (2026-11-17)

- The owner pushed back on official-only advice: the tricks the government does not mention are the point. Kept page 2 official and added page 3 "Slimme trucs", labelled as not official, and page 4 with a "do not do this" list, write-in fields and a half-yearly checklist.
- A sub-agent collected and vetted 46 tricks (88 fetches). The filter was two questions: does it work, and can it hurt someone following it as written. Changed by the vetting: the coin-on-ice trick only proves a thaw when the coin has sunk; hay-box cooking got a re-boil rule. Left out: fridge food on the balcony, blankets on the freezer, draining a storage boiler, cistern water, bleach dosing. `handbook/data/hacks-nl.json` records per trick what the check rests on and what was left out.
- Layout: CSS columns did not balance in print and pushed the footer onto an extra sheet, so the three trick columns are now dealt out in code. The build expects exactly four sheets.

## 15. Monetisation rethink and Awin (2026-11-17)

- The owner rejected selling the handbook, B2B to estate agents and a kit subscription. Direction now: free handbook for an email address, revenue from partners. Selling raw personal data was advised against.
- A sub-agent checked Dutch pay-per-lead and pay-per-sale programmes (107 fetches). Nearly all pay on a tracked click-out, not on a lead submitted from our form; Slimster is the exception. Public payouts range from EUR 3 to 90. Two facts that change the offers: flooding from primary defences is uninsurable for nearly all households, and most home batteries do not work in an outage.
- Awin: the owner logged in; two publisher accounts exist (2996923 and 3091503), both set up for tapwater.uk. Added https://www.kit-72.com as a promotional space on 2996923 (sectors Home & Garden, Electronic Accessories); nothing else changed. The ration1.de application is still pending. Insurers on Awin hide commission rates until a publisher is accepted.
- Details in docs/HANDBOEK-PLAN.md under "Verdienmodel".

