import { CHECKED, READ, labels, type Page } from './_shared';

export const kokenZonderStroom: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: noodpakket', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/noodpakket' },
    { id: 'lijst', org: 'Denk Vooruit (Rijksoverheid)', title: 'Stel je noodpakket samen', date: READ, url: 'https://www.denkvooruit.nl/bereid-je-voor/stel-je-noodpakket-samen' },
    { id: 'vc', org: 'Voedingscentrum', title: 'Moet ik een noodpakket met eten en drinken in huis hebben?', date: READ, url: 'https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/boodschappen-doen/moet-ik-een-noodpakket-met-eten-en-drinken-in-huis-hebben.aspx' },
    { id: 'koelkast', org: 'Voedingscentrum', title: 'Wat moet ik doen met mijn eten in de koelkast of vriezer bij een stroomstoring?', date: READ, url: 'https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/veilig-eten/wat-moet-ik-doen-met-mijn-eten-in-de-koelkast-of-vriezer-bij-een-stroomstoring.aspx' },
    { id: 'bbq', org: 'Brandweer Nederland', title: 'Barbecueën', date: READ, url: 'https://www.brandweer.nl/onderwerpen/barbecueen/' },
    { id: 'co', org: 'Brandweer Nederland', title: 'Koolmonoxide', date: READ, url: 'https://www.brandweer.nl/brandveiligheid/koolmonoxide' },
    { id: 'nvwa', org: 'NVWA', title: 'Toestellen op gasflessen', date: READ, url: 'https://www.nvwa.nl/onderwerpen/productveiligheid/gastoestellen/toestellen-op-gasflessen' },
    { id: 'rk', org: 'Rode Kruis', title: 'Wat te doen bij stroomuitval', date: READ, url: 'https://www.rodekruis.nl/wat-doen-wij/hulp-in-nederland/goed-voorbereid/wat-te-doen-bij-stroomuitval/' },
  ],
  content: {
    ...labels,
    title: 'Koken zonder stroom: wat kan veilig en wat niet?',
    description: 'Een gasbrander of barbecue gebruik je bij stroomuitval alleen buiten. Hoe lang koelkast en vriezer koud blijven en wat je eet zonder te koken.',
    h1: 'Koken en eten zonder stroom',
    crumbParent: { label: 'Gidsen', href: '/nl/gidsen/' },
    crumb: 'Koken zonder stroom',
    image: { src: '/images/shared/emergency-food.webp', alt: 'Houdbaar eten voor drie dagen: blikken, potten rijst, pasta en linzen, knäckebröd, chocolade en een gasbrander met pan' },
    short: [
      'Koken op een campinggasbrander, barbecue of open vuur doe je bij stroomuitval alleen buiten. Binnen werkt de ventilatie dan niet en blijven schadelijke rook en gassen hangen.{dv}',
      'Kun je niet buiten koken, bijvoorbeeld omdat je in een flat woont, zorg dan voor eten dat je niet hoeft te verwarmen.{vc} Eet eerst wat in de koelkast en vriezer ligt en daarna pas je houdbare voorraad.{vc}',
    ],
    sections: [
      {
        id: 'buiten',
        heading: 'Waarom alleen buiten?',
        paragraphs: [
          'Koolmonoxide zie en ruik je niet.{co} Volgens de brandweer bevat de rook van een barbecue een hoge concentratie koolmonoxide; een barbecue binnen zetten noemt ze letterlijk levensgevaarlijk.{bbq} Ook op het balkon raadt de brandweer barbecueën af, omdat de rook de woning in kan waaien.{bbq}',
          'Om die reden zit er geen gasbrander in het noodpakket van de overheid: het pakket moet voor iedereen eenvoudig en veilig zijn.{dv} Het Rode Kruis zegt hetzelfde over warmte: maak binnen geen vuur om warm te blijven.{rk} En de NVWA waarschuwt een kooktoestel nooit als verwarming te gebruiken, bijvoorbeeld met een omgekeerde bloempot erop.{nvwa}',
        ],
      },
      {
        id: 'co',
        heading: 'Koolmonoxide herkennen',
        paragraphs: [
          'De eerste klachten lijken op griep: lichte hoofdpijn, misselijkheid, overgeven en vermoeidheid.{co} Vermoed je koolmonoxide, ga dan naar buiten en bel 112.{co}',
          'Elk jaar overlijden in Nederland gemiddeld 5 tot 10 mensen aan koolmonoxidevergiftiging.{co} Een koolmonoxidemelder herken je aan de norm NEN-EN 50291 op de verpakking.{co} Een melder op batterijen werkt ook als de stroom is uitgevallen.',
        ],
      },
      {
        id: 'gas',
        heading: 'Veilig koken op een gasbrander, buiten',
        paragraphs: ['De NVWA geeft deze regels voor toestellen op een gasfles:{nvwa}'],
        bullets: [
          'Zet het toestel op een vlakke, stabiele ondergrond.',
          'Houd gasflessen uit de zon. Boven de 30 graden loopt de druk op.',
          'Draai de kraan dicht als je het toestel niet gebruikt.',
          'Vervang een gasslang die ouder is dan twee jaar.',
          'Controleer de aansluiting na het wisselen van de fles met zeepsop op lekkage.',
        ],
        after: ['Over kleine gasbusjes en het bewaren daarvan in huis vonden we geen officieel advies. Lees de aanwijzingen op de bus.'],
      },
      {
        id: 'koelkast',
        heading: 'Hoe lang blijven koelkast en vriezer koud?',
        paragraphs: [
          'Houd de deuren dicht. Een gesloten koelkast houdt eten ongeveer 4 uur veilig koel. Een volle vriezer blijft ongeveer 48 uur koud, een halfvolle ongeveer 24 uur. Het zijn schattingen.{vc}',
          'Duurt de storing langer dan 4 uur, meet dan de temperatuur in de koelkast als je een thermometer hebt.{vc}',
        ],
        table: {
          head: ['Temperatuur in de koelkast', 'Wat je doet'],
          rows: [
            ['7 °C of lager', 'Koelkast dichthouden. Gebruik eerst wat snel bederft.{vc}'],
            ['Hoger dan 7 °C', 'Eet of verhit kwetsbare producten binnen 4 uur: rauw vlees en vis, vleeswaren, gerookte vis, zachte kaas, kliekjes, maaltijdsalades en gesneden groente en fruit.{vc}'],
            ['Hoger dan 10 °C', 'Gooi kwetsbare producten weg.{koelkast}'],
            ['Hoger dan 15 °C', 'Gooi ook yoghurt, melk en geopende pakken weg.{koelkast}'],
          ],
        },
        after: [
          'Weet je niet hoe lang iets te warm is geweest, gooi het dan weg.{vc}',
          'Uit de vriezer: eten dat nog ijskristallen bevat en hard aanvoelt, kun je in het algemeen opnieuw invriezen of bereiden. Is de buitenkant zacht, vries het dan niet meer in; leg het in de koelkast en eet het bij voorkeur dezelfde dag op.{vc}',
        ],
      },
      {
        id: 'koud',
        heading: 'Wat eet je zonder te koken?',
        paragraphs: [
          'De overheid noemt voor het noodpakket eten dat lang houdbaar is, zoals noten, groente in blik en gedroogd fruit.{lijst} Het Voedingscentrum geeft een voorbeeldlijst voor twee volwassenen voor 72 uur en raadt aan te kiezen wat je huisgenoten graag eten.{vc} Zonder verwarmen kun je onder meer eten:{vc}',
        ],
        bullets: [
          'wraps en knäckebröd, in plaats van rijst en pasta;',
          'groente uit blik die koud ook smaakt, zoals doperwten of mais;',
          'vis en peulvruchten uit blik;',
          'noten, muesli, rijstwafels en pindakaas;',
          'fruit uit blik of gedroogd fruit;',
          'houdbare melk of sojadrink.',
        ],
        after: [
          'Rijst, pasta, koffie en thee vragen om heet water. Wil je die toch, dan heb je een brander nodig die je buiten kunt gebruiken.{vc} Vergeet de blikopener niet, en reken het water om te koken mee in de 3 liter per persoon per dag.{vc}',
        ],
      },
    ],
    doTitle: 'Zo bereid je het voor',
    doLead: 'Kijk eerst naar je woning, dan naar je voorraad:',
    doSteps: [
      { text: 'Heb je een tuin, dakterras of andere plek buiten waar een brander veilig kan staan? Zo niet, kies dan voor eten dat koud kan.' },
      { text: 'Leg voor drie dagen eten neer dat je huisgenoten ook echt eten.', href: '/nl/gidsen/voedsel-opslaan/', link: 'Voedsel opslaan' },
      { text: 'Koop een koelkastthermometer; die kost weinig en je weet daarna wat weg moet.' },
      { text: 'Hang een koolmonoxidemelder op die op batterijen werkt.' },
    ],
    cta: { label: 'Bekijk de checklist noodpakket', href: '/nl/noodpakket-checklist/' },
    related: {
      title: 'Verder lezen',
      links: [
        { label: 'Stroomstoring: wat doe je en hoe bereid je je voor?', href: '/nl/scenario/stroomstoring/' },
        { label: 'Extreme kou: warm blijven zonder verwarming', href: '/nl/scenario/extreme-kou/' },
        { label: 'Noodvoedsel: waar je op let', href: '/nl/producten/noodvoedsel/' },
      ],
    },
    faq: [
      { q: 'Mag je binnen koken op een campinggasje als de stroom uitvalt?', a: 'De overheid en het Voedingscentrum zeggen: alleen buiten. Bij stroomuitval werkt de ventilatie in huis niet en blijven schadelijke gassen hangen.' },
      { q: 'Kan ik op het balkon barbecueën?', a: 'De brandweer raadt het af. De rook kan de woning in waaien, met kans op koolmonoxide binnen.' },
      { q: 'Hoe lang blijft eten goed in de koelkast zonder stroom?', a: 'Een gesloten koelkast houdt eten ongeveer 4 uur veilig koel. Daarna hangt het af van de temperatuur: boven 7 °C eet of verhit je kwetsbare producten binnen 4 uur.' },
      { q: 'Hoe lang blijft een vriezer koud zonder stroom?', a: 'Een volle vriezer ongeveer 48 uur, een halfvolle ongeveer 24 uur, als je de deur dichthoudt.' },
      { q: 'Kan ik ontdooid eten opnieuw invriezen?', a: 'Als het nog ijskristallen bevat en hard aanvoelt, in het algemeen wel. Is de buitenkant zacht, dan niet: leg het in de koelkast en eet het bij voorkeur dezelfde dag.' },
      { q: 'Waarom zit er geen gasbrander in het noodpakket van de overheid?', a: 'Omdat het pakket voor iedereen eenvoudig en veilig moet zijn. Een kooktoestel of open vuur brengt veiligheidsrisico’s mee.' },
    ],
  },
};
