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
- Applied from Awin account 2996923, with kit-72.com as the promotional space, to Univé NL, EcoFlow NL, ALLPOWERS NL and Overstappen NL; all four show "Pending Approval". The first two messages mention the site's visitor count; the owner asked for a sales pitch without it, so the last two and the promotional-space description leave it out. No figures were invented.

## 16. Free handbook live flow and municipality pages (2026-11-17)

- The owner's instruction: carry on until everything is finished, include SEO, create pages and submit them in Search Console.
- Free handbook: `/nl/noodhandboek/` (form), `api/handbook-request.js` (exact address check at PDOK, emails a personal link), `/nl/noodhandboek/mijn/` (opens the link), `api/handbook.js` (collects the facts and returns the four pages as HTML with a print button). The address is not stored; it is encrypted in the URL fragment of the link. The email address joins the Resend list only when the optional box is ticked.
- Local test of both functions with Resend stubbed: 17 checks pass. On the Vercel preview (reached with `vercel curl`, preview-only test secret): address validation works and a full handbook comes back in 8.8 s. The preview has no Resend key (the production key is marked sensitive and cannot be copied), so sending the email was tested after going live instead.
- Nationwide: all 25 safety regions with broadcaster, FM transmitters and DAB block (Denk Vooruit); each region's website opened and checked. Hospital place names tidied ("Hoorn Nh" and similar).
- `handbook/scripts/gemeenten.mjs` builds `src/data/gemeenten-nl.json` for 342 municipalities. Things that went wrong on the way: the first run did its sampling one request at a time and took over 15 minutes; eleven municipalities got no safety region because the middle of the place lies in water (Lelystad, Urk, Hoorn and others) or in a Belgian enclave (Baarle-Nassau). Fixed by anchoring on the nearest address inside the municipality and by choosing the largest place where no place carries the municipality's name.
- SEO pages: `/nl/noodplan/` and one page per municipality (343 URLs), each with the form, four questions as FAQ structured data and links to six neighbours. Sitemap now has 438 URLs. `scripts/seo_audit.py`: no long titles, no duplicate titles, no orphan pages, no hreflang problems.
- Still a pilot: map, nearby points and routes come from public OpenStreetMap services meant for light use.


## 17. Preview on the handbook page (2026-11-17)

- The owner approved going live and asked for a preview that shows the handbook is personal.
- `src/components/growth/HandbookPreview.astro`: page 1 for three town halls (Rotterdam, Almere, Vaals) with different households; a visitor switches between them and sees the five personal items change. The figures and images come from `handbook/scripts/samples.mjs` (needs Chrome and pdftoppm); only public buildings belong in that list. Municipality pages show a small page 1 next to the form.
- Found while doing this: the sample image for page 1 was a wrong crop (parts of pages 2 and 3). The script now cuts the images from the pdf.
- Fixed in the handbook: an address below sea level printed "-3,5 m onder NAP" (now "3,5 m onder NAP"), and a street that starts with a lower-case letter is capitalised in the heading.

## 18. Live (2026-11-17)

- PR 7 merged after the owner's approval; production serves `/nl/noodhandboek/`, `/nl/noodplan/` and the 342 municipality pages. Sitemap: 438 URLs.
- Live test of the whole flow: request for Coolsingel 40 with Resend's test inbox (`delivered@resend.dev`) returned 200 in 0.9 s, the email was delivered, and the link's token produced the four-page handbook in 7.2 s. No contact was created (the tips box was off).
- Search Console (domain property): sitemap index resubmitted; indexing requested for `/nl/noodhandboek/`, `/nl/noodplan/` and the pages of Amsterdam, Rotterdam, Den Haag and Utrecht. The other municipality pages have to come in through the sitemap and internal links.

## 19. Second round after going live (2026-11-17)

- The owner's instruction: take the lead and deliver everything that does not need him.
- Production test with the tips box ticked: contact created with source "handbook", first welcome email delivered; the test contact was removed afterwards.
- `src/components/growth/HandbookBand.astro`: every Dutch content page now ends with an offer for the free handbook, above the newsletter band.
- New pages: `/nl/rampenzender/` (lookup by municipality, all thirteen broadcasters) and one page per broadcaster (13) with FM frequencies per transmitter, DAB+ block, safety regions and every municipality. Facts re-read from Denk Vooruit on this date. Municipality pages link to their broadcaster's page.
- Corrected on existing pages: the energy guide gave "NPO Radio 1: 91.8 MHz (landelijk)" and said AM has a longer range; the radio product page gave one FM frequency for the whole country. Both now point to the regional emergency broadcaster, as the government page does.
- Sample images are WebP (about 40 % of the JPEG size); share image `public/images/og-noodhandboek.jpg` (1200 x 630) for the handbook, municipality and broadcaster pages. Both come from `handbook/scripts/samples.mjs`.

## 20. Third round: address check, audit fixes, photo script (2026-11-17)

- The owner asked whether SEO and GEO are top notch, for strong extra pages, and for all photos to be replaced with generated ones in the house style (OpenAI image API).
- New: `api/address-check.js` (ground level, flood-risk zone, broadcaster for one address; nothing stored), `/nl/hoogte-nap/` and `/nl/overstromingsrisico/` with the instant check. The handbook form takes over a checked address from sessionStorage.
- A read-only audit by a subagent produced 25 findings. Fixed in this round: Article/Organization JSON-LD joined by @id with an image; the SearchAction for a search that does not exist and the Speakable block removed; breadcrumb markup includes the current page; x-default only on the three homepages; `og:type` article; nested `<main>` on 18 scenario pages; Spanish labels in the Dutch and German checklists; "coming soon" cards for pages that do not exist; `robots.txt` no longer blocks `/_astro/`; `llms.txt` rewritten; sitemap `lastmod` where a real check date exists; seven weak titles.
- Factual corrections, each checked against the source on this date: NL-Alert needs no sign-up and its test message comes on the first Monday of June and December (Denk Vooruit); KNMI's heatwave definition; drinking advice in heat without an invented litre figure (Denk Vooruit); flood depths and fridge/freezer times aligned with the handbook's sourced figures; "evacuate into the wind" and "trust your instinct, evacuate" replaced by the official line (inside, windows and doors shut, unless told to leave); the invented "95 % of emergencies" statistic and other unsourced claims on the 72-hour page removed; the "official checklist" on the Denk Vooruit page matched to the government's list; radio advice is FM and/or DAB+ everywhere.
- Not done from the audit: visible date and sources on guides and product pages, schema types for scenario and tool pages, thin hub pages, answer-first openings, deep links in source lists, remaining language hygiene, the editorial-policy page. Proposed new pages (NL-Alert, siren, cash at home, making a household plan, and others) are not written yet.
- Photos: `scripts/gen_images.py` defines fourteen images in one style (studio still life on the brand green, signal yellow as the only accent, no people, brands or staged disaster scenes). Not run: the OpenAI key sits outside the AngelGuard folder and reading it was refused without the owner's explicit approval.

## 21. Photos replaced (2026-11-18)

- The owner approved use of the OpenAI key for this ("Ja, gebruik die"). `scripts/gen_images.py` ran with model `gpt-image-2`, 1536 x 1024, quality high: fourteen images plus two re-runs (the first kit image showed dollar notes, the first evacuation image a US plug; both prompts now say euro notes and a European plug). Sixteen API calls in total.
- All ten stock photos in `public/images/shared/` are gone (some showed brand names). The fourteen new ones are 1200 x 800 WebP, 640 kB together. Raw PNGs stay in `.image-raw/` (not committed).
- Scenario pages that shared one photo now have their own: cyber attack and water outage no longer reuse the power-cut and water-storage pictures; emergency food and grab bags have their own image too.
- Alt texts describe what is in the picture, in the page's language (37 places).
- Added the matching image to pages that had none: four Dutch and four German guides, seven Spanish component pages.
- `HeroImage.astro`: 3:2 instead of 1200:630 so nothing is cropped, capped at 56rem wide, and no longer bleeds out of the column on phones (that caused 4 px of sideways scroll on scenario pages).
- The three editorial-policy pages say the pictures are AI-made illustrations and show no existing products, brands or events.
- Still to log from round two: the apex domain now redirects with 308 instead of 307, and indexing was requested in Search Console for the broadcaster hub and three broadcaster pages (NH Radio confirmed; Brabant and Gelderland not seen confirmed).

## 22. Third round live (2026-11-18)

- PR 9 merged after the owner's "Ja, merge" (merge commit `a803b79`). Production checked: `/nl/hoogte-nap/`, `/nl/overstromingsrisico/`, the corrected scenario pages, the new images (old file names give 404), `robots.txt` without the `/_astro/` block, the new `llms.txt`, sitemap with 454 URLs.
- Address check live: API answers for Almere town hall in 2.4 s (3.5 m below NAP, type B, Omroep Flevoland), 404 for an unknown address, 400 for a malformed one. In the browser the check for Rotterdam town hall shows the three facts and the handbook form opens pre-filled.
- Search Console: sitemap index resubmitted; indexing requested for `/nl/hoogte-nap/` and `/nl/overstromingsrisico/` (both confirmed).

## 23. Fourth round: ten sourced pages and the rest of the audit (2026-11-18)

- The owner said to continue with the ten proposed pages and the remaining audit findings.
- New pages, all built on `ExplainerPage.astro` (short answer, sections, steps, FAQ, numbered source list, check date) with content in `src/data/explainers/`: `/nl/nl-alert/`, `/nl/sirene/`, `/nl/noodplan-maken/`, `/nl/noodpakket-checklist/`, `/nl/noodpakket-baby/`, `/nl/gidsen/contant-geld/`, `/nl/gidsen/koken-zonder-stroom/`, `/nl/gidsen/noodtoilet/`, `/nl/gidsen/zonnepanelen-thuisbatterij-stroomuitval/`, `/nl/scenario/extreme-kou/`. About 1,000 words each. `ExplainerPage` gained an optional image, numbered steps, tables, related links and a link to the editorial policy.
- Research: three subagents collected facts with source URLs on this date. Statements that carry safety advice were then re-read by the main session at the source: Denk Vooruit (kit list, FAQ on gas burners, toilet, drinking water, power cut, extreme weather), Voedingscentrum (fridge and freezer), Brandweer (barbecue, carbon monoxide), NVWA (gas appliances), Rode Kruis (hypothermia, power cut), RIVM (hand washing), KNMI (cold codes, cold wave), Vitens, Dunea, PWN, Liander, Stedin, Enexis, Milieu Centraal, Consumentenbond, Netbeheer Nederland, Nibud, Rijksoverheid (cash at home), Waterschap Zuiderzeeland (folder read as text).
- Not re-read by the main session, taken from the subagents' reading: the DNB pages and the MOB advice PDF (dnb.nl refuses automated requests), the two Kamerbrieven on the sirens, the NL-Alert reach report, the Apple and Google help pages, the Red Cross plan PDF, the RIVM 2009 guideline, Dunea's and WMD's frost pages, the RVO installer guide.
- Left out because no official source was found: quantities for nappies and kit items other than water and cash; advice on breastfeeding and on warming bottles in an emergency; absorbent material in a bucket toilet and disposal of the bags; where to put a generator; the share and price of home batteries with a backup function; what to do when stuck in a car in snow. The pages say so where it matters.
- Where sources differ, the page shows it: one meeting place (government form) or two (Red Cross); Waternet asks not to flush during planned work while Dunea suggests a bucket; water companies name 10 to 15 degrees as the minimum thermostat setting.
- Audit findings closed: scenario pages are Article and tools WebApplication in JSON-LD (27 files in three languages; the range strings in `estimatedCost` are gone); guides and product pages show a date and editors line (`Byline.astro`) and the shop box sits below the opening paragraph; both calculators open with the short answer; the guides and tools hubs have fuller descriptions and ItemList markup; scenario headings match their titles; 54 headings in sentence case; emoji out of headings; missing diacritics; English phrases; brand lists carried over from other markets; alt texts no longer end in "| Kit-72"; twelve dead or homepage-only source links replaced by live deep links (crisis.nl now redirects to nederlandveilig.nl); unsourced claims removed (calorie figures, "hard cheese keeps for months", "backup power 2 to 8 hours", "above-average fires from candles", "without water you survive three days"); related-page blocks on six scenario pages, two kit pages and four guides; the editorial policy rewritten (who publishes, sources, checking, corrections, AI use, images, affiliate links).
- Not done: the Spanish guides have no image; German and Spanish content has not been audited for facts; the Dutch privacy and affiliate pages are still thin; four new pages (NL-Alert, siren, household plan, baby) have no image because none of the fourteen fits.
- Checks: build 481 pages; SEO audit 0 long titles, 0 duplicates, 0 orphans, 0 hreflang problems, 6 description warnings (all on older legal pages); JSON-LD parses on every page; sitemap 464 URLs, 369 with lastmod; no internal link without a target on Dutch pages; handbook test 17 of 17.

## 24. Fourth round live (2026-11-18)

- PR 10 merged after the owner's "Ja, merge" (merge commit `963b205`). Production checked: the ten new pages, both hubs, the editorial policy and a scenario page in each language return 200; the siren page carries the test duration; the water calculator is `WebApplication` in JSON-LD; sitemap 464 URLs including the new pages; `llms.txt` lists the explainers; the address check still answers.
- Search Console: sitemap index resubmitted (confirmed). The request to index `/nl/nl-alert/` was refused with "Quotum overschreden": the daily limit for indexing requests was used up. None of the ten new pages has been requested yet; they are in the sitemap and linked from the hubs, the footer and the scenario pages. To do on a later day, in this order: nl-alert, sirene, noodpakket-checklist, contant-geld, noodplan-maken, koken-zonder-stroom, zonnepanelen-thuisbatterij-stroomuitval, extreme-kou, noodtoilet, noodpakket-baby.
- Open questions to the owner: whether the OpenAI key may be used again for four more images (NL-Alert, siren, household plan, baby), and whether the wording on AI use in the editorial policy is as he wants it.

## 25. Images for the four pages without one (2026-11-18)

- The owner approved a second use of the OpenAI key for this ("Ja, gebruik die"). Four more images from `scripts/gen_images.py`, same style, four API calls, none redone: `nl-alert` (phone with a plain yellow screen, power bank, radio), `siren` (scale model of a warning siren, radio, key), `emergency-plan` (clipboard with an empty form, pencil, keys, map, whistle), `baby-kit` (bottle, formula tin, water, flask, nappies, cloths, hat). No text, brands or people in any of them.
- Placed on `/nl/nl-alert/`, `/nl/sirene/`, `/nl/noodplan-maken/` and `/nl/noodpakket-baby/`; each is also the page's share image. Eighteen images in `public/images/shared/`, 788 kB together.
- Checks: build 481 pages, SEO audit unchanged, the four pages viewed on desktop and phone width.

## 26. Fact audit of the German and Spanish pages (2026-11-18)

- The owner asked for the German and Spanish pages to be checked on facts, as was done for Dutch. Three read-only subagents compared every claim with the authority that owns it and tested the outbound links: about 115 findings. The main session then re-read the safety statements at the source before editing.
- Germany. The BBK replaced its guide on 13 October 2025 ("Vorsorgen für Krisen und Katastrophen"): the goal is ten days of self-sufficiency, three days as a minimum; no cash amount, no calorie figure, no weight limit, no AM radio. Corrected accordingly on every page. Also corrected: "evacuate against the wind" (BBK: go indoors, close windows, ventilation off; outdoors move across the wind to the nearest building); "when in doubt, evacuate" and "evacuate only when ordered" (follow warnings and instructions; bring children to safety in time); gas stoves "outdoors or well ventilated" (outdoors only); a 6-metre rule for generators (not a German figure); fridge and freezer hours (no German authority gives hours; BfR wording used); boiling water for 3 minutes (UBA: bring to the boil once, let cool for at least 10 minutes); "replace tap water in jerrycans every 6 months" (BLE: no reliable shelf life; store bought water); 5 to 6 and 3 to 4 litres of drinking in heat (BIÖG: about two to three); heat warning "from 32 °C" (DWD: felt temperature); "NINA warns automatically" (places must be subscribed); Deutschlandfunk as "official channel" with one frequency; AM advice; "112 is specially protected"; "do not change passwords during an attack" (BSI says the opposite); invented flood warning levels (the states' portal has four classes, thresholds per state); "30 cm of water carries a car away"; Ahr valley death toll (135 of more than 180); 7 days of medication (BBK: at least ten); suture material; "three days without water" (BBK: four days without fluid); 9 litres per person (6 for three days); 1,500 to 2,000 kcal (BLE tables use 2,200); cash amounts attributed to the BBK; "72 hours is the international standard" with a list of organisations; the 95 % statistic; "Vorsorge ist Bürgerpflicht"; power banks "over 27,000 mAh banned on planes" (LBA: 100 Wh, up to 160 Wh with approval); a Dutch word left in a German page; brand lists from other markets. Added, from the BBK: the siren signals and the Warntag (second Thursday of September; next on 9 September 2027). The scenario hub listed flood and cyber as "planned" although both pages exist.
- Spain. State Protección Civil publishes no kit list and no litre figure, so the "3 litres recommended by Protección Civil" is now labelled as Kit-72's own calculation, next to the 1.5 litres of Protecció Civil de Catalunya; the 72 hours are attributed to the European Commission and to Cruz Roja's "water for 3 days". Corrected: chemical leak "evacuate against the wind" (Protección Civil: stay inside, close doors, windows and blinds, ventilation off); "if in doubt, evacuate"; camping stove "outdoors or very well ventilated"; "do not change passwords" (INCIBE says change them and call 017); flood depths of 15, 30 and 60 cm (Protección Civil: leave the car when it is stuck, when water passes the wheel axles or reaches the knee, or when the level rises); invented alert levels (AEMET's definitions); "activate alerts on your phone" (ES-Alert needs no action); cans touched by flood water (Sanidad: sealed, undamaged cans can be cleaned and used); drinking 3 to 4 and 5 to 6 litres (Sanidad gives no figure, WHO 2 to 3); fans "above 35 °C" (WHO: 40); AEMET heat warnings "after three days"; fridge 4 to 6 hours (AESAN: under 4 hours; freezer at least 24 to 48); "smell and taste" as a test for water and for food past its date (AESAN: never taste); boiling 3 minutes (Sanidad: at least one); expired medicines "probably still work" (leaflets: do not use); Silvederma and 600 mg ibuprofen listed as over the counter (prescription only in the AEMPS register); EpiPen (not sold in Spain; Altellus, Jext, Anapen); tourniquet from a triangular bandage; PMR446 "channel 9 is the emergency channel" and "8 channels" (16, none reserved); AM radio; landline "works without power" (copper network closed in May 2025); generator "6 metres" and "deaths every year"; a power bank sum that was half of what the same box calculated; calorie tables that were too low (EFSA reference values); shelf lives in years; body-weight percentages for backpacks; cash 50 to 200 euro in four variants (Banco de España: 70 to 100 per family member); 061 and 080 shown as national numbers.
- The page on the blackout of 28 April 2025 was out of date and wrong: it said the cause was still under investigation, put the collapse at 12:36, and gave a duration of 5 to 6 hours. Rewritten from the Government's Comité de Análisis report: oscillations at 12:03 and 12:19, zero voltage at 12:33:30, first load at 13:07, about half of demand back at 22:30, 99.95 % at 07:00 the next day; multifactorial overvoltage, no evidence of a cyberattack. The cyber page dated the blackout in 2024.
- Also fixed in Dutch: the water outage page had the same unsourced per-use water table as the other two languages.
- Read by the main session at the source: BBK guide and power-cut flyer (PDF text), BBK pages on hazardous substances, NINA, heat, flood, supplies and Warntag, UBA boil-water annex, BfR, BLE, BIÖG, DWD, LBA, the states' flood portal; Protección Civil infographics on chemical accidents and cars in floods (images), ES-Alert page, AESAN (blackout, dates), Sanidad (water treatment, heat plan), INCIBE, Banco de España, Cruz Roja (evacuation, first-aid kit, checklist), the Government blackout report, La Moncloa, CNMC, BOE (PMR446), WHO heat fact sheet, FGD, Protecció Civil de Catalunya.
- Taken from the subagents' reading, not re-read: the AEMPS medicine register queries, the EFSA reference values, the AEMET level definitions and thresholds, the IATA battery guidance, the BSI pages and reports, the bpb page on the 2021 flood, the EU staff working document on 72 hours (two subagents read it independently).
- Left as they are because no authority owns them and nothing official contradicts them: product specifications, prices and ratings, battery shelf lives, pet water amounts, toilet flush volumes, kcal per 100 g tables.
- Checks: build 481 pages; SEO audit 0 long titles, 0 duplicates, 0 orphans, 0 hreflang problems, 6 description warnings on legal pages; JSON-LD parses everywhere; every outbound link on the 50 changed files returns 200; no internal link without a target on German and Spanish pages; handbook test 17 of 17. Dates on the changed pages set to November 2026.
