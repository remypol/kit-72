import { CHECKED, READ, labels, type Page } from './_shared';

export const extremeKou: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'dv-stroom', org: 'Denk Vooruit (Rijksoverheid)', title: 'Geen stroom', date: READ, url: 'https://www.denkvooruit.nl/risicos/risicos-in-nederland/geen-stroom' },
    { id: 'dv-weer', org: 'Denk Vooruit (Rijksoverheid)', title: 'Extreem weer', date: READ, url: 'https://www.denkvooruit.nl/risicos/risicos-in-nederland/extreem-weer' },
    { id: 'dv-faq', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: noodpakket', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/noodpakket' },
    { id: 'knmi-kou', org: 'KNMI', title: 'Waarschuwingen voor kou', date: READ, url: 'https://www.knmi.nl/kennis-en-datacentrum/waarschuwingen/kou' },
    { id: 'knmi-golf', org: 'KNMI', title: 'Koudegolf', date: READ, url: 'https://www.knmi.nl/kennis-en-datacentrum/uitleg/koudegolf' },
    { id: 'knmi-codes', org: 'KNMI', title: 'KNMI-waarschuwingen', date: READ, url: 'https://www.knmi.nl/kennis-en-datacentrum/uitleg/knmi-waarschuwingen' },
    { id: 'knmi-sneeuw', org: 'KNMI', title: 'Waarschuwingen voor sneeuw en gladheid', date: READ, url: 'https://www.knmi.nl/kennis-en-datacentrum/waarschuwingen/sneeuw-en-gladheid' },
    { id: 'rivm', org: 'RIVM', title: 'GGD-richtlijn medische milieukunde: gezondheidsrisico’s van winterse omstandigheden', date: '2009', url: 'https://www.rivm.nl/bibliotheek/rapporten/609330009.html' },
    { id: 'rk-onder', org: 'Rode Kruis', title: 'EHBO bij onderkoeling', date: READ, url: 'https://www.rodekruis.nl/ehbo/ehbo-tips/onderkoeling/' },
    { id: 'rk-stroom', org: 'Rode Kruis', title: 'Wat te doen bij stroomuitval', date: READ, url: 'https://www.rodekruis.nl/wat-doen-wij/hulp-in-nederland/goed-voorbereid/wat-te-doen-bij-stroomuitval/' },
    { id: 'liander', org: 'Liander', title: 'Tips bij storingen', date: READ, url: 'https://www.liander.nl/storingen-en-onderhoud/tips-bij-storingen-en-werkzaamheden/tips-bij-storingen' },
    { id: 'stedin', org: 'Stedin', title: 'Tips tijdens een storing', date: READ, url: 'https://www.stedin.net/storing-en-onderhoud/tips-tijdens-een-storing' },
    { id: 'co', org: 'Brandweer Nederland', title: 'Koolmonoxide', date: READ, url: 'https://www.brandweer.nl/brandveiligheid/koolmonoxide' },
    { id: 'nvwa', org: 'NVWA', title: 'Toestellen op gasflessen', date: READ, url: 'https://www.nvwa.nl/onderwerpen/productveiligheid/gastoestellen/toestellen-op-gasflessen' },
    { id: 'pwn', org: 'PWN', title: 'Vorst', date: READ, url: 'https://www.pwn.nl/drinkwater/vorst' },
    { id: 'dunea', org: 'Dunea', title: 'Voorkom schade bij vorst', date: '24 nov. 2025', url: 'https://www.dunea.nl/algemeen/nieuws/2025/voorkom-schade-bij-vorst' },
    { id: 'wmd', org: 'WMD', title: 'Hoe maak ik de waterleiding winterklaar?', date: READ, url: 'https://wmd.nl/klantenservice/veelgestelde-vragen/hoe-maak-ik-de-waterleiding-winterklaar/' },
  ],
  content: {
    ...labels,
    title: 'Extreme kou: warm blijven zonder verwarming of stroom',
    description: 'Valt de verwarming uit bij vorst? Ramen en deuren dicht, in de kleinste kamer zitten en binnen geen vuur maken. Met de KNMI-codes en hulp bij onderkoeling.',
    h1: 'Extreme kou: warm blijven als de verwarming uitvalt',
    crumbParent: { label: "Scenario's", href: '/nl/scenario/' },
    crumb: 'Extreme kou',
    image: { src: '/images/shared/power-outage.webp', alt: 'Brandende kaars, lucifers, een brandende zaklamp, een radio en een thermosfles' },
    short: [
      'Bij een stroomstoring werkt de cv-installatie niet meer.{dv-stroom} Is het koud, houd dan ramen en deuren dicht zodat de warmte binnenblijft, en verwarm en bewoon vooral de kleinste ruimten in huis.{dv-stroom}',
      'Maak binnen geen vuur om warm te blijven:{rk-stroom} een barbecue, gasbrander of ander open vuur hoort bij stroomuitval buiten, omdat de ventilatie in huis dan niet werkt.{dv-faq} Trek warme kleding aan en gebruik de dekens uit je noodpakket.',
    ],
    sections: [
      {
        id: 'warm',
        heading: 'Warm blijven in huis',
        paragraphs: ['Dit adviseren de overheid, de netbeheerders en het RIVM:'],
        bullets: [
          'Houd ramen en deuren gesloten en bewoon de kleinste ruimte.{dv-stroom} Doe ook de gordijnen dicht.{stedin}',
          'Draag genoeg kleding, buiten en binnen.{rivm}',
          'Blijf in beweging, maar vermijd als oudere of chronisch zieke zware inspanning.{rivm}',
          'Beperk alcohol. Alcohol verwijdt de bloedvaten in de huid en maakt dat je de kou minder goed opmerkt.{rivm}',
          'Zorg voor voldoende eten en medicijnen in huis, zodat je de deur niet uit hoeft.{rivm}',
        ],
        after: [
          'Ook stadsverwarming kan bij een stroomstoring uitvallen.{liander}{stedin}',
        ],
      },
      {
        id: 'co',
        heading: 'Waarom geen vuur of gasbrander binnen?',
        paragraphs: [
          'Vanwege koolmonoxide, een gas dat je niet ziet en niet ruikt.{co} De NVWA waarschuwt een kooktoestel nooit als verwarming te gebruiken, bijvoorbeeld door er een omgekeerde bloempot op te zetten: daarbij kan koolmonoxide ontstaan.{nvwa}',
          'De eerste klachten lijken op griep: lichte hoofdpijn, misselijkheid, overgeven en vermoeidheid. Vermoed je koolmonoxide, ga naar buiten en bel 112.{co}',
        ],
      },
      {
        id: 'kwetsbaar',
        heading: 'Wie loopt het meeste risico?',
        paragraphs: [
          'Het RIVM noemt buitenslapers, 65-plussers, chronisch zieken (vooral met hart- en vaatziekten en longaandoeningen) en kinderen.{rivm} Ga bij kou langs bij buren die hulp nodig kunnen hebben.{dv-stroom}',
        ],
      },
      {
        id: 'onderkoeling',
        heading: 'Onderkoeling herkennen en wat je doet',
        paragraphs: [
          'Van onderkoeling is sprake als de lichaamstemperatuur onder de 35 graden zakt. Het lichaam probeert eerst zelf warmte te maken door sneller te ademen en te rillen.{rk-onder} Het Rode Kruis geeft deze stappen:{rk-onder}',
        ],
        steps: [
          'Bel 112, of laat bellen, als de persoon suf is of wordt.',
          'Breng de persoon voorzichtig naar een warmere plek.',
          'Verwijder natte kleding, of knip die weg.',
          'Pak de persoon in met dekens of een reddingsdeken.',
          'Geef niets te eten of te drinken als de persoon suf is.',
        ],
      },
      {
        id: 'codes',
        heading: 'Wanneer waarschuwt het KNMI?',
        paragraphs: [
          'Voor kou kijkt het KNMI naar de gevoelstemperatuur. De richtlijnen voor code oranje en code rood zijn gelijk; welke code het wordt, hangt af van de verwachte gevolgen.{knmi-codes}',
        ],
        table: {
          head: ['Code', 'Kou', 'Sneeuw'],
          rows: [
            ['Geel', 'Gevoelstemperatuur vanaf −15 °C{knmi-kou}', 'Tot 3 cm in een uur{knmi-codes}'],
            ['Oranje of rood', 'Gevoelstemperatuur vanaf −20 °C{knmi-kou}', 'Vanaf 3 cm in een uur of vanaf 5 cm in 6 uur{knmi-codes}'],
          ],
        },
        after: [
          'Bij code oranje voor kou waarschuwt het KNMI dat blote huid kan bevriezen als je een paar uur onbeschermd buiten bent. Bij code rood is het advies: blijf binnen.{knmi-kou} Bij code rood voor sneeuw: ga niet op reis, de kans is groot dat je onderweg vast komt te zitten.{knmi-sneeuw}',
          'Zo koud wordt het zelden. Een koudegolf is volgens het KNMI een aaneengesloten periode van minstens vijf ijsdagen in De Bilt, waarvan drie met strenge vorst. De laatste was van 30 januari tot en met 8 februari 2012.{knmi-golf}',
        ],
      },
      {
        id: 'leidingen',
        heading: 'Bevroren waterleiding voorkomen',
        paragraphs: ['De waterbedrijven adviseren bij vorst:'],
        bullets: [
          'Pak de watermeter in, bijvoorbeeld met een deken of kranten. Zit de gasmeter in dezelfde ruimte, isoleer dan alleen de watermeter en de leidingen en blijf ventileren.{pwn}',
          'Sluit buitenkranen en leidingen in onverwarmde ruimtes af en tap ze af.{dunea}',
          'Zet de verwarming niet helemaal uit als je weg bent. Welke temperatuur de waterbedrijven noemen, verschilt: van 10 tot 15 graden.{dunea}{pwn}',
          'Is een leiding toch bevroren: ontdooi haar geleidelijk, bijvoorbeeld met een föhn, en alleen als de leiding niet gescheurd is. Is ze gescheurd, draai dan de hoofdkraan dicht en bel een loodgieter.{pwn}{wmd}',
        ],
        after: ['Weet waar de hoofdkraan zit en hoe je die dichtdraait.{rk-stroom}'],
      },
      {
        id: 'onderweg',
        heading: 'Onderweg bij sneeuw en ijzel',
        paragraphs: [
          'Ga bij code rood alleen naar buiten als het echt nodig is. Moet je toch weg, neem dan genoeg eten en drinken, een deken, extra kleding en een telefoon met oplader mee, en laat iemand weten waar je heen gaat en via welke route.{dv-weer} De overheid raadt aan altijd een deken, een warme jas en een fles water in de auto te hebben.{dv-weer}',
        ],
      },
    ],
    doTitle: 'Leg dit klaar voor de winter',
    doLead: 'De meeste dingen heb je al:',
    doSteps: [
      { text: 'Dekens en warme kleding voor iedereen in huis, op één plek.', href: '/nl/noodpakket-checklist/', link: 'Checklist noodpakket' },
      { text: 'Een koolmonoxidemelder op batterijen.' },
      { text: 'Eten dat je niet hoeft te verwarmen, en een thermosfles.', href: '/nl/gidsen/koken-zonder-stroom/', link: 'Koken zonder stroom' },
      { text: 'Een radio die zonder stopcontact werkt, afgestemd op je rampenzender.', href: '/nl/rampenzender/', link: 'Rampenzender per gemeente' },
      { text: 'Een deken, een jas en een fles water in de auto.' },
    ],
    cta: { label: 'Maak je gratis noodhandboek', href: '/nl/noodhandboek/' },
    related: {
      title: 'Verder lezen',
      links: [
        { label: 'Stroomstoring: wat doe je en hoe bereid je je voor?', href: '/nl/scenario/stroomstoring/' },
        { label: 'Werken zonnepanelen en een thuisbatterij bij stroomuitval?', href: '/nl/gidsen/zonnepanelen-thuisbatterij-stroomuitval/' },
      ],
    },
    faq: [
      { q: 'Werkt de cv-ketel bij een stroomstoring?', a: 'Nee, meestal niet. De ketel heeft stroom nodig, dus je hebt dan geen verwarming en geen warm water. Ook stadsverwarming kan uitvallen.' },
      { q: 'Hoe blijf ik warm zonder verwarming?', a: 'Houd ramen, deuren en gordijnen dicht, ga met iedereen in de kleinste kamer zitten, trek warme kleding aan en gebruik dekens. Maak binnen geen vuur.' },
      { q: 'Mag ik een gasbrander of barbecue gebruiken om het huis te verwarmen?', a: 'Nee. Daarbij kan koolmonoxide ontstaan, en bij stroomuitval werkt de ventilatie in huis niet. Open vuur en kooktoestellen gebruik je dan alleen buiten.' },
      { q: 'Wanneer geeft het KNMI code rood voor kou?', a: 'De richtlijn voor code oranje en rood is een gevoelstemperatuur vanaf −20 °C. Welke van de twee het wordt, hangt af van de verwachte gevolgen.' },
      { q: 'Wat is een koudegolf?', a: 'Volgens het KNMI een aaneengesloten periode van minstens vijf ijsdagen in De Bilt, waarvan drie dagen met strenge vorst. De laatste was in 2012.' },
      { q: 'Wat doe je bij onderkoeling?', a: 'Bel 112 als iemand suf is of wordt. Breng de persoon voorzichtig naar een warmere plek, haal natte kleding weg en pak hem in met dekens. Geef niets te eten of te drinken bij sufheid.' },
    ],
  },
};
