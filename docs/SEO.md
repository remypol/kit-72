# Organic search: baseline and what changed

Baseline taken from Google Search Console on 2026-11-17 (last 3 months, web search).

## Baseline

| | |
|---|---|
| Clicks | 164 |
| Impressions | 9,470 |
| Average CTR | 1.7 % |
| Average position | 21.1 |
| Pages Google has indexed | 35 (13 known but not indexed) |
| Indexable pages on the site | about 100 |
| Queries with at least one impression | 321 |

Three things stand out.

1. **Google has never read the sitemap.** The only submitted sitemap is `https://kit-72.com/sitemap-index.xml` (without `www`), last read on 4 January 2026, with 0 discovered pages. The apex domain redirects to `www`, so that URL is a redirect. Roughly half the site is unknown to Google.
2. **Almost all clicks are brand searches** ("kit72", "kit 72", "72h kit"). Non-brand queries get impressions but sit too low to be clicked.
3. **The Dutch market is invisible.** Core Dutch queries rank between position 55 and 90 ("noodpakket" 73.6, "noodpakket 72 uur" 65.1, "noodpakket samenstellen" 60.4). The Dutch pillar page had about 100 words and no impressions at all.

### Where the impressions are

| Page | Impressions | Position | CTR | What people search |
|---|---|---|---|---|
| /es/guias/almacenamiento-agua/ | 1,982 | 17.5 | 0.8 % | almacenamiento de agua, guardar agua embotellada |
| /de/notfallpaket-72-stunden/ | 1,351 | 18.0 | 0.7 % | was gehört in ein überlebenspaket (364), überlebenspaket inhalt (329, pos. 13) |
| /es/herramientas/calculadora-energia/ | 1,111 | 7.9 | 0.8 % | 20000 mah cuanto dura, cuantas cargas son 20000 mah |
| /es/kit-72-horas/ | 644 | 13.2 | 2.2 % | mochila 72 horas, mochila 72 horas cruz roja (pos. 7.7) |
| /de/szenarien/evakuierung/ | 620 | 44.3 | 1.6 % | evakuierung was mitnehmen (pos. 12.7), liste evakuierung (pos. 10.2) |
| /de/szenarien/cyberangriff/ | 528 | 53.0 | 0.6 % | cyber notfall, it ausfall (mostly business intent) |
| /nl/noodpakket-72-uur/ | 356 | 55.9 | 0 % | noodpakket 72 uur |
| /de/ratgeber/wasser-lagerung/ | 334 | 22.1 | 0.3 % | wasserlagerung (182, pos. 14.1) |
| /de/tools/energie-rechner/ | 287 | 7.6 | 0.3 % | powerbank rechner, wieviel mah powerbank |
| /nl/denk-vooruit/ | 236 | 58.5 | 0 % | denk vooruit noodpakket, noodpakket overheid |

## What changed (branch `seo-brand`)

**Site-wide**
- hreflang links are now always returned. Eleven pages declared a translation that did not link back, because a page-level setting replaced the central map.
- Titles: 50 were longer than 60 characters. The " | Kit-72" suffix is now added only when the title still fits; the rest were shortened by hand. None is over 60 now.
- Stale years ("2025") removed from titles; "next review: March 2026" lines removed.
- Three pages nothing linked to (`/nl/denk-vooruit/`, `/de/bbk-notfallvorsorge/`, and the buy-or-build pages with one link) are now in the header and footer navigation.
- Organization schema carries the legal entity and address; logo points at a real PNG.
- `scripts/seo_audit.py` checks all of this on every build.

**Pages matched to what people search**
- DE 72-hour page: title and a new opening section answer "Was gehört in ein Überlebenspaket?" directly.
- DE and NL water guides: expanded from under 300 words; new sections on quantity per household and how long tap water keeps; FAQ schema. The German page said 9 litres per person for 72 hours while the BBK figure is 6; corrected.
- ES water guide: title rewritten; new section on how long stored bottled water lasts.
- ES 72-hour page: retitled "Mochila de 72 horas"; new opening list and a section on what the Red Cross recommends (no single official list exists, and the page says so).
- Power calculators (ES, DE, NL): retitled to the question people type; new table of how many phone charges 5,000 to 30,000 mAh really give, with the assumptions stated.
- NL pillar `/nl/noodpakket-samenstellen/`: rebuilt from about 100 to about 900 words: the list, amounts per household, four steps, a shopping list, FAQ.
- NL Denk Vooruit and DE BBK pages: these were labelled "official". They now say plainly that Kit-72 is not a government site and link to the official source. A quotation attributed to the government, which was not a real quotation, is rewritten as a description.

**Root URL**
- `/` now redirects to `/nl/`, `/de/` or `/es/` by the browser's first language, then by country (rules in `vercel.json`). Search engines send no language header and still get the language page, which stays the x-default. `/?choose` always shows it.

## To do after deploying

1. In Search Console, submit `https://www.kit-72.com/sitemap-index.xml` and remove the old non-www entry.
2. Change the `kit-72.com` → `www.kit-72.com` redirect in Vercel from 307 to 308.
3. Re-check this table in four to six weeks. The pages to watch are the ones in the table above.

## Not done

- No new backlinks. Authority is the main reason Dutch pages rank at 55 to 90; content changes alone will not fix that. Candidates: municipalities and safety regions that link to practical checklists, local press around campaign moments.
- Hub pages (`/nl/gidsen/`, `/nl/tools/`, `/de/ratgeber/`) are still thin lists.
- The cyber-attack pages get impressions for business queries ("IT-Ausfall") that the page does not serve. Left alone.

## Municipality pages and the free handbook (17 November 2026)

- New: `/nl/noodhandboek/` (free personal handbook) and `/nl/noodplan/` with a page for each of the 342 municipalities. Target queries: "rampenzender <plaats>", "noodplan <gemeente>", "spoedeisende hulp <plaats>", "overstromingsrisico <gemeente>", "veiligheidsregio <gemeente>".
- Each municipality page has its own numbers (broadcaster frequencies, distances to emergency departments, flood-risk share and ground level from a 16-point sample), so the pages are not copies of each other.
- Internal links: header, footer and Dutch homepage link to the handbook; the hub links to every municipality; each municipality links to six neighbours.
- The page a personal link opens on (`/nl/noodhandboek/mijn/`) is noindex and left out of the sitemap.
- To watch in four to six weeks: how many of the 343 URLs are indexed, and which municipality queries get impressions.


## Emergency broadcaster pages (17 November 2026)

- New: `/nl/rampenzender/` and a page for each of the thirteen regional broadcasters. Target queries: "rampenzender", "rampenzender frequentie", "rampenzender <provincie>", "<zender> frequentie".
- Every municipality page links to its broadcaster; each broadcaster page links to all its municipalities and to the twelve other broadcasters; footer, Denk Vooruit page, energy guide, radio product page and the municipality hub link to the overview.
- Every Dutch content page now carries a band for the free handbook (the lead magnet), so existing traffic reaches it.
- Sitemap: 452 URLs.
