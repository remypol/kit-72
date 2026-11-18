import { CHECKED, READ, labels, type Page } from './_shared';

export const noodplanMaken: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'Maak een noodplan', date: READ, url: 'https://www.denkvooruit.nl/bereid-je-voor/noodplan' },
    { id: 'plan', org: 'Denk Vooruit (Rijksoverheid)', title: 'Noodplan uitgebreid (invulformulier)', date: '17 nov. 2025', url: 'https://www.denkvooruit.nl/documenten/2025/11/17/noodplan-uitgebreid' },
    { id: 'kaart', org: 'Denk Vooruit (Rijksoverheid)', title: 'Noodkaart A5', date: '12 mrt. 2026', url: 'https://www.denkvooruit.nl/documenten/2026/03/12/noodkaart_a5' },
    { id: 'faq', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: noodplan', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/noodplan' },
    { id: 'rk', org: 'Rode Kruis', title: 'Goed voorbereid', date: READ, url: 'https://www.rodekruis.nl/wat-doen-wij/hulp-in-nederland/goed-voorbereid/' },
    { id: 'rk-plan', org: 'Rode Kruis', title: 'Persoonlijk noodplan (invulformulier)', date: 'jan. 2026', url: 'https://www.rodekruis.nl/wp-content/uploads/2026/01/Goed-Voorbereid-Persoonlijk-Noodplan-Rode-Kruis.pdf' },
    { id: 'rk-stroom', org: 'Rode Kruis', title: 'Wat te doen bij stroomuitval', date: READ, url: 'https://www.rodekruis.nl/wat-doen-wij/hulp-in-nederland/goed-voorbereid/wat-te-doen-bij-stroomuitval/' },
    { id: 'rk-water', org: 'Rode Kruis', title: 'Wat moet je doen bij een overstroming', date: READ, url: 'https://www.rodekruis.nl/wat-doen-wij/hulp-in-nederland/goed-voorbereid/wat-moet-je-doen-bij-een-overstroming/' },
  ],
  content: {
    ...labels,
    title: 'Noodplan maken: wat spreek je af met je huishouden?',
    description: 'Een noodplan is één A4 met afspraken: waar je elkaar treft, wie de kinderen haalt en wie je belt. Zo vul je het in, met de formulieren van de overheid.',
    h1: 'Noodplan maken voor je huishouden',
    crumb: 'Noodplan maken',
    short: [
      'Een noodplan is een vel papier met afspraken voor als telefoon, internet of stroom uitvallen: waar je elkaar ontmoet, wie de kinderen ophaalt, wie je belt en waar het noodpakket en de belangrijke papieren liggen.{dv}{plan}',
      'De overheid heeft er een invulformulier van twee pagina’s voor, en een korte noodkaart op A5.{plan}{kaart} Vul het in met je huisgenoten, print het en geef een kopie aan je noodcontacten.{dv}{faq}',
    ],
    sections: [
      {
        id: 'vragen',
        heading: 'De acht onderdelen van het noodplan',
        paragraphs: ['Het uitgebreide noodplan van Denk Vooruit bestaat uit deze onderdelen.{plan} Loop ze samen langs.'],
        steps: [
          '<strong>Wie woont hier?</strong> Naam, mobiel nummer en geboortejaar van iedereen in huis, en van elk huisdier de naam, de soort en wat iemand erover moet weten.',
          '<strong>Wie heeft extra hulp nodig?</strong> Denk aan iemand met een beperking, ouderen, kleine kinderen of iemand die bijzondere medicijnen gebruikt. Schrijf ook op wie in je omgeving kan helpen: buren, vrienden en familie hebben elk andere vaardigheden en spullen.',
          '<strong>Onze woning.</strong> Waar liggen het noodpakket en de belangrijke documenten? En hoe kom je het huis uit als de gewone weg niet kan?',
          '<strong>Waar ontmoeten we elkaar?</strong> Een afgesproken plek, met het adres erbij.',
          '<strong>Hoe krijgen we informatie?</strong> De radiofrequentie van de rampenzender, het kanaal van de regionale omroep op tv, de website van de veiligheidsregio, en hoe jullie elkaar op de hoogte houden.',
          '<strong>Noodcontacten.</strong> Eén persoon in de buurt bij wie je terechtkunt, en één persoon met wie iedereen contact opneemt als jullie elkaar niet kunnen bereiken.',
          '<strong>Belangrijke telefoonnummers.</strong> Voorgedrukt staan 112, de politie zonder spoed (0900-8844), de Rijksoverheid (1400) en je gemeente (14 plus het netnummer). Zelf vul je de nummers in van onder meer huisarts, huisartsenpost, school, opvang, werk, verzekering en de bedrijven voor water, gas, stroom en internet.',
          '<strong>Belangrijke afspraken.</strong> Bijvoorbeeld: je bent op je werk en je telefoon doet het niet. Wie haalt de kinderen van school?{dv}',
        ],
      },
      {
        id: 'ontmoetingsplek',
        heading: 'Eén ontmoetingsplek of twee?',
        paragraphs: [
          'Het formulier van de overheid vraagt om één ontmoetingsplek.{plan} Het Rode Kruis raadt er twee aan: een plek dicht bij huis, en een plek buiten je wijk voor het geval de hele buurt weg moet.{rk-plan} Dat tweede is weinig extra werk en het lost het geval op waarin je de wijk niet meer in mag.',
        ],
      },
      {
        id: 'papier',
        heading: 'Wat zet je er op papier bij?',
        paragraphs: ['Het Rode Kruis noemt in zijn noodplan een aantal dingen om op papier te hebben:{rk-plan}'],
        bullets: [
          'een kopie van je paspoort of identiteitskaart;',
          'een overzicht van je medicijnen, en medische bijzonderheden zoals allergieën;',
          'je bankrekeningnummer en de gegevens van je zorg-, inboedel- en aansprakelijkheidsverzekering;',
          'klantnummers en telefoonnummers van de bedrijven voor stroom, gas, water, internet en telefoon;',
          'de nummers van huisarts, huisartsenpost, dierenarts, wijkagent en gemeente.',
        ],
        after: [
          'Het uitzetten van gas, water en stroom staat in geen van beide formulieren. Het Rode Kruis adviseert wel te weten waar de hoofdkraan zit en hoe je die dichtdraait,{rk-stroom} en bij een overstroming gas, water en elektriciteit af te sluiten voordat het water binnenkomt, als dat veilig kan.{rk-water} Schrijf dus ook op waar bij jou de hoofdkraan en de hoofdschakelaar zitten.',
        ],
      },
      {
        id: 'bewaren',
        heading: 'Waar bewaar je het noodplan?',
        paragraphs: [
          'Op papier, zodat je erbij kunt als de stroom of het internet uitvalt.{faq} Leg het bijvoorbeeld bij het noodpakket, in de meterkast of de gangkast, of hang het op de koelkast.{dv} Maak een foto of kopie en geef die aan de noodcontacten die je hebt ingevuld.{dv}',
          'Werk het plan bij als er iets verandert: een nieuw telefoonnummer, een andere school, een nieuwe buur.{plan} Heb je geen printer, vraag het dan aan familie of buren, of ga naar een copyshop of de bibliotheek.{faq}',
        ],
      },
      {
        id: 'kinderen',
        heading: 'Hoe betrek je kinderen erbij?',
        paragraphs: [
          'Houd het eenvoudig, leg de nadruk op voorbereiden en oefen het spelenderwijs.{faq} Loop bijvoorbeeld samen naar de ontmoetingsplek en laat ze zelf het noodpakket aanwijzen.',
        ],
      },
    ],
    doTitle: 'In vier stappen klaar',
    doLead: 'Wat je per adres moet opzoeken, hebben wij al voor je uitgezocht:',
    doSteps: [
      { text: 'Vraag je gratis noodhandboek aan. Daarin staan de rampenzender, de veiligheidsregio en de spoedeisende hulp voor jouw adres al ingevuld.', href: '/nl/noodhandboek/', link: 'Noodhandboek aanvragen' },
      { text: 'Download het invulformulier van Denk Vooruit en vul het in met je huisgenoten.', href: 'https://www.denkvooruit.nl/documenten/2025/11/17/noodplan-uitgebreid', link: 'Noodplan uitgebreid (denkvooruit.nl)' },
      { text: 'Print beide en leg ze bij je noodpakket.', href: '/nl/noodpakket-checklist/', link: 'Checklist noodpakket' },
      { text: 'Geef een kopie aan je twee noodcontacten.' },
    ],
    cta: { label: 'Maak je gratis noodhandboek', href: '/nl/noodhandboek/' },
    faq: [
      { q: 'Wat staat er in een noodplan?', a: 'Duidelijke afspraken met de mensen om je heen: wie er in huis woont, wie extra hulp nodig heeft, waar het noodpakket ligt, waar je elkaar ontmoet, hoe je aan informatie komt, wie je noodcontacten zijn en welke telefoonnummers je nodig hebt.' },
      { q: 'Bestaat er een officieel formulier voor een noodplan?', a: 'Ja. Denk Vooruit, de campagne van de Rijksoverheid, heeft een uitgebreid noodplan van twee pagina’s en een noodkaart op A5. Het Rode Kruis heeft een eigen persoonlijk noodplan.' },
      { q: 'Hoe houd ik contact als telefoon en internet uitvallen?', a: 'Door vooraf een ontmoetingsplek af te spreken en het adres op te schrijven. Spreek ook één persoon af met wie iedereen contact zoekt als jullie elkaar niet kunnen bereiken.' },
      { q: 'Waarom moet het noodplan op papier?', a: 'Omdat je er bij een stroomstoring of zonder internet anders niet bij kunt.' },
      { q: 'Kan ik een noodplan alleen maken?', a: 'Ja, maar bespreek het wel met anderen, zoals buren of familie, zodat zij weten wat je hebt afgesproken en wat je van hen verwacht.' },
    ],
  },
};
