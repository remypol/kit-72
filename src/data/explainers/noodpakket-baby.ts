import { CHECKED, READ, labels, type Page } from './_shared';

export const noodpakketBaby: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'vc', org: 'Voedingscentrum', title: 'Moet ik een noodpakket met eten en drinken in huis hebben?', date: READ, url: 'https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/boodschappen-doen/moet-ik-een-noodpakket-met-eten-en-drinken-in-huis-hebben.aspx' },
    { id: 'fles', org: 'Voedingscentrum', title: 'Hoe maak ik de fles klaar?', date: READ, url: 'https://www.voedingscentrum.nl/nl/zwanger-en-kind/borstvoeding-en-flesvoeding/flesvoeding-geven/hoe-maak-ik-de-fles-klaar-.aspx' },
    { id: 'borst', org: 'Voedingscentrum', title: 'Borstvoeding bewaren', date: READ, url: 'https://www.voedingscentrum.nl/nl/zwanger-en-kind/borstvoeding-en-flesvoeding/borstvoeding-geven/borstvoeding-bewaren.aspx' },
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: noodpakket', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/noodpakket' },
    { id: 'zorg', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: zorg', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/zorg' },
    { id: 'school', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: onderwijs', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/onderwijs' },
    { id: 'sirene', org: 'Denk Vooruit (Rijksoverheid)', title: 'De sirene', date: READ, url: 'https://www.denkvooruit.nl/bereid-je-voor/zo-krijg-je-een-waarschuwing/de-sirene' },
    { id: 'ggd', org: 'GGD Leefomgeving', title: 'Kleine kinderen en hitte', date: READ, url: 'https://ggdleefomgeving.nl/zomer-en-hitte/kleine-kinderen-en-hitte/' },
  ],
  content: {
    ...labels,
    title: 'Noodpakket met een baby: wat komt erbij?',
    description: 'Flesvoeding, het juiste flessenwater, luiers en medicijnen: wat het Voedingscentrum en de overheid adviseren voor 72 uur met een baby.',
    h1: 'Noodpakket met een baby of peuter',
    crumb: 'Noodpakket met baby',
    image: { src: '/images/shared/baby-kit.webp', alt: 'Babyfles met melk, een blik flesvoeding met maatschepje, een fles water, een thermosfles, luiers, hydrofiele doeken en een geel mutsje' },
    short: [
      'Met een baby komt er bij het gewone noodpakket vooral voeding bij. Geef je flesvoeding, zorg dan voor genoeg pakken zuigelingenvoeding of opvolgmelk en genoeg flessen water.{vc} Kies bij voorkeur mineraalwater waarop staat dat het geschikt is voor het maken van flesvoeding.{vc}',
      'Daarnaast noemt de overheid luiers en medicijnen als dingen die je zelf aan het pakket toevoegt.{dv} Hoeveel luiers of hoeveel voeding je moet neerleggen, zegt geen officiële bron; reken zelf uit wat je kind in drie dagen gebruikt.',
    ],
    sections: [
      {
        id: 'flesvoeding',
        heading: 'Flesvoeding en water',
        paragraphs: [
          'Het Voedingscentrum adviseert voldoende zuigelingenvoeding (voor baby’s van 0 tot 6 maanden) of opvolgmelk (tot 12 maanden) op voorraad te hebben, met voldoende flessen water.{vc}',
          'Niet al het mineraalwater is even geschikt voor de fles. Kies water waarop staat dat het geschikt is voor het maken van flesvoeding: daar zitten lage hoeveelheden nitraat, nitriet, natrium en fluor in.{fles}{vc}',
          'Kraanwater hoef je in Nederland normaal niet te koken voor de fles.{fles} Is het kraanwater niet te drinken, kook het dan of gebruik geschikt mineraalwater.{fles} Gebruik geen water uit een eigen bron; daar kan te veel nitraat in zitten.{fles}',
          'Maak de fles niet warmer dan 30 tot 35 graden.{fles} Hoe je een fles opwarmt als de stroom is uitgevallen, daarover vonden we geen officieel advies. Voor onderweg noemt het Voedingscentrum een thermosfles met gekookt water.{fles}',
        ],
      },
      {
        id: 'bewaren',
        heading: 'Klaargemaakte flessen bewaren zonder koelkast',
        paragraphs: [
          'Klaargemaakte flesvoeding moet in de koelkast en blijft daar hooguit 8 uur goed. Restjes gooi je weg.{fles} Neem daarom nooit een klaargemaakte fles mee; neem gekookt water mee in een thermosfles en maak de fles ter plekke.{fles}',
          'Voor een stroomstoring betekent dat: maak elke fles vers en bewaar niets. Een officiële regel voor klaargemaakte flessen in een koelkast die uit staat, vonden we niet. Voor gewoon eten zegt het Voedingscentrum dat een gesloten koelkast het ongeveer 4 uur veilig koel houdt.{vc}',
        ],
      },
      {
        id: 'borstvoeding',
        heading: 'Borstvoeding en afgekolfde melk',
        paragraphs: [
          'Afgekolfde moedermelk kun je zeker 4 uur buiten de koelkast bewaren. Is het binnen 27 graden of warmer, houd dan 4 uur als grens aan.{borst} In een werkende koelkast blijft moedermelk zeker 4 dagen goed.{borst}',
          'Melk die buiten de koelkast is ontdooid, gebruik je binnen 2 uur. Vries ontdooide melk niet opnieuw in.{borst} Valt de stroom lang uit en heb je een voorraad in de vriezer, houd de vriezer dan dicht en gebruik wat ontdooit binnen 2 uur.',
          'Apart advies over borstvoeding in een noodsituatie vonden we niet bij de overheid, het Voedingscentrum of het Rode Kruis.',
        ],
      },
      {
        id: 'eten',
        heading: 'Vanaf de eerste hapjes',
        paragraphs: [
          'Een baby die al hapjes eet, kun je alle gezonde dingen geven die je zelf eet.{vc} Leg dus houdbaar eten neer dat je kind kent en zonder verwarmen kan eten.',
        ],
      },
      {
        id: 'luiers',
        heading: 'Luiers, verzorging en medicijnen',
        paragraphs: [
          'De overheid noemt luiers en babyvoeding als voorbeelden van wat je zelf toevoegt, zonder aantallen.{dv} Tel hoeveel luiers je kind per dag gebruikt en leg voor drie dagen neer, met billendoekjes en afvalzakjes. In het gewone pakket zitten al desinfecterende gel en natte doekjes.',
          'Gebruikt je kind medicijnen, vraag ze dan ruim voordat ze op zijn aan bij de apotheek.{zorg}',
        ],
      },
      {
        id: 'warm-koel',
        heading: 'Warm en koel houden',
        paragraphs: [
          'Bij hitte: trek je kind luchtige kleding aan, bied extra borst- of flesvoeding aan en houd een baby tot 1 jaar helemaal uit de zon. Geef een baby tot 6 maanden geen water.{ggd} Heeft je kind 12 uur of langer geen natte luier gehad, dan kan dat op uitdroging wijzen.{ggd}',
          'Voor het warm houden van een baby als de verwarming uitvalt, vonden we geen officieel advies. Het gewone pakket bevat dekens; leg er warme kleding en een muts in de maat van nu bij, en ruil die om als je kind groeit.',
        ],
      },
      {
        id: 'opvang',
        heading: 'Als je kind op de opvang is',
        paragraphs: [
          'Gaat de sirene, dan blijven kinderen op school of op de opvang; de begeleiders helpen ze.{sirene} Bij uitval van stroom of water is het doel de kinderopvang zoveel mogelijk open te houden.{school} Zet in je <a href="/nl/noodplan-maken/">noodplan</a> wie je kind ophaalt als jij er niet bij kunt.',
        ],
      },
    ],
    doTitle: 'Leg dit bij je noodpakket',
    doLead: 'Voor 72 uur met een baby:',
    doSteps: [
      { text: 'Zuigelingenvoeding of opvolgmelk voor drie dagen, en flessen water die geschikt zijn voor flesvoeding.' },
      { text: 'Schone flessen en spenen, en een thermosfles.' },
      { text: 'Luiers, billendoekjes en afvalzakjes voor drie dagen.' },
      { text: 'Medicijnen van je kind en het nummer van huisarts en huisartsenpost.', href: '/nl/noodplan-maken/', link: 'Zet ze in je noodplan' },
      { text: 'Warme kleding, een muts en een extra deken.' },
    ],
    cta: { label: 'Bekijk de hele checklist', href: '/nl/noodpakket-checklist/' },
    faq: [
      { q: 'Welk flessenwater is geschikt voor flesvoeding?', a: 'Mineraalwater waarop staat dat het geschikt is voor het maken van flesvoeding. Daarin zitten lage hoeveelheden nitraat, nitriet, natrium en fluor. Niet al het mineraalwater is geschikt.' },
      { q: 'Moet ik water koken voor de fles?', a: 'Kraanwater in Nederland hoef je normaal niet te koken. Is het kraanwater niet te drinken, kook het dan of gebruik geschikt mineraalwater.' },
      { q: 'Hoe lang kan een klaargemaakte fles bewaard worden?', a: 'Hooguit 8 uur, in de koelkast. Zonder werkende koelkast maak je elke fles vers. Wat na het drinken over is, gooi je weg.' },
      { q: 'Hoe lang is afgekolfde melk houdbaar zonder koelkast?', a: 'Zeker 4 uur. Bij 27 graden of warmer houd je 4 uur als grens aan.' },
      { q: 'Hoeveel luiers moet ik in huis hebben?', a: 'Daar bestaat geen officieel getal voor. Tel wat je kind per dag gebruikt en leg voor drie dagen neer.' },
    ],
  },
};
