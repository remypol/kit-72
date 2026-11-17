# Email lifecycle

Status 2026-11-17: signup is live. The sequence below exists in Resend; see "Switching on" for what is enabled.

## What is sent, and by what

| # | Email | When | Sent by |
|---|---|---|---|
| 0 | Confirm your address | at signup | the site (`api/subscribe.js`, copy in `api/_emails.js`) |
| 1 | Welcome: your household's numbers | on confirmation | Resend automation "welcome + reminders" |
| 2 | Tip: water | day 3 | Resend automation "tips" |
| 3 | Tip: light and power | day 8 | Resend automation "tips" |
| 4 | Tip: buy or build, with prices | day 15 | Resend automation "tips" |
| 5 | Reminder: check dates | day 180, 360, 540, 720 | Resend automation "welcome + reminders" |

`/api/confirm` creates the contact and fires the event `kit72.subscribed`. Everything after the confirmation email is triggered by that event, so every email a subscriber gets after confirming carries Resend's unsubscribe link.

Rules: one subject per email, one button, no email without a practical instruction. Shop links are on the site, not in the emails.

## Where things live

- `api/_shell.js`: the shared design (table layout, inline styles, site colours).
- `emails/content.mjs`: the copy for emails 1 to 5, in NL, DE and ES.
- `emails/build.mjs`: builds `emails/out/<locale>-<key>.html` and `manifest.json`. Add `--preview` to also write `emails/out/preview/` with sample values; the `kit72-emails` launch config serves it on port 3032.
- `emails/upload.mjs`: creates or updates the 15 templates in Resend by alias (`kit72-<locale>-<key>`) and publishes them.
- `emails/automations.mjs`: generates the six workflows into `emails/out/automations.json`.

To change an email: edit `content.mjs`, run `node emails/build.mjs`, then `RESEND_API_KEY=... node emails/upload.mjs`. The automations reference templates by ID, so they pick up the new version.

## In Resend

- Domain `kit-72.com` (eu-west-1), verified. Sender `Kit-72 <hallo@kit-72.com>`.
- Segment "Kit-72". Contact properties `kit72_locale`, `kit72_household_size`, `kit72_has_children`, `kit72_has_pets`, `kit72_signup_source`.
- 15 templates named "Kit-72 <LOCALE> <key>".
- Six automations, two per language, all triggered by `kit72.subscribed` and filtered on `event.locale`:
  - "Kit-72 <LOCALE> welcome + reminders": welcome at once, then a reminder every 180 days, four times. Delays are capped at 30 days, so six are chained per reminder. Workflows cannot loop, so reminders stop after two years; extend the workflow or send a broadcast to the segment after that.
  - "Kit-72 <LOCALE> tips": day 3, 8 and 15.
  - Every send after the welcome first checks `contact.unsubscribed`.
- Event payload: `locale`, `household` ("3 personen"), `household_size`, `water_litres`, `meals`, `lights`, `cash_eur`, `source`.

## Switching on

The automations were created **disabled**. Enable all six once this change is deployed: the previous version of `/api/confirm` sent its own welcome email, so enabling earlier would send two.

If the automations are disabled or deleted, a confirmed subscriber gets no welcome email and no error is shown. Check Resend → Automations → Runs after any change.

## Things to know

- **Shared account.** Contacts and unsubscribe status are account-wide, and the `kit-72-site` key has full access because the endpoints create contacts. A separate Resend account would isolate this.
- **Re-subscribing.** Someone who unsubscribed and signs up again gets the welcome email but no tips or reminders, because their contact stays unsubscribed. Flipping it back would also re-subscribe them to other projects in the shared account.
- **DNS** at Squarespace Domains: DKIM on `resend._domainkey`, MX and SPF on `send`, CNAME `rsend`, root SPF `v=spf1 -all`, DMARC `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s`. Adding an MX record makes Squarespace remove its "Email Security" preset; SPF and DMARC were re-added as custom records.
- **Not yet checked with a real mailbox.** Everything was tested against Resend's sink address, which does not evaluate DMARC.
- **Leftovers from testing:** contact `delivered@resend.dev` in the segment (one run of the NL welcome automation is waiting on it), and a disabled automation "Kit-72 probe (test, can be deleted)".

## On event

For a large outage, flood warning or official alert, send a broadcast to the "Kit-72" segment within hours: two sentences on what is happening with the official source, three steps for today, one link to the matching scenario page. No selling.
