import { CHECKED, READ, labels, type Page } from './_shared';

export const nlAlert: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'home', org: 'NL-Alert (Rijksoverheid)', title: 'NL-Alert', date: READ, url: 'https://www.nl-alert.nl/' },
    { id: 'werkt', org: 'NL-Alert (Rijksoverheid)', title: 'Zo werkt NL-Alert', date: READ, url: 'https://www.nl-alert.nl/zo-werkt-nl-alert' },
    { id: 'test', org: 'NL-Alert (Rijksoverheid)', title: 'Testbericht', date: READ, url: 'https://www.nl-alert.nl/testbericht' },
    { id: 'mobiel', org: 'NL-Alert (Rijksoverheid)', title: 'NL-Alert op jouw mobiel', date: READ, url: 'https://www.nl-alert.nl/zo-werkt-nl-alert/nl-alert-op-jouw-mobiel' },
    { id: 'vragen', org: 'NL-Alert (Rijksoverheid)', title: 'Vragen en antwoorden', date: READ, url: 'https://www.nl-alert.nl/zo-werkt-nl-alert/vragen-en-antwoorden' },
    { id: 'grens', org: 'NL-Alert (Rijksoverheid)', title: 'Ik ben in een grensgebied', date: READ, url: 'https://www.nl-alert.nl/nl-alert-app/ik-ben-in-een-grensgebied' },
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'NL-Alert', date: READ, url: 'https://www.denkvooruit.nl/bereid-je-voor/zo-krijg-je-een-waarschuwing/nl-alert' },
    { id: 'dv-info', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: betrouwbare informatie', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/betrouwbare-informatie' },
    { id: 'rijk', org: 'Rijksoverheid', title: 'Wat is NL-Alert?', date: READ, url: 'https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/veiligheidsregios-en-crisisbeheersing/vraag-en-antwoord/veiligheidsregios-en-crisisbeheersing/wat-is-nl-alert' },
    { id: 'weblog', org: 'Rijksoverheid', title: 'Testbericht NL-Alert: de kracht van NL-Alert', date: '30 mei 2024', url: 'https://www.rijksoverheid.nl/actueel/weblogs/jenv-verhalen/2024/testbericht-nl-alert-de-kracht-van-nl-alert' },
    { id: 'bereik', org: 'Rijksoverheid', title: 'Bereik van het NL-Alert testbericht van 1 december 2025', date: 'dec. 2025', url: 'https://open.overheid.nl/documenten/dea7dc11-fc2e-4a33-bbe3-8fd41a17e8cf/file' },
    { id: 'apple', org: 'Apple', title: 'Over noodmeldingen en overheidsmeldingen op de iPhone', date: '19 dec. 2025', url: 'https://support.apple.com/nl-nl/HT202743' },
    { id: 'google', org: 'Google', title: 'Noodmeldingen beheren op Android', date: READ, url: 'https://support.google.com/android/answer/9319337?hl=nl' },
    { id: 'burgernet', org: 'Burgernet', title: 'Contact en veelgestelde vragen', date: READ, url: 'https://www.burgernet.nl/contact' },
  ],
  content: {
    ...labels,
    title: 'NL-Alert: testbericht, instellen en wat je moet doen',
    description: 'Wanneer komt het testbericht van NL-Alert, hoe controleer je je telefoon en waarom krijg je soms niets? Wat de overheid erover zegt, met bronnen.',
    h1: 'NL-Alert: wanneer het komt en wat je doet',
    crumb: 'NL-Alert',
    short: [
      'NL-Alert is het alarmmiddel van de overheid. Bij een noodsituatie in je buurt krijg je een tekstbericht op je mobiele telefoon waarin staat wat er aan de hand is en wat je moet doen.{werkt}',
      'Je hoeft je niet aan te melden en je nummer blijft onbekend.{werkt} Het testbericht komt twee keer per jaar: op de eerste maandag van juni en van december, rond 12.00 uur.{test}{mobiel} Het volgende testbericht is op maandag 7 december 2026.{test}',
      'Krijg je een NL-Alert, lees het dan meteen, kom in actie en help anderen daarbij.{home}',
    ],
    sections: [
      {
        id: 'testbericht',
        heading: 'Wanneer komt het testbericht?',
        paragraphs: [
          'Elk half jaar, in juni en december, zendt de overheid rond 12.00 uur een testbericht uit.{test} Dat is steeds op de eerste maandag van die maand,{mobiel} tegelijk met de maandelijkse test van de <a href="/nl/sirene/">sirene</a>.{dv}',
          'Het laatste testbericht was op maandag 1 juni 2026, het volgende komt op maandag 7 december 2026.{test} Je hoeft er niets mee te doen. Het bericht sluit af met een regel in het Engels.{test}',
          'Bij het testbericht van 1 december 2025 ontving 92 procent van de Nederlanders van 12 jaar en ouder het bericht op de eigen telefoon.{bereik}',
        ],
      },
      {
        id: 'werking',
        heading: 'Hoe werkt NL-Alert?',
        paragraphs: [
          'NL-Alert gebruikt cell broadcast: zendmasten in het getroffen gebied sturen het bericht naar alle telefoons in de buurt. Daarom hoef je je niet aan te melden en is het gratis en anoniem.{werkt} Het werkt ook als het mobiele netwerk overbelast is.{vragen}',
          'Het bericht wordt opgesteld en verstuurd door de gezamenlijke meldkamer van politie, brandweer en ambulance. De veiligheidsregio bepaalt in welk gebied het wordt uitgezonden.{werkt} Over een landelijk NL-Alert beslist de minister van Justitie en Veiligheid.{weblog}',
          'Je hebt bereik nodig van een van de Nederlandse mobiele netwerken. Via wifi werkt NL-Alert niet.{vragen} Je ziet een NL-Alert ook op digitale reclameschermen en op de reisinformatieschermen van trein, bus, tram en metro.{home}',
        ],
      },
      {
        id: 'instellen',
        heading: 'Staat NL-Alert aan op mijn telefoon?',
        paragraphs: ['Vrijwel alle mobiele telefoons die in Nederland worden verkocht, zijn standaard ingesteld voor NL-Alert.{mobiel} Controleren kan zo:'],
        bullets: [
          '<strong>iPhone:</strong> open Instellingen, tik op Meldingen en kijk onderaan bij Overheidsmeldingen.{apple}',
          '<strong>Android:</strong> open Instellingen en zoek bij Meldingen naar Noodmeldingen. De naam van het menu verschilt per merk.{google}',
          '<strong>Telefoon zonder aanraakscherm:</strong> zoek in het menu naar Cell Broadcast en meld je aan voor kanaal 919.{mobiel}',
        ],
        after: ['Zekerheid krijg je bij het testbericht: komt het binnen, dan staat je telefoon goed.'],
      },
      {
        id: 'niet-ontvangen',
        heading: 'Waarom kreeg ik geen NL-Alert?',
        paragraphs: ['De overheid noemt deze oorzaken:'],
        bullets: [
          'Je telefoon stond uit, in vliegtuigmodus of had geen bereik.{mobiel}',
          'Je telefoon stond op Niet storen.{rijk}',
          'Je telefoon stond op stil. Bij sommige merken klinkt het alarmgeluid dan niet.{mobiel}',
          'Je was dicht bij de grens: een NL-Alert wordt niet uitgezonden via buitenlandse zendmasten.{grens}',
        ],
        after: [
          'Zet je je telefoon later aan terwijl het NL-Alert nog actief is en je in het gebied bent, dan krijg je het alsnog.{vragen}',
          'Bij een stroomstoring werkt NL-Alert zolang de meldkamers en de telecomproviders de uitval kunnen opvangen.{dv-info} De overheid adviseert ook een radio op batterijen in huis te hebben. Op welke zender je dan afstemt, zie je bij de <a href="/nl/rampenzender/">rampenzender van je regio</a>.',
        ],
      },
      {
        id: 'burgernet',
        heading: 'Is NL-Alert hetzelfde als Burgernet of AMBER Alert?',
        paragraphs: [
          'Nee. Een NL-Alert krijg je zonder app. Een Burgernetactie krijg je alleen als je de Burgernetapp hebt geïnstalleerd. Ook AMBER Alerts en Vermist Kind Alerts worden via die app verspreid en komen dus niet vanzelf binnen.{burgernet}',
        ],
      },
    ],
    doTitle: 'Wat je nu kunt doen',
    doLead: 'Vier dingen, in een kwartier geregeld:',
    doSteps: [
      { text: 'Controleer de instelling op je telefoon en op die van je huisgenoten, ook van ouderen in je omgeving.' },
      { text: 'Laad je telefoon op en laat hem aan, ook ’s nachts.' },
      { text: 'Zoek op welke regionale omroep bij een ramp de aanwijzingen geeft.', href: '/nl/rampenzender/', link: 'Rampenzender per gemeente' },
      { text: 'Weet wat je doet als de sirene gaat.', href: '/nl/sirene/', link: 'Wat doe je als de sirene gaat?' },
    ],
    cta: { label: 'Maak je gratis noodhandboek', href: '/nl/noodhandboek/' },
    faq: [
      { q: 'Moet ik me aanmelden voor NL-Alert?', a: 'Nee. NL-Alert werkt met cell broadcast: zendmasten sturen het bericht naar alle telefoons in het gebied. Aanmelden is niet nodig en de overheid kent je naam en nummer niet.' },
      { q: 'Wanneer is het volgende testbericht van NL-Alert?', a: 'Op maandag 7 december 2026 rond 12.00 uur. Het testbericht komt elk jaar op de eerste maandag van juni en de eerste maandag van december.' },
      { q: 'Werkt NL-Alert als mijn telefoon op stil staat?', a: 'Het bericht komt binnen, maar bij sommige merken klinkt het alarmgeluid niet als de telefoon op stil staat. Staat je telefoon op Niet storen, in vliegtuigmodus of uit, dan mis je het bericht.' },
      { q: 'Werkt NL-Alert via wifi?', a: 'Nee. Je hebt bereik nodig van een van de Nederlandse mobiele netwerken. Het werkt wel als dat netwerk overbelast is.' },
      { q: 'Kan ik een NL-Alert teruglezen?', a: 'Na het lezen verdwijnt het bericht van je scherm. De overheid houdt een overzicht van verstuurde NL-Alerts bij op de website van NL-Alert.' },
      { q: 'Kan ik NL-Alert uitzetten?', a: 'Dat kan in de instellingen van je telefoon, maar dan krijg je ook bij een echte noodsituatie geen bericht.' },
    ],
  },
};
