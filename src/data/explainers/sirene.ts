import { CHECKED, READ, labels, type Page } from './_shared';

export const sirene: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'test', org: 'Rijksoverheid', title: 'Wanneer wordt de sirene getest?', date: READ, url: 'https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/veiligheidsregios-en-crisisbeheersing/wanneer-wordt-de-sirene-getest' },
    { id: 'doen', org: 'Rijksoverheid', title: 'Wat moet ik doen als de sirene gaat?', date: READ, url: 'https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/veiligheidsregios-en-crisisbeheersing/vraag-en-antwoord/veiligheidsregios-en-crisisbeheersing/wat-moet-ik-doen-als-de-sirene-gaat' },
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'De sirene', date: READ, url: 'https://www.denkvooruit.nl/bereid-je-voor/zo-krijg-je-een-waarschuwing/de-sirene' },
    { id: 'bw', org: 'Brandweer Nederland', title: 'Sirenes', date: READ, url: 'https://www.brandweer.nl/onderwerpen/sirenes/' },
    { id: 'nieuws', org: 'Rijksoverheid', title: 'Kabinet komt met nieuw sirenenetwerk', date: '9 juni 2026', url: 'https://www.rijksoverheid.nl/actueel/nieuws/2026/06/09/kabinet-komt-met-nieuw-sirenenetwerk' },
    { id: 'k276', org: 'Tweede Kamer', title: 'Kamerbrief over het waarschuwings- en alarmeringssysteem (29517, nr. 276)', date: '9 juni 2026', url: 'https://zoek.officielebekendmakingen.nl/kst-29517-276.pdf' },
    { id: 'k252', org: 'Tweede Kamer', title: 'Kamerbrief over uitfasering van het sirenestelsel (29517, nr. 252)', date: '29 feb. 2024', url: 'https://zoek.officielebekendmakingen.nl/kst-29517-252.pdf' },
    { id: 'dv-info', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: betrouwbare informatie', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/betrouwbare-informatie' },
    { id: 'doof', org: 'NL-Alert (Rijksoverheid)', title: 'Ik ben slechthorend of doof', date: READ, url: 'https://www.nl-alert.nl/nl-alert-app/ik-ben-slechthorend-of-doof' },
  ],
  content: {
    ...labels,
    title: 'Wat doe je als de sirene gaat? Test en echt alarm',
    description: 'De sirene wordt elke eerste maandag van de maand om 12.00 uur getest. Gaat ze op een ander moment: ga naar binnen, sluit ramen en deuren en zet de radio aan.',
    h1: 'Wat doe je als de sirene gaat?',
    crumb: 'Sirene',
    image: { src: '/images/shared/siren.webp', alt: 'Schaalmodel van een waarschuwingssirene op een paal, naast een radio op batterijen en een huissleutel' },
    short: [
      'Hoor je de sirene op een ander moment dan de maandelijkse test, of vaker achter elkaar? Dan is er iets aan de hand.{test} Ga zo snel mogelijk naar binnen, doe ramen, deuren en andere openingen dicht en volg het nieuws op radio, televisie of internet.{dv}',
      'De test is elke eerste maandag van de maand om 12.00 uur. Het signaal duurt dan onafgebroken 1 minuut en 26 seconden.{test}',
    ],
    sections: [
      {
        id: 'stappen',
        heading: 'De sirene gaat en het is geen test: wat doe je?',
        paragraphs: ['Dit is de aanwijzing van de overheid:{dv}{doen}'],
        steps: [
          'Ga snel je huis of het dichtstbijzijnde gebouw in.',
          'Zie je mensen die de sirene niet horen, waarschuw ze. Laat andere mensen en dieren bij je schuilen.',
          'Doe ramen en deuren dicht. Denk ook aan andere openingen: de afzuigkap, roosters of een tussendeur.',
          'Zet de mechanische ventilatie uit door de stekker eruit te trekken.',
          'Volg het nieuws op radio, televisie of internet.',
          'Ga pas naar buiten als je hoort dat de situatie weer veilig is.',
        ],
        after: [
          'Stopt het geluid, dan is het nog niet veilig. Dat is het pas als de regionale omroep, een NL-Alert of de veiligheidsregio dat meldt.{bw} Welke omroep dat bij jou is en op welke frequentie, zie je bij de <a href="/nl/rampenzender/">rampenzender van je regio</a>.',
        ],
      },
      {
        id: 'onderweg',
        heading: 'En als je onderweg bent, of je kinderen op school zijn?',
        paragraphs: [
          'Zit je in de auto, parkeer dan en ga snel ergens naar binnen. Kan dat niet, blijf dan in de auto, zet de motor uit, doe de luchtroosters dicht en houd ramen en deuren gesloten.{dv}',
          'Kinderen die op school of op de opvang zijn, blijven daar. De begeleiders helpen ze.{dv} Ga ze dus niet halen terwijl het alarm gaat.',
        ],
      },
      {
        id: 'test',
        heading: 'Wanneer wordt de sirene getest?',
        paragraphs: [
          'Iedere eerste maandag van de maand om 12.00 uur, 1 minuut en 26 seconden lang. De sirene wordt niet getest op nationale en religieuze feestdagen en ook niet op 4 mei, de dag van de Nationale Dodenherdenking.{test}',
          'De sirenes worden met de hand ingeschakeld door een medewerker van de 112-centrale in de regio.{bw} Het begin kan daardoor een paar tellen verschillen.',
          'Twee keer per jaar, op de eerste maandag van juni en december, krijg je op hetzelfde moment het testbericht van <a href="/nl/nl-alert/">NL-Alert</a>.',
        ],
      },
      {
        id: 'toekomst',
        heading: 'Blijven de sirenes bestaan?',
        paragraphs: [
          'Voorlopig wel. In februari 2024 besloot het kabinet het sirenestelsel uit te faseren zodra de onderhoudscontracten eind 2025 afliepen.{k252} In juni 2026 kwam het kabinet daarop terug: Nederland krijgt een nieuw sirenenetwerk, en de bestaande palen blijven in elk geval tot 2028 in gebruik.{nieuws}',
          'Het huidige stelsel dekt niet het hele land: het bereik is ongeveer 75 procent.{k276} De brandweer telt 4.278 sirenes.{bw} Volgens de overheid kunnen de sirenes de komende jaren nog worden ingezet bij lokale of regionale rampen.{dv-info}',
        ],
      },
      {
        id: 'niet-horen',
        heading: 'Wat als je de sirene niet hoort?',
        paragraphs: [
          'De sirenes zijn bedoeld om mensen die buiten zijn te waarschuwen dat ze naar binnen moeten.{bw} Binnen, met de ramen dicht, kun je de sirene missen. Daarom is NL-Alert het middel waarmee de overheid je ook binnen bereikt.',
          'Voor mensen die doof of slechthorend zijn, vonden we in de officiële bronnen geen apart advies over de sirene. NL-Alert ondersteunt wel flitsmeldingen via de instellingen van je telefoon.{doof}',
          'Hoorde je de sirene tijdens de maandelijkse test niet, terwijl dat zou moeten? Dat kun je melden via het formulier op de website van de brandweer.{bw}',
        ],
      },
    ],
    doTitle: 'Wat je nu kunt doen',
    doLead: 'Je hebt bij een alarm geen tijd om dingen op te zoeken. Regel dit vooraf:',
    doSteps: [
      { text: 'Zoek op welke regionale omroep je rampenzender is en schrijf de frequentie op.', href: '/nl/rampenzender/', link: 'Rampenzender per gemeente' },
      { text: 'Zorg voor een radio die ook zonder stopcontact werkt.', href: '/nl/producten/noodradio/', link: 'Waar je op let bij een noodradio' },
      { text: 'Weet waar de stekker van je mechanische ventilatie zit.' },
      { text: 'Spreek met je huisgenoten af dat iedereen binnen blijft waar hij is.', href: '/nl/noodplan-maken/', link: 'Noodplan maken' },
    ],
    cta: { label: 'Maak je gratis noodhandboek', href: '/nl/noodhandboek/' },
    faq: [
      { q: 'Hoe laat gaat de sirene op de eerste maandag van de maand?', a: 'Om 12.00 uur. Het testsignaal duurt 1 minuut en 26 seconden. Op nationale en religieuze feestdagen en op 4 mei wordt de sirene niet getest.' },
      { q: 'Wat betekent het als de sirene meerdere keren achter elkaar gaat?', a: 'Dan is het geen test. Volgens de Rijksoverheid is er dan zeker iets aan de hand. Ga naar binnen, sluit ramen en deuren en volg het nieuws.' },
      { q: 'Moet ik mijn kinderen van school halen als de sirene gaat?', a: 'Nee. Kinderen die op school of op de opvang zijn, blijven daar; de begeleiders helpen ze. Zelf ga je ook zo snel mogelijk naar binnen.' },
      { q: 'Is het veilig als de sirene stopt?', a: 'Nee. Het is pas veilig als de regionale omroep, een NL-Alert of de veiligheidsregio dat meldt.' },
      { q: 'Worden de sirenes afgeschaft?', a: 'Dat was het plan, maar in juni 2026 besloot het kabinet tot een nieuw sirenenetwerk. De bestaande sirenes blijven in elk geval tot 2028 in gebruik.' },
    ],
  },
};
