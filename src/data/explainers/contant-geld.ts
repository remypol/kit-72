import { CHECKED, READ, labels, type Page } from './_shared';

export const contantGeld: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: noodpakket', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/noodpakket' },
    { id: 'nibud', org: 'Nibud', title: 'Minimaal € 70 contant geld voor noodsituaties', date: READ, url: 'https://www.nibud.nl/nieuws/contant-geld-voor-noodsituaties/' },
    { id: 'mob', org: 'Maatschappelijk Overleg Betalingsverkeer (voorzitter: DNB)', title: 'Advies: Denk vooruit, ook voor betalen', date: '20 mei 2025', url: 'https://www.dnb.nl/media/vctdty4f/advies-mob-denk-vooruit-ook-voor-betalen.pdf' },
    { id: 'dnb', org: 'De Nederlandsche Bank', title: 'Contant geld in jouw noodpakket', date: READ, url: 'https://www.dnb.nl/betalen/contant-geld-in-jouw-noodpakket/' },
    { id: 'rijk', org: 'Rijksoverheid', title: 'Contant geld thuis bewaren', date: READ, url: 'https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/dreiging-in-nederland/vraag-en-antwoord/betalingsverkeer/contant-geld-thuis-bewaren' },
    { id: 'rijk-pakket', org: 'Rijksoverheid', title: 'Wat zit er in een noodpakket?', date: READ, url: 'https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/veiligheidsregios-en-crisisbeheersing/vraag-en-antwoord/veiligheidsregios-en-crisisbeheersing/wat-zit-er-in-een-noodpakket' },
    { id: 'bv', org: 'Betaalvereniging Nederland', title: 'Betaalstoring? Dit zijn de terugvalopties', date: '22 mei 2025', url: 'https://www.betaalvereniging.nl/actueel/betaalstoring-terugvalopties/' },
    { id: 'pin', org: 'Pin.nl (Betaalvereniging Nederland)', title: 'Hoe werkt contactloos betalen met een betaalpas?', date: READ, url: 'https://www.pin.nl/consument/contactloos-betalen-met-betaalpas-of-mobiele-telefoon/hoe-werkt-contactloos-betalen-met-een-betaalpas/' },
    { id: 'acceptatie', org: 'De Nederlandsche Bank', title: 'Acceptatie contant geld blijft op peil', date: '7 juli 2026', url: 'https://www.dnb.nl/algemeen-nieuws/nieuws-2026/acceptatie-contant-geld-blijft-op-peil/' },
    { id: 'bekend', org: 'De Nederlandsche Bank', title: 'Advies over contant geld voor nood bij meerderheid consumenten bekend', date: '25 feb. 2026', url: 'https://www.dnb.nl/algemeen-nieuws/nieuws-2026/advies-over-contant-geld-voor-nood-bij-meerderheid-consumenten-bekend/' },
  ],
  content: {
    ...labels,
    title: 'Hoeveel contant geld in huis? € 70 per volwassene',
    description: 'Het advies is € 70 per volwassene en € 30 per kind, genoeg voor 72 uur. Waar dat bedrag vandaan komt, in welke biljetten, en wat je doet als pinnen niet werkt.',
    h1: 'Hoeveel contant geld in huis voor noodgevallen?',
    crumbParent: { label: 'Gidsen', href: '/nl/gidsen/' },
    crumb: 'Contant geld',
    image: { src: '/images/shared/cyber-attack.webp', alt: 'Telefoon met zwart scherm naast contant geld, een notitieboek met potlood, een bankpas en een radio op batterijen' },
    short: [
      'Het advies is € 70 per volwassene en € 30 per kind. Dat is genoeg voor de meest noodzakelijke uitgaven in de eerste 72 uur.{dv} Voor een gezin met twee kinderen is dat € 200.{mob}',
      'Het bedrag is een richtlijn; kijk ook naar je eigen situatie.{dv} Je hoeft het niet in één keer op te nemen: bouw het de komende maanden rustig op.{rijk-pakket}',
    ],
    sections: [
      {
        id: 'bedrag',
        heading: 'Waar komt € 70 vandaan?',
        paragraphs: [
          'Het bedrag is berekend door het Nibud, voor het geval dat je maximaal 72 uur niet elektronisch kunt betalen.{nibud} Het advies zelf is van 20 mei 2025 en komt van het Maatschappelijk Overleg Betalingsverkeer, dat wordt voorgezeten door De Nederlandsche Bank.{mob}',
          'Met € 70 betaal je drie dagen eten, zelfzorgmiddelen, persoonlijke verzorging en vervoer. Vaste lasten zitten er niet in.{nibud} Het Nibud gaat er daarbij van uit dat je geen extra’s koopt en geen onvermijdelijke persoonlijke uitgaven hebt.{nibud} Heb je die wel, zoals voer voor een huisdier of medicijnen, tel ze er dan bij.{dnb}',
        ],
        table: {
          head: ['Huishouden', 'Bedrag'],
          rows: [
            ['1 volwassene', '€ 70'],
            ['2 volwassenen', '€ 140'],
            ['1 volwassene, 2 kinderen', '€ 130'],
            ['2 volwassenen, 1 kind', '€ 170'],
            ['2 volwassenen, 2 kinderen', '€ 200'],
            ['2 volwassenen, 3 kinderen', '€ 230'],
          ],
        },
        after: ['De tabel komt uit het advies.{mob}'],
      },
      {
        id: 'coupures',
        heading: 'In welke biljetten en munten?',
        paragraphs: [
          'Klein. De Rijksoverheid adviseert verschillende biljetten en munten, zodat je zoveel mogelijk gepast kunt betalen.{rijk-pakket} Het advies noemt bij voorkeur lage biljetten en ongeveer vijftig munten van verschillende waarde.{mob}',
          'Aan kleine biljetten en munten kom je via de geldautomaat, een muntautomaat van Geldmaat of door wisselgeld te bewaren.{dnb}',
        ],
      },
      {
        id: 'waarom',
        heading: 'Waarom contant geld, als pinnen bijna altijd werkt?',
        paragraphs: [
          'Bij een grote storing kunnen pinnen, geld opnemen en overboeken tegelijk uitvallen.{mob} De meeste storingen tot nu toe troffen één bank, één verwerker of één gebied, en dan zijn er digitale uitwijkmogelijkheden. Vallen stroom, telefonie en internet tegelijk helemaal uit, dan kun je alleen nog betalen met contant geld en met uitgesteld pinnen bij winkels die daar een geschikte betaalautomaat voor hebben.{bv}',
          'Contant geld werd in 2025 op 96 procent van de onderzochte locaties geaccepteerd.{acceptatie} In februari 2026 kende 71 procent van de consumenten het advies en had 58 procent het bedrag in huis.{bekend}',
        ],
      },
      {
        id: 'pas',
        heading: 'Wat helpt nog meer als betalen hapert?',
        paragraphs: ['Het advies is om niet op één betaalmiddel te vertrouwen:{mob}{rijk}'],
        bullets: [
          'Betaal je altijd met je telefoon of horloge, zorg dan dat je ook een gewone pinpas bij je hebt.',
          'Houd een werkende bankapp op je telefoon, voor overboekingen en betaalverzoeken.',
          'Overweeg binnen je huishouden rekeningen bij verschillende banken, zodat een storing bij één bank niet alles blokkeert.',
        ],
        after: [
          'Contactloos betalen zonder pincode kan meestal tot en met € 50. Zodra opeenvolgende betalingen zonder pincode samen € 100 bereiken, moet je de pincode weer intoetsen.{pin} Ken je pincode dus uit je hoofd.',
        ],
      },
      {
        id: 'bewaren',
        heading: 'Bewaren, verzekering en belasting',
        paragraphs: [
          'Er is geen wettelijke grens aan het bedrag dat je thuis mag hebben.{rijk} Contant geld thuis valt onder je inboedelverzekering; de voorwaarden verschillen per verzekeraar, dus vraag ze op.{rijk} De bedragen uit het advies liggen volgens het Nibud onder het bedrag dat verzekerd kan worden en onder de grens voor de belastingaangifte.{nibud}',
          'Over de plek zegt De Nederlandsche Bank alleen: bewaar het op een veilige plek in huis.{dnb} Zorg dat iedereen in huis weet waar het ligt. Zet de plek in je <a href="/nl/noodplan-maken/">noodplan</a>.',
        ],
      },
    ],
    doTitle: 'Zo bouw je het op',
    doLead: 'Je hoeft niet naar de bank:',
    doSteps: [
      { text: 'Reken je bedrag uit: € 70 per volwassene, € 30 per kind, plus wat jouw huishouden extra nodig heeft.' },
      { text: 'Bewaar een paar weken je wisselgeld en neem bij het opnemen kleine biljetten.' },
      { text: 'Leg het bij je noodpakket of op een vaste, veilige plek.', href: '/nl/noodpakket-checklist/', link: 'Checklist noodpakket' },
      { text: 'Controleer of iedereen in huis een pinpas heeft en de pincode kent.' },
    ],
    cta: { label: 'Maak je gratis noodhandboek', href: '/nl/noodhandboek/' },
    related: {
      title: 'Verder lezen',
      links: [
        { label: 'Cyberaanval: wat doe je als pinnen en internet uitvallen?', href: '/nl/scenario/cyberaanval/' },
        { label: 'Stroomstoring: wat doe je en hoe bereid je je voor?', href: '/nl/scenario/stroomstoring/' },
      ],
    },
    faq: [
      { q: 'Hoeveel contant geld moet ik in huis hebben?', a: '€ 70 per volwassene en € 30 per kind. Dat is bedoeld voor de meest noodzakelijke uitgaven in de eerste 72 uur. Het is een richtlijn; tel erbij wat jouw huishouden extra nodig heeft.' },
      { q: 'Moet ik nu meteen geld gaan opnemen?', a: 'Nee. De overheid zegt uitdrukkelijk dat dat niet nodig is. Bouw het bedrag de komende maanden rustig op.' },
      { q: 'Hoeveel contant geld mag je thuis hebben?', a: 'Daar is geen grens aan. Boven een bepaald bedrag moet je contant geld wel opgeven bij je belastingaangifte.' },
      { q: 'Is contant geld thuis verzekerd?', a: 'Het valt onder je inboedelverzekering, maar de voorwaarden en het maximumbedrag verschillen per verzekeraar. Vraag ze op.' },
      { q: 'Wie heeft het advies van € 70 bedacht?', a: 'Het Nibud heeft de bedragen berekend. Het advies komt van het Maatschappelijk Overleg Betalingsverkeer, dat wordt voorgezeten door De Nederlandsche Bank, en is overgenomen door de Rijksoverheid.' },
      { q: 'Wat kan ik nog betalen als de stroom uitvalt?', a: 'Met contant geld kun je betalen zolang de winkel open is. Sommige winkels kunnen uitgesteld pinnen: de betaling wordt dan in de automaat bewaard en later verwerkt.' },
    ],
  },
};
