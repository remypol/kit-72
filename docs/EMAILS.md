# Email lifecycle

The site sends two emails itself (`api/_emails.js`): the confirmation and the welcome with the household's numbers. Everything below is a Resend automation triggered by the event `kit72.subscribed`, which `/api/confirm` fires once the address is confirmed.

## Setup in Resend

Status 2026-11-17: **live.** `kit-72.com` is added to the existing Resend account (region eu-west-1) and sending works; the signup form is on (`PUBLIC_SIGNUP_ENABLED=true`). Tested on production with Resend's test address: confirmation email, confirm link, contact stored in the "Kit-72" segment with `kit72_` properties, welcome email, redirect.

DNS at Squarespace Domains now holds: DKIM on `resend._domainkey`, MX and SPF on `send`, CNAME `rsend`, plus the restored root SPF (`v=spf1 -all`) and DMARC (`v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s`). Adding the MX record had made Squarespace remove its "Email Security" preset; SPF and DMARC were put back as custom records with the same values. The empty wildcard DKIM record from that preset was not re-added.

Still open:

- DMARC alignment is expected to pass (Resend signs with `d=kit-72.com`), but it has only been tested against Resend's sink address, not a real mailbox. Sign up once with a real address to confirm the mail arrives.
- The account is shared with other projects. Contacts and unsubscribe status are account-wide, and the `kit-72-site` key has full access because the endpoints need to create contacts. A separate Resend account would isolate this.
- The three automations below are not created; only the two emails the site sends itself are live.
- One test contact (`delivered@resend.dev`) is in the segment and can be deleted.

1. Verify the sending domain and create an API key.
2. Create contact properties (all text): `kit72_locale`, `kit72_household_size`, `kit72_has_children`, `kit72_has_pets`, `kit72_signup_source`. They are prefixed because properties are account-wide. Without them the endpoint still saves the contact, just without the properties.
3. Optional: create a segment and set `RESEND_SEGMENT_ID`.
4. Set `PUBLIC_SIGNUP_ENABLED=true` in Vercel and redeploy; the form is hidden until then.
5. Create one automation per language, trigger `kit72.subscribed`, condition `payload.locale`, with the steps below.

Event payload: `locale`, `household_size`, `water_litres`, `source`.

## Sequence

| Step | When | Purpose | Main link |
|---|---|---|---|
| 0 | at signup | Confirm address (sent by the site) | confirm link |
| 1 | on confirm | The list and the three numbers (sent by the site) | kit builder |
| 2 | day 3 | Water: the one thing nearly everyone is short of | water storage page |
| 3 | day 8 | Light and power: what a blackout takes away first | flashlight and power bank pages |
| 4 | day 15 | Buy or build, with prices | buy-or-build page |
| 5 | month 6, then every 6 months | Check dates on water, food, batteries | kit builder |
| on event | within hours of a large outage, flood warning or official alert | What to do today | scenario page |

Rules: one subject per email, one link that matters, no email without a practical instruction. Affiliate links only on the site, not in the email, so every email stays useful if nobody buys.

## Drafts (Dutch; translate for DE and ES before enabling those automations)

### Step 2, day 3
**Onderwerp:** Water: waar de meeste noodpakketten op stranden

Voor jouw huishouden is dat {{water_litres}} liter. Dat klinkt veel, maar het zijn een paar kratten flessen of twee jerrycans.

Drie dingen om te weten:

1. Ongeopend flessenwater blijft goed tot de datum op de fles. Kraanwater in een schone jerrycan ververs je elk half jaar.
2. Zet het koel en donker neer, niet in de schuur naast de benzine.
3. Reken per huisdier een liter extra.

Op de site staat welke jerrycans geschikt zijn voor drinkwater en welke niet.

[Lees: water opslaan]

### Step 3, day 8
**Onderwerp:** Als het licht uitvalt

Bij een stroomstoring mis je eerst licht, daarna je telefoon. Twee dingen lossen dat op: een zaklamp per persoon en een powerbank die je vol houdt.

Leg de zaklamp op een vaste plek die iedereen kent. Laad de powerbank elke drie maanden bij; een lege powerbank is de meest voorkomende verrassing.

[Lees: welke zaklamp en welke powerbank]

### Step 4, day 15
**Onderwerp:** Kopen of zelf samenstellen: de prijzen

Kant-en-klare noodpakketten beginnen rond € 100. Wat er nooit in zit: genoeg water, je medicijnen en je papieren.

We hebben de prijzen naast elkaar gezet en opgeschreven wanneer kopen logisch is en wanneer niet.

[Bekijk de vergelijking]

### Step 5, every 6 months
**Onderwerp:** Vijf minuten: controleer je noodpakket

Het is een half jaar geleden. Loop deze vier na:

1. Water: datum op de flessen, jerrycans verversen
2. Eten: wat binnen een half jaar verloopt, eet je op en vervang je
3. Batterijen en powerbank: opladen of vervangen
4. Medicijnen en documenten: klopt het nog met je huishouden?

[Open mijn lijst]

### On event
**Onderwerp:** [Wat er aan de hand is], en wat je vandaag doet

Twee zinnen over wat er speelt, met de officiële bron. Dan drie stappen voor vandaag. Dan de link naar de bijbehorende scenario-pagina. Geen verkoop.
