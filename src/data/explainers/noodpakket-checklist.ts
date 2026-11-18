import { CHECKED, READ, labels, type Page } from './_shared';

export const noodpakketChecklist: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'Stel je noodpakket samen', date: READ, url: 'https://www.denkvooruit.nl/bereid-je-voor/stel-je-noodpakket-samen' },
    { id: 'faq', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: noodpakket', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/noodpakket' },
    { id: 'rijk', org: 'Rijksoverheid', title: 'Wat zit er in een noodpakket?', date: READ, url: 'https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/veiligheidsregios-en-crisisbeheersing/vraag-en-antwoord/veiligheidsregios-en-crisisbeheersing/wat-zit-er-in-een-noodpakket' },
    { id: 'rk', org: 'Rode Kruis', title: 'Wat zit er in een noodpakket?', date: READ, url: 'https://www.rodekruis.nl/wat-doen-wij/hulp-in-nederland/goed-voorbereid/wat-zit-er-in-een-noodpakket/' },
    { id: 'dv-stroom', org: 'Denk Vooruit (Rijksoverheid)', title: 'Geen stroom', date: READ, url: 'https://www.denkvooruit.nl/risicos/risicos-in-nederland/geen-stroom' },
    { id: 'vc', org: 'Voedingscentrum', title: 'Moet ik een noodpakket met eten en drinken in huis hebben?', date: READ, url: 'https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/boodschappen-doen/moet-ik-een-noodpakket-met-eten-en-drinken-in-huis-hebben.aspx' },
  ],
  content: {
    ...labels,
    title: 'Noodpakket checklist: de lijst van de overheid (2026)',
    description: 'De twaalf onderdelen van het noodpakket volgens de Rijksoverheid, wat er per onderdeel bij komt kijken, de tas voor als je weg moet en wat je zelf toevoegt.',
    h1: 'Noodpakket checklist: de twaalf onderdelen',
    crumb: 'Checklist noodpakket',
    image: { src: '/images/shared/emergency-kit.webp', alt: 'Noodpakket uitgestald: drybag, waterflessen, blikken, opwindradio, zaklamp, batterijen, EHBO-etui, deken en contant geld' },
    short: [
      'Het noodpakket van de overheid telt twaalf onderdelen en is bedoeld voor de eerste 72 uur na een ramp of noodsituatie.{dv} De enige hoeveelheden die de overheid noemt, zijn 3 liter water per persoon per dag en € 70 contant geld per volwassene en € 30 per kind.{dv}{faq}',
      'Je vult het aan met wat jouw huishouden nodig heeft, zoals babyvoeding, medicijnen en eten en drinken voor je huisdieren.{dv} De meeste spullen heb je al in huis.{faq}',
    ],
    sections: [
      {
        id: 'lijst',
        heading: 'De lijst van Denk Vooruit',
        paragraphs: ['Dit zijn de twaalf onderdelen zoals ze op 18 november 2026 op denkvooruit.nl staan.{dv} In de tweede kolom staat wat de overheid er verder over zegt.'],
        table: {
          head: ['Onderdeel', 'Goed om te weten'],
          rows: [
            ['Flessen water', '3 liter per persoon per dag.{dv} Voor 72 uur is dat 9 liter per persoon.{rk} Voor een huisdier reken je op 50 milliliter per kilo lichaamsgewicht per dag.{faq} <a href="/nl/tools/water-calculator/">Reken het uit</a>.'],
            ['Eten dat lang houdbaar is', 'Zoals noten, groente in blik en gedroogd fruit.{dv} Kies eten dat je niet hoeft te verwarmen.{vc}'],
            ['Radio op batterijen en mobiel met powerbank', 'De overheid raadt een radio aan die FM en/of DAB kan ontvangen.{faq} Een opwindbare radio kan ook.{rijk} <a href="/nl/rampenzender/">Zoek je rampenzender op</a>.'],
            ['Zaklamp met extra batterijen, kaarsen en lucifers', 'Het Rode Kruis noemt waterdicht verpakte lucifers.{rk}'],
            ['EHBO-doos met gebruiksaanwijzing', '<a href="/nl/gidsen/ehbo-kit/">Wat er in een EHBO-kit hoort</a>.'],
            ['Dekens om warm te blijven', 'Bij een stroomstoring werkt de cv-installatie niet meer.{dv-stroom}'],
            ['Fluitje', 'Om hulpdiensten te laten weten waar je bent.{dv}'],
            ['Contant geld', '€ 70 per volwassene en € 30 per kind, in verschillende biljetten en munten.{faq}{rijk} <a href="/nl/gidsen/contant-geld/">Waarom juist dat bedrag?</a>'],
            ['Gereedschap: hamer, zaag en kniptang', 'Om een geblokkeerde doorgang vrij te maken.{faq}'],
            ['Desinfecterende gel, wc-papier, natte doekjes, maandverband, tandpasta en tandenborstel', '<a href="/nl/gidsen/noodtoilet/">Wc en hygiëne zonder water</a>.'],
            ['Kopieën van identiteitsbewijzen en een lijstje met belangrijke telefoonnummers', 'Een kopie is een extra manier om je te identificeren.{faq} De telefoonnummers staan ook in je <a href="/nl/noodplan-maken/">noodplan</a>.'],
            ['Reservesleutels van huis en auto', 'Leg een set bij de tas voor als je weg moet.'],
          ],
        },
      },
      {
        id: 'niet',
        heading: 'Wat er bewust niet in zit',
        paragraphs: [
          'Een gasbrander staat niet op de lijst. Volgens de overheid moet het pakket voor iedereen eenvoudig en veilig zijn, en een kooktoestel of open vuur brengt risico’s mee. Koken op een alternatief toestel mag bij stroomuitval alleen buiten, omdat de ventilatie in huis dan niet werkt.{faq} Meer daarover lees je bij <a href="/nl/gidsen/koken-zonder-stroom/">koken zonder stroom</a>.',
          'De overheid adviseert ook geen kant-en-klaar pakket of merk, en geeft geen keurmerk aan pakketten die je kunt kopen.{faq} Ze geeft ook nooit gratis noodpakketten weg.{rijk} Krijg je een bericht waarin dat wel staat, vertrouw het dan niet.',
        ],
      },
      {
        id: 'aanvullen',
        heading: 'Wat je er zelf aan toevoegt',
        paragraphs: ['Ieder huishouden is anders. De overheid noemt zelf:{dv}{faq}'],
        bullets: [
          'medicijnen die je dagelijks gebruikt;',
          'babyvoeding en luiers. Zie <a href="/nl/noodpakket-baby/">noodpakket met een baby</a>;',
          'eten, water en medicijnen voor je huisdieren. Een apart noodpakket voor huisdieren bestaat niet.{faq}',
        ],
        after: ['Het Rode Kruis voegt een opvouwbare jerrycan toe om water in op te slaan.{rk}'],
      },
      {
        id: 'tas',
        heading: 'De tas voor als je plotseling weg moet',
        paragraphs: [
          'Leg bij het noodpakket ook een tas klaar voor als je je huis uit moet. Denk aan je sleutels, je identiteitsbewijs en contant geld,{dv} een fles water en andere kleine dingen die je nodig hebt.{faq} De overheid raadt een waterdichte verpakking aan die je makkelijk meeneemt, zoals een rugzak.{dv}',
          'Het Voedingscentrum adviseert voor onderweg een paar kleine flesjes water en iets te eten in portieverpakking, zoals crackers, noten of gedroogd fruit.{vc}',
        ],
      },
      {
        id: 'bewaren',
        heading: 'Bewaren en controleren',
        paragraphs: [
          'Bewaar het pakket op een plek waar je er makkelijk bij kunt. Controleer elk half jaar of de producten nog houdbaar zijn.{dv} Een vast moment helpt: bijvoorbeeld op de eerste maandag van juni en december, als het <a href="/nl/nl-alert/">testbericht van NL-Alert</a> binnenkomt.',
          'Samen met de buren een pakket aanleggen kan, maar houd de noodzakelijke dingen in je eigen huis.{faq}',
        ],
      },
    ],
    doTitle: 'Maak de lijst passend voor jouw huishouden',
    doLead: 'De lijst hierboven is voor iedereen gelijk. Deze hulpmiddelen rekenen hem om naar jouw situatie:',
    doSteps: [
      { text: 'Vul in met hoeveel mensen en huisdieren je bent en vink af wat je al hebt.', href: '/nl/tools/noodpakket-samenstellen/', link: 'Noodpakket samenstellen' },
      { text: 'Reken uit hoeveel water je nodig hebt.', href: '/nl/tools/water-calculator/', link: 'Watercalculator' },
      { text: 'Leg je afspraken vast.', href: '/nl/noodplan-maken/', link: 'Noodplan maken' },
    ],
    cta: { label: 'Maak je gratis noodhandboek', href: '/nl/noodhandboek/' },
    faq: [
      { q: 'Wat zit er in een noodpakket volgens de overheid?', a: 'Twaalf onderdelen: water, lang houdbaar eten, een radio op batterijen en een powerbank, een zaklamp met kaarsen en lucifers, een EHBO-doos, dekens, een fluitje, contant geld, gereedschap, hygiëneproducten, kopieën van identiteitsbewijzen met een lijstje telefoonnummers, en reservesleutels.' },
      { q: 'Hoeveel water hoort er in een noodpakket?', a: 'De overheid gaat uit van 3 liter per persoon per dag. Voor 72 uur is dat 9 liter per persoon.' },
      { q: 'Hoeveel contant geld hoort erin?', a: '€ 70 per volwassene en € 30 per kind, voor de meest noodzakelijke uitgaven in de eerste 72 uur. Het bedrag is een richtlijn.' },
      { q: 'Waar kan ik een noodpakket kopen?', a: 'De overheid adviseert het pakket zelf samen te stellen en geeft geen keurmerk aan pakketten in de winkel. De meeste spullen heb je al in huis.' },
      { q: 'Hoe vaak moet ik het noodpakket controleren?', a: 'Elk half jaar, om te zien of de producten nog houdbaar zijn.' },
      { q: 'Waarom zit er gereedschap in het noodpakket?', a: 'Met een hamer, zaag en kniptang kun je een geblokkeerde doorgang vrijmaken.' },
    ],
  },
};
