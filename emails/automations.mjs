/**
 * Generates the Resend automation workflows for Kit-72 and writes them to
 * emails/out/automations.json. They are created in Resend from that file
 * (dashboard or MCP); this script is the source of truth for their shape.
 *
 * Two automations per language, both triggered by `kit72.subscribed`:
 *   - "welcome + reminders": welcome at once, then a reminder every 180 days
 *     (delays are capped at 30 days, so six are chained), four times = 2 years
 *   - "tips": day 3 water, day 8 light, day 15 buy-or-build
 * Every send after the welcome first checks that the contact is still
 * subscribed. Workflows must be trees, so reminders cannot loop.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { emails } from './content.mjs';

const out = join(dirname(fileURLToPath(import.meta.url)), 'out');
const ids = JSON.parse(readFileSync(join(out, 'templates.json'), 'utf8'));
const FROM = 'Kit-72 <hallo@kit-72.com>';
const REMINDERS = 4;
const v = (field) => ({ var: `event.${field}` });

function chain(locale, build) {
  const steps = [];
  const add = (step) => steps.push(step);
  add({ key: 'trigger', type: 'trigger', config: { eventName: 'kit72.subscribed' }, next: 'is_locale' });
  add({
    key: 'is_locale',
    type: 'condition',
    config: { type: 'rule', field: 'event.locale', operator: 'eq', value: locale },
    branches: { condition_met: null, condition_not_met: null },
  });
  // link(prevKey, nextKey): fills in the pending "next" of the previous step
  let prev = steps[1];
  const link = (step) => {
    if (prev.type === 'condition') prev.branches.condition_met = step.key;
    else prev.next = step.key;
    add(step);
    prev = step;
  };
  const send = (key, name, variables) =>
    link({
      key,
      type: 'send_email',
      config: {
        template: { id: ids[`kit72-${locale}-${name}`], ...(variables ? { variables } : {}) },
        from: FROM,
        subject: emails[name][locale].subject,
      },
      next: null,
    });
  const wait = (key, duration) => link({ key, type: 'delay', config: { duration }, next: null });
  const stillSubscribed = (key) =>
    link({
      key,
      type: 'condition',
      config: { type: 'rule', field: 'contact.unsubscribed', operator: 'eq', value: false },
      branches: { condition_met: null, condition_not_met: null },
    });
  build({ send, wait, stillSubscribed });
  return { steps };
}

const automations = [];
for (const locale of ['nl', 'de', 'es']) {
  const L = locale.toUpperCase();
  automations.push({
    name: `Kit-72 ${L} welcome + reminders`,
    workflow: chain(locale, ({ send, wait, stillSubscribed }) => {
      send('send_welcome', 'welcome', {
        HOUSEHOLD: v('household'),
        WATER_LITRES: v('water_litres'),
        MEALS: v('meals'),
        LIGHTS: v('lights'),
        ...(locale === 'nl' ? { CASH_EUR: v('cash_eur') } : {}),
      });
      for (let r = 1; r <= REMINDERS; r++) {
        for (let d = 1; d <= 6; d++) wait(`wait_${r}_${d}`, '30 days');
        stillSubscribed(`subscribed_${r}`);
        send(`send_reminder_${r}`, 'reminder');
      }
    }),
  });
  automations.push({
    name: `Kit-72 ${L} tips`,
    workflow: chain(locale, ({ send, wait, stillSubscribed }) => {
      wait('wait_water', '3 days');
      stillSubscribed('subscribed_water');
      send('send_water', 'tip-water', { WATER_LITRES: v('water_litres') });
      wait('wait_light', '5 days');
      stillSubscribed('subscribed_light');
      send('send_light', 'tip-light');
      wait('wait_buy', '7 days');
      stillSubscribed('subscribed_buy');
      send('send_buy', 'tip-buy');
    }),
  });
}
writeFileSync(join(out, 'automations.json'), JSON.stringify(automations, null, 2) + '\n');
for (const a of automations) console.log(a.name, a.workflow.steps.length, 'steps');
