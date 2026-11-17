/**
 * "Can AI cause a power outage?" explainer, in three languages.
 *
 * Every figure below was read at its source on CHECKED (research log in
 * docs/LOG.md). Rules for editing:
 *   - a claim needs a source in SOURCES and a {id} reference in the text
 *   - if a source does not say something, the text says so; do not infer
 *   - re-check before changing CHECKED
 * Deliberately left out because they could not be verified at the source:
 * TenneT's supply-security figures (a correction was reported), the number of
 * grid-access requests in Spain, and reports of flickering lights in 2026.
 */
import type { Explainer, Source } from '../components/growth/ExplainerPage.astro';
import type { Locale } from './hreflang-map';

export const CHECKED = '2026-11-17';
export const PUBLISHED = '2026-11-17';

export const SOURCES: Source[] = [
  { id: 'iea', org: 'International Energy Agency', title: 'Energy and AI, executive summary', date: '2025', url: 'https://www.iea.org/reports/energy-and-ai/executive-summary' },
  { id: 'iea-eu', org: 'International Energy Agency', title: "Overcoming energy constraints is key to delivering on Europe's data centre goals", date: '16 Nov 2025', url: 'https://iea.org/commentaries/overcoming-energy-constraints-is-key-to-delivering-on-europe-s-data-centre-goals' },
  { id: 'cbs', org: 'CBS', title: 'Datacenters verbruiken 4,6 procent van de elektriciteit', date: '15 Dec 2025', url: 'https://www.cbs.nl/nl-nl/nieuws/2025/51/datacenters-verbruiken-4-6-procent-van-de-elektriciteit' },
  { id: 'rijk', org: 'Rijksoverheid', title: 'Overheid start nieuwe campagne: oproep om tussen 16.00 en 21.00 minder stroom te gebruiken', date: '28 Apr 2025', url: 'https://www.rijksoverheid.nl/actueel/nieuws/2025/04/28/overheid-start-nieuwe-campagne-oproep-om-tussen-16.00-en-21.00-minder-stroom-te-gebruiken' },
  { id: 'bitkom', org: 'Bitkom', title: 'Rechenzentren in Deutschland: KI treibt Wachstum', date: '10 Nov 2025', url: 'https://www.bitkom.org/Presse/Presseinformation/Rechenzentren-Deutschland-KI-treibt-Wachstum' },
  { id: 'vdi', org: 'ingenieur.de (VDI Verlag)', title: 'Zu wenig Strom für KI: wie Deutschland jetzt Anschlüsse für Rechenzentren verteilt', date: '8 Oct 2026', url: 'https://www.ingenieur.de/technik/fachbereiche/kuenstliche-intelligenz/zu-wenig-strom-fur-ki-wie-deutschland-jetzt-anschlusse-fur-rechenzentren-verteilt/' },
  { id: 'miteco-dc', org: 'MITECO', title: 'El Gobierno plantea impulsar los centros de datos sostenibles', date: '27 Aug 2026', url: 'https://www.miteco.gob.es/es/prensa/ultimas-noticias/2026/agosto/-el-gobierno-plantea-impulsar-los-centros-de-datos-sostenibles--.html' },
  { id: 'cso', org: 'Central Statistics Office (Ireland)', title: 'Data Centres Metered Electricity Consumption 2024', date: '10 Jun 2025', url: 'https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2024/keyfindings/' },
  { id: 'cru', org: 'Commission for Regulation of Utilities (Ireland)', title: 'New electricity connection policy for data centres', date: '18 Feb 2025', url: 'https://cru.ie/about-us/news/new-electricity-connection-policy-for-data-centre' },
  { id: 'nerc', org: 'NERC', title: 'Incident Review: Considering Simultaneous Voltage-Sensitive Load Reductions', date: 'Jan 2025', url: 'https://nerc.com/pa/rrm/ea/Documents/Incident_Review_Large_Load_Loss.pdf' },
  { id: 'pjm', org: 'PJM', title: 'PJM, Dominion review large load transfer event', date: '11 Aug 2026', url: 'https://insidelines.pjm.com/pjm-dominion-review-large-load-transfer-event/' },
  { id: 'nerc-alert', org: 'NERC', title: 'Level 3 Alert: computational load', date: '4 May 2026', url: 'https://www.nerc.com/globalassets/programs/bpsa/alerts/level-3-computational-load-alert.pdf' },
  { id: 'miteco', org: 'MITECO', title: 'Se presenta el informe del Comité de análisis de la crisis eléctrica', date: '17 Jun 2025', url: 'https://www.miteco.gob.es/es/prensa/ultimas-noticias/2025/junio/se-presenta-el-informe-del-comite-de-analisis-de-la-crisis-elect.html' },
  { id: 'entsoe', org: 'ENTSO-E', title: '28 April 2025 Iberian blackout: expert panel reports', date: '20 Mar 2026', url: 'https://www.entsoe.eu/publications/blackout/28-april-2025-iberian-blackout/' },
  { id: 'cisa', org: 'CISA', title: 'Cyber-Attack Against Ukrainian Critical Infrastructure (IR-ALERT-H-16-056-01)', date: '2016', url: 'https://cisa.gov/news-events/ics-alerts/ir-alert-h-16-056-01' },
  { id: 'eset', org: 'ESET', title: 'Industroyer: biggest threat to industrial control systems since Stuxnet', date: '12 Jun 2017', url: 'https://www.welivesecurity.com/2017/06/12/industroyer-biggest-threat-industrial-control-systems-since-stuxnet/' },
  { id: 'mandiant', org: 'Mandiant (Google Cloud)', title: 'Sandworm disrupts power in Ukraine using a novel attack against operational technology', date: '9 Nov 2023', url: 'https://cloud.google.com/blog/topics/threat-intelligence/sandworm-disrupts-power-ukraine-operational-technology' },
  { id: 'nctv', org: 'NCTV', title: 'Cybersecuritybeeld Nederland 2026', date: 'Nov 2026', url: 'https://www.tweedekamer.nl/downloads/document?id=2026D56215' },
  { id: 'enisa', org: 'ENISA', title: 'ENISA Threat Landscape 2026', date: '22 Sep 2026', url: 'https://www.enisa.europa.eu/node/19594' },
  { id: 'neso', org: 'National Grid ESO', title: "Former DeepMind experts' AI tool could help boost solar forecasts", date: '19 Aug 2021', url: 'https://www.neso.energy/news/former-deepmind-experts-ai-tool-could-help-boost-national-grid-esos-solar-forecasts' },
];

export const aiGrid: Record<Locale, Explainer> = {
  nl: {
    title: 'Kan AI een stroomstoring veroorzaken? Wat we weten',
    description: 'Datacenters voor AI vragen steeds meer stroom en aanvallers gebruiken AI bij cyberaanvallen. Veroorzaakt dat stroomstoringen? Wat er bekend is, met bronnen.',
    h1: 'Kan AI een stroomstoring veroorzaken?',
    crumbParent: { label: 'Gidsen', href: '/nl/gidsen/' },
    crumb: 'AI en stroomuitval',
    checkedLabel: 'Bronnen gecontroleerd op',
    shortTitle: 'Kort antwoord',
    short: [
      'Er is geen gedocumenteerd geval waarin AI, of de stroomvraag van AI-datacenters, de stroom bij huishoudens heeft laten uitvallen.',
      'AI legt wel op twee manieren druk op het stroomnet. Datacenters vragen snel meer stroom op netten die al vol zitten, en aanvallers gebruiken AI bij cyberaanvallen. Tegelijk gebruiken netbeheerders AI om het net beter te sturen.',
      'Voor je huishouden verandert de voorbereiding niet: een stroomstoring is een stroomstoring, wat de oorzaak ook is.',
    ],
    sections: [
      {
        id: 'verbruik',
        heading: 'Hoeveel stroom gebruikt AI?',
        paragraphs: [
          'Datacenters gebruikten in 2024 wereldwijd ongeveer 415 terawattuur, zo\'n 1,5 procent van alle elektriciteit. Het Internationaal Energieagentschap verwacht dat dit tegen 2030 ruwweg verdubbelt tot ongeveer 945 terawattuur, en noemt AI de belangrijkste aanjager van die groei.{iea}',
          'In Nederland ging in 2024 4,6 procent van alle elektriciteit naar datacenters, tegen 3,3 procent in 2021.{cbs} Ierland laat zien hoe ver het kan gaan: daar gebruikten datacenters in 2024 22 procent van de gemeten elektriciteit, tegen 5 procent in 2015.{cso}',
        ],
      },
      {
        id: 'net',
        heading: 'Raakt het stroomnet daardoor overbelast?',
        paragraphs: [
          'Het probleem is niet dat er te weinig stroom wordt opgewekt, maar dat het net op veel plekken vol zit. In de grote Europese datacentercentra, waaronder Amsterdam, wachten nieuwe aansluitingen gemiddeld zeven tot tien jaar.{iea-eu}',
          'De Nederlandse overheid vroeg huishoudens in 2025 om tussen 16.00 en 21.00 uur zo min mogelijk stroom te gebruiken, met de waarschuwing: "Als we niks doen neemt de kans op stroomstoringen toe."{rijk} Die oproep gaat over het volle net in het algemeen. De overheid noemt datacenters daarbij niet als oorzaak.',
          'Ierland ging het verst: de toezichthouder stelde in 2025 voor dat nieuwe datacenters zelf opwekking of opslag moeten regelen die hun vraag dekt.{cru}',
          'Het reële risico is dus geen plotselinge black-out door AI, maar een net dat op piekmomenten krapper wordt. De vraag naar stroom groeit door veel dingen tegelijk: warmtepompen, elektrische auto\'s, industrie en ook datacenters.',
        ],
      },
      {
        id: 'voorvallen',
        heading: 'Wat er wel al gebeurde: datacenters die tegelijk van het net gaan',
        paragraphs: [
          'Op 10 juli 2024 schakelde in de Verenigde Staten na een storing op een hoogspanningslijn ongeveer 1.500 megawatt aan datacenters in één keer over op eigen noodstroom. Het net kreeg daardoor plotseling te veel stroom. Spanning en frequentie liepen op en de netbeheerders moesten ingrijpen, maar het bleef binnen veilige grenzen.{nerc}',
          'Op 22 juli 2026 gebeurde hetzelfde in Noord-Virginia met ongeveer 3.800 megawatt. Volgens de netbeheerder had dat geen noemenswaardige gevolgen voor de betrouwbaarheid en was het evenwicht na negen minuten hersteld.{pjm} Bij geen van beide voorvallen zaten huishoudens zonder stroom.',
          'De Amerikaanse toezichthouder voor netbetrouwbaarheid neemt het risico wel serieus: in mei 2026 gaf hij een alert van niveau 3 uit over de risico\'s van grote rekenlasten, waaronder het trainen van AI.{nerc-alert}',
        ],
      },
      {
        id: 'iberisch',
        heading: 'En de grote stroomstoring in Spanje en Portugal?',
        paragraphs: [
          'Die had niets met AI te maken. Volgens het Spaanse onderzoek had de storing van 28 april 2025 meerdere oorzaken tegelijk, rond te hoge spanning en te weinig mogelijkheden om die te regelen. Een cyberaanval is uitgesloten.{miteco} Het Europese panel van netbeheerders kwam in 2026 tot dezelfde soort conclusie: een samenloop van factoren.{entsoe} Datacenters en AI komen in geen van beide samenvattingen voor.',
        ],
      },
      {
        id: 'cyber',
        heading: 'AI en cyberaanvallen op het stroomnet',
        paragraphs: [
          'Cyberaanvallen hebben eerder de stroom laten uitvallen: in Oekraïne in 2015 bij ongeveer 225.000 klanten{cisa}, in 2016 in een deel van Kyiv{eset} en opnieuw in 2022.{mandiant} In de bronnen over die aanvallen speelt AI geen rol.',
          'Dat verandert langzaam. De NCTV schrijft in 2026 dat aanvallers AI nu aantoonbaar inzetten bij cyberaanvallen, meestal ter ondersteuning: het maakt aanvallen sneller, grootschaliger en efficiënter.{nctv} Hetzelfde rapport beschrijft aanvallen op minstens dertig Poolse wind- en zonneparken in december 2025. De stroomproductie ging daar gewoon door.{nctv}',
          'Het Europese agentschap voor cyberveiligheid verwacht dat AI-modellen steeds vaker worden gebruikt om aanvallen te ondersteunen.{enisa} Een stroomstoring door een met AI uitgevoerde aanval is tot nu toe niet gedocumenteerd.',
        ],
      },
      {
        id: 'helpt',
        heading: 'AI helpt het net ook',
        paragraphs: [
          'Netbeheerders gebruiken dezelfde techniek om het net stabieler te maken. De Britse netbeheerder meldde dat machine learning de voorspelling van zonnestroom 33 procent nauwkeuriger maakte.{neso} Het Internationaal Energieagentschap schat dat AI-toepassingen tot 175 gigawatt aan transportcapaciteit kunnen vrijmaken.{iea}',
        ],
      },
    ],
    doTitle: 'Wat betekent dit voor je huishouden?',
    doLead: 'De oorzaak van een storing kun je niet kiezen, de voorbereiding wel. Die is steeds dezelfde:',
    doSteps: [
      { text: 'Zorg dat je 72 uur zonder stroom kunt: licht, een radio op batterijen, een opgeladen powerbank en contant geld.', href: '/nl/scenario/stroomstoring/', link: 'Lees: voorbereiden op een stroomstoring' },
      { text: 'Bij een digitale storing werken pinnen en internet niet.', href: '/nl/scenario/cyberaanval/', link: 'Lees: voorbereiden op een cyberaanval' },
      { text: 'Reken uit welke powerbank je telefoon drie dagen laadt.', href: '/nl/tools/energie-calculator/', link: 'Naar de powerbank calculator' },
    ],
    cta: { label: 'Maak mijn lijst voor 72 uur', href: '/nl/tools/noodpakket-samenstellen/' },
    sourcesTitle: 'Bronnen',
    sourcesNote: 'Alle cijfers zijn bij de bron nagelezen. Waar een bron iets niet zegt, staat dat in de tekst.',
    faqTitle: 'Veelgestelde vragen',
    faq: [
      { q: 'Heeft AI ooit een stroomstoring veroorzaakt?', a: 'Voor zover bekend niet. Er is geen gedocumenteerd geval waarin AI of de stroomvraag van AI-datacenters de stroom bij huishoudens heeft laten uitvallen. Wel zijn er voorvallen waarbij datacenters tegelijk van het net gingen en netbeheerders moesten ingrijpen.' },
      { q: 'Hoeveel stroom gebruiken datacenters in Nederland?', a: 'In 2024 ging 4,6 procent van alle elektriciteit in Nederland naar datacenters, volgens het CBS. In 2021 was dat 3,3 procent.' },
      { q: 'Kwam de stroomstoring in Spanje door AI of een cyberaanval?', a: 'Nee. Volgens het Spaanse onderzoek had de storing van 28 april 2025 meerdere oorzaken rond te hoge spanning in het net, en is een cyberaanval uitgesloten.' },
      { q: 'Moet ik me anders voorbereiden vanwege AI?', a: 'Nee. De voorbereiding op een stroomstoring is dezelfde, wat de oorzaak ook is: licht, een radio op batterijen, een opgeladen powerbank, water, eten en contant geld voor 72 uur.' },
    ],
  },

  de: {
    title: 'Kann KI einen Stromausfall verursachen? Was bekannt ist',
    description: 'Rechenzentren für KI brauchen immer mehr Strom, und Angreifer nutzen KI bei Cyberangriffen. Führt das zu Stromausfällen? Was bekannt ist, mit Quellen.',
    h1: 'Kann KI einen Stromausfall verursachen?',
    crumbParent: { label: 'Ratgeber', href: '/de/ratgeber/' },
    crumb: 'KI und Stromausfall',
    checkedLabel: 'Quellen geprüft am',
    shortTitle: 'Kurze Antwort',
    short: [
      'Es gibt keinen dokumentierten Fall, in dem KI oder der Strombedarf von KI-Rechenzentren den Strom in Haushalten hat ausfallen lassen.',
      'KI belastet das Stromnetz aber auf zwei Wegen. Rechenzentren brauchen schnell mehr Strom in Netzen, die schon ausgelastet sind, und Angreifer nutzen KI bei Cyberangriffen. Gleichzeitig setzen Netzbetreiber KI ein, um das Netz besser zu steuern.',
      'Für deinen Haushalt ändert sich an der Vorsorge nichts: Ein Stromausfall ist ein Stromausfall, egal aus welchem Grund.',
    ],
    sections: [
      {
        id: 'verbrauch',
        heading: 'Wie viel Strom verbraucht KI?',
        paragraphs: [
          'Rechenzentren verbrauchten 2024 weltweit rund 415 Terawattstunden, etwa 1,5 Prozent des gesamten Stroms. Die Internationale Energieagentur erwartet bis 2030 ungefähr eine Verdopplung auf rund 945 Terawattstunden und nennt KI den wichtigsten Treiber dieses Wachstums.{iea}',
          'In Deutschland lag der Verbrauch der Rechenzentren 2025 bei 21,3 Milliarden Kilowattstunden, nach 20 Milliarden im Jahr 2024 und 12 Milliarden im Jahr 2015. Der Anteil der KI-Rechenzentren an der Anschlussleistung soll von 15 Prozent auf 40 Prozent im Jahr 2030 steigen.{bitkom}',
          'Irland zeigt, wie weit das gehen kann: Dort verbrauchten Rechenzentren 2024 22 Prozent des gemessenen Stroms, 2015 waren es 5 Prozent.{cso}',
        ],
      },
      {
        id: 'netz',
        heading: 'Wird das Stromnetz dadurch überlastet?',
        paragraphs: [
          'Das Problem ist weniger die Erzeugung als das Netz, das an vielen Orten ausgelastet ist. In den großen europäischen Rechenzentrums-Standorten, darunter Frankfurt, warten neue Anschlüsse im Schnitt sieben bis zehn Jahre.{iea-eu}',
          'Ein Netzbetreiber im Raum Frankfurt rechnet nach eigenen Angaben bis Mitte der 2030er-Jahre mit Einschränkungen bei der Vergabe von Netzanschlussleistung.{vdi}',
          'In den Niederlanden hat die Regierung 2025 alle Haushalte aufgerufen, zwischen 16 und 21 Uhr möglichst wenig Strom zu verbrauchen, mit dem Hinweis, dass sonst die Wahrscheinlichkeit von Stromausfällen steigt.{rijk} Der Aufruf betrifft das ausgelastete Netz insgesamt; Rechenzentren werden darin nicht als Ursache genannt.',
          'Das reale Risiko ist also kein plötzlicher Blackout durch KI, sondern ein Netz, das zu Spitzenzeiten enger wird. Der Strombedarf wächst durch vieles zugleich: Wärmepumpen, Elektroautos, Industrie und auch Rechenzentren.',
        ],
      },
      {
        id: 'vorfaelle',
        heading: 'Was schon passiert ist: Rechenzentren, die gleichzeitig vom Netz gehen',
        paragraphs: [
          'Am 10. Juli 2024 schalteten in den USA nach einer Störung auf einer Hochspannungsleitung Rechenzentren mit rund 1.500 Megawatt auf einmal auf eigene Notstromversorgung um. Dem Netz stand plötzlich zu viel Strom gegenüber. Spannung und Frequenz stiegen, die Netzbetreiber mussten eingreifen, die Werte blieben aber im sicheren Bereich.{nerc}',
          'Am 22. Juli 2026 geschah dasselbe in Nord-Virginia mit rund 3.800 Megawatt. Nach Angaben des Netzbetreibers gab es keine nennenswerten Folgen für die Zuverlässigkeit, das Gleichgewicht war nach neun Minuten wiederhergestellt.{pjm} In keinem der beiden Fälle fiel in Haushalten der Strom aus.',
          'Die US-Aufsicht für Netzzuverlässigkeit nimmt das Risiko ernst: Im Mai 2026 gab sie eine Warnung der Stufe 3 zu den Risiken großer Rechenlasten heraus, darunter das Training von KI.{nerc-alert}',
        ],
      },
      {
        id: 'iberien',
        heading: 'Und der große Stromausfall in Spanien und Portugal?',
        paragraphs: [
          'Der hatte nichts mit KI zu tun. Nach der spanischen Untersuchung hatte der Ausfall vom 28. April 2025 mehrere Ursachen zugleich, rund um zu hohe Spannung und zu wenig Möglichkeiten, sie zu regeln. Ein Cyberangriff wurde ausgeschlossen.{miteco} Das europäische Expertengremium der Netzbetreiber kam 2026 zu einem ähnlichen Ergebnis: ein Zusammenspiel vieler Faktoren.{entsoe} Rechenzentren und KI kommen in beiden Zusammenfassungen nicht vor.',
        ],
      },
      {
        id: 'cyber',
        heading: 'KI und Cyberangriffe auf das Stromnetz',
        paragraphs: [
          'Cyberangriffe haben schon Strom ausfallen lassen: in der Ukraine 2015 bei rund 225.000 Kunden{cisa}, 2016 in einem Teil von Kiew{eset} und erneut 2022.{mandiant} In den Quellen zu diesen Angriffen spielt KI keine Rolle.',
          'Das ändert sich langsam. Die niederländische Sicherheitsbehörde NCTV schreibt 2026, dass Angreifer KI inzwischen nachweislich bei Cyberangriffen einsetzen, meist unterstützend: Es macht Angriffe schneller, breiter angelegt und effizienter.{nctv} Derselbe Bericht beschreibt Angriffe auf mindestens dreißig polnische Wind- und Solarparks im Dezember 2025. Die Stromerzeugung lief dort weiter.{nctv}',
          'Die EU-Agentur für Cybersicherheit erwartet, dass KI-Modelle zunehmend zur Unterstützung von Angriffen genutzt werden.{enisa} Ein Stromausfall durch einen mit KI ausgeführten Angriff ist bisher nicht dokumentiert.',
        ],
      },
      {
        id: 'hilft',
        heading: 'KI hilft dem Netz auch',
        paragraphs: [
          'Netzbetreiber nutzen dieselbe Technik, um das Netz stabiler zu machen. Der britische Netzbetreiber meldete, dass maschinelles Lernen die Vorhersage von Solarstrom um 33 Prozent genauer machte.{neso} Die Internationale Energieagentur schätzt, dass KI-Anwendungen bis zu 175 Gigawatt Übertragungskapazität freisetzen können.{iea}',
        ],
      },
    ],
    doTitle: 'Was bedeutet das für deinen Haushalt?',
    doLead: 'Die Ursache eines Ausfalls kannst du nicht wählen, die Vorsorge schon. Sie ist immer dieselbe:',
    doSteps: [
      { text: 'Sorge dafür, dass du 72 Stunden ohne Strom auskommst: Licht, ein Batterieradio, eine geladene Powerbank und Bargeld.', href: '/de/szenarien/stromausfall/', link: 'Lesen: auf einen Stromausfall vorbereiten' },
      { text: 'Bei einer digitalen Störung funktionieren Kartenzahlung und Internet nicht.', href: '/de/szenarien/cyberangriff/', link: 'Lesen: auf einen Cyberangriff vorbereiten' },
      { text: 'Rechne aus, welche Powerbank dein Handy drei Tage lädt.', href: '/de/tools/energie-rechner/', link: 'Zum Powerbank-Rechner' },
    ],
    cta: { label: 'Meine Liste für 72 Stunden erstellen', href: '/de/tools/notfallpaket-zusammenstellen/' },
    sourcesTitle: 'Quellen',
    sourcesNote: 'Alle Zahlen wurden an der Quelle nachgelesen. Wo eine Quelle etwas nicht sagt, steht das im Text.',
    faqTitle: 'Häufige Fragen',
    faq: [
      { q: 'Hat KI schon einmal einen Stromausfall verursacht?', a: 'Soweit bekannt nicht. Es gibt keinen dokumentierten Fall, in dem KI oder der Strombedarf von KI-Rechenzentren den Strom in Haushalten hat ausfallen lassen. Es gab aber Vorfälle, bei denen Rechenzentren gleichzeitig vom Netz gingen und Netzbetreiber eingreifen mussten.' },
      { q: 'Wie viel Strom verbrauchen Rechenzentren in Deutschland?', a: 'Nach Angaben von Bitkom waren es 2025 rund 21,3 Milliarden Kilowattstunden, nach 20 Milliarden im Jahr 2024 und 12 Milliarden im Jahr 2015.' },
      { q: 'War der Stromausfall in Spanien ein Cyberangriff oder KI?', a: 'Nein. Nach der spanischen Untersuchung hatte der Ausfall vom 28. April 2025 mehrere Ursachen rund um zu hohe Spannung im Netz; ein Cyberangriff wurde ausgeschlossen.' },
      { q: 'Muss ich mich wegen KI anders vorbereiten?', a: 'Nein. Die Vorsorge für einen Stromausfall ist dieselbe, egal aus welchem Grund: Licht, ein Batterieradio, eine geladene Powerbank, Wasser, Essen und Bargeld für 72 Stunden.' },
    ],
  },

  es: {
    title: '¿Puede la IA provocar un apagón? Lo que se sabe',
    description: 'Los centros de datos para IA piden cada vez más electricidad y los atacantes usan IA en ciberataques. ¿Provoca eso apagones? Lo que se sabe, con fuentes.',
    h1: '¿Puede la IA provocar un apagón?',
    crumbParent: { label: 'Guías', href: '/es/guias/' },
    crumb: 'IA y apagones',
    checkedLabel: 'Fuentes comprobadas el',
    shortTitle: 'Respuesta corta',
    short: [
      'No hay ningún caso documentado en el que la IA, o la demanda eléctrica de los centros de datos de IA, haya dejado sin luz a los hogares.',
      'La IA sí presiona la red eléctrica por dos vías. Los centros de datos piden más electricidad, y muy rápido, en redes que ya están saturadas, y los atacantes usan IA en ciberataques. A la vez, los operadores de red usan IA para gestionar mejor la red.',
      'Para tu hogar la preparación no cambia: un apagón es un apagón, sea cual sea la causa.',
    ],
    sections: [
      {
        id: 'consumo',
        heading: '¿Cuánta electricidad consume la IA?',
        paragraphs: [
          'Los centros de datos consumieron en 2024 unos 415 teravatios hora en todo el mundo, alrededor del 1,5 % de la electricidad. La Agencia Internacional de la Energía prevé que la cifra se duplique aproximadamente hasta unos 945 teravatios hora en 2030, y señala a la IA como el principal motor de ese crecimiento.{iea}',
          'En España, el Gobierno indica que desde 2021 se han concedido más de 12 gigavatios de derechos de acceso y conexión a la red para centros de datos.{miteco-dc} Irlanda muestra hasta dónde puede llegar: allí los centros de datos consumieron en 2024 el 22 % de la electricidad medida, frente al 5 % de 2015.{cso}',
        ],
      },
      {
        id: 'red',
        heading: '¿Se satura la red por eso?',
        paragraphs: [
          'El problema no es tanto generar electricidad como la red, que en muchos puntos está al límite. En los grandes núcleos europeos de centros de datos, las nuevas conexiones esperan de media entre siete y diez años.{iea-eu}',
          'El Gobierno español ha planteado ligar el acceso de los centros de datos a la red a criterios de sostenibilidad.{miteco-dc} Irlanda fue más lejos: su regulador propuso en 2025 que los nuevos centros de datos aporten generación o almacenamiento propios que cubran su demanda.{cru}',
          'En los Países Bajos, el Gobierno pidió en 2025 a todos los hogares que usaran la menor electricidad posible entre las 16 y las 21 horas, advirtiendo de que, si no se hace nada, aumenta la probabilidad de cortes.{rijk} Ese llamamiento se refiere a la saturación general de la red; no señala a los centros de datos como causa.',
          'El riesgo real no es un apagón repentino causado por la IA, sino una red más ajustada en las horas punta. La demanda crece por muchas cosas a la vez: la climatización eléctrica, el coche eléctrico, la industria y también los centros de datos.',
        ],
      },
      {
        id: 'incidentes',
        heading: 'Lo que sí ha pasado: centros de datos que se desconectan a la vez',
        paragraphs: [
          'El 10 de julio de 2024, en Estados Unidos, tras una avería en una línea de alta tensión, centros de datos por unos 1.500 megavatios pasaron de golpe a su alimentación de emergencia. La red se encontró de repente con electricidad de sobra. La tensión y la frecuencia subieron y los operadores tuvieron que intervenir, pero los valores se mantuvieron en márgenes seguros.{nerc}',
          'El 22 de julio de 2026 ocurrió lo mismo en el norte de Virginia con unos 3.800 megavatios. Según el operador, no hubo efectos significativos sobre la fiabilidad y el equilibrio se recuperó en nueve minutos.{pjm} En ninguno de los dos casos se quedaron hogares sin luz.',
          'El organismo estadounidense de fiabilidad de la red se toma el riesgo en serio: en mayo de 2026 emitió una alerta de nivel 3 sobre los riesgos de las grandes cargas de computación, entre ellas el entrenamiento de IA.{nerc-alert}',
        ],
      },
      {
        id: 'iberico',
        heading: '¿Y el gran apagón de España y Portugal?',
        paragraphs: [
          'No tuvo nada que ver con la IA. Según el informe del comité de análisis, el apagón del 28 de abril de 2025 tuvo un origen multifactorial, relacionado con sobretensiones y con una capacidad insuficiente para controlarlas. El comité descartó que se tratara de un ciberataque.{miteco} El panel europeo de operadores de red llegó en 2026 a una conclusión similar: una combinación de muchos factores.{entsoe} Ninguno de los dos resúmenes menciona los centros de datos ni la IA.',
          'Lo que pasó aquel día, y lo que enseñó, está en <a href="/es/escenarios/apagon-espana-2025/">nuestro análisis del apagón de 2025</a>.',
        ],
      },
      {
        id: 'ciber',
        heading: 'IA y ciberataques contra la red eléctrica',
        paragraphs: [
          'Los ciberataques ya han provocado cortes de luz: en Ucrania en 2015, a unos 225.000 clientes{cisa}, en 2016 en parte de Kiev{eset} y de nuevo en 2022.{mandiant} En las fuentes sobre esos ataques la IA no aparece.',
          'Eso está cambiando poco a poco. La agencia de seguridad neerlandesa NCTV escribe en 2026 que los atacantes ya usan IA de forma demostrable en ciberataques, casi siempre como apoyo: hace los ataques más rápidos, a mayor escala y más eficientes.{nctv} El mismo informe describe ataques contra al menos treinta parques eólicos y solares polacos en diciembre de 2025. La producción eléctrica siguió con normalidad.{nctv}',
          'La agencia europea de ciberseguridad prevé que los modelos de IA se usen cada vez más para apoyar operaciones maliciosas.{enisa} Hasta ahora no hay documentado ningún apagón causado por un ataque ejecutado con IA.',
        ],
      },
      {
        id: 'ayuda',
        heading: 'La IA también ayuda a la red',
        paragraphs: [
          'Los operadores usan la misma tecnología para dar estabilidad a la red. El operador británico informó de que el aprendizaje automático mejoró un 33 % la precisión de sus previsiones de energía solar.{neso} La Agencia Internacional de la Energía estima que las aplicaciones de IA podrían liberar hasta 175 gigavatios de capacidad de transporte.{iea}',
        ],
      },
    ],
    doTitle: '¿Qué significa esto para tu hogar?',
    doLead: 'La causa de un corte no la eliges; la preparación sí. Es siempre la misma:',
    doSteps: [
      { text: 'Asegúrate de poder pasar 72 horas sin luz: linterna, radio a pilas, una power bank cargada y dinero en efectivo.', href: '/es/escenarios/prepararse-apagon/', link: 'Leer: prepararse para un apagón' },
      { text: 'En una caída digital no funcionan ni el pago con tarjeta ni internet.', href: '/es/escenarios/ciberataque/', link: 'Leer: prepararse para un ciberataque' },
      { text: 'Calcula qué power bank carga tu móvil durante tres días.', href: '/es/herramientas/calculadora-energia/', link: 'Ir a la calculadora de power bank' },
    ],
    cta: { label: 'Crear mi lista para 72 horas', href: '/es/herramientas/configurador-kit/' },
    sourcesTitle: 'Fuentes',
    sourcesNote: 'Todas las cifras se han leído en su fuente. Cuando una fuente no dice algo, el texto lo indica.',
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Ha provocado la IA algún apagón?', a: 'Que se sepa, no. No hay ningún caso documentado en el que la IA o la demanda de los centros de datos de IA haya dejado sin luz a los hogares. Sí ha habido incidentes en los que centros de datos se desconectaron a la vez y los operadores tuvieron que intervenir.' },
      { q: '¿El apagón de España de 2025 fue por la IA o por un ciberataque?', a: 'No. Según el informe del comité de análisis, tuvo un origen multifactorial relacionado con sobretensiones en la red, y se descartó un ciberataque.' },
      { q: '¿Cuánta electricidad consumen los centros de datos?', a: 'En el mundo, unos 415 teravatios hora en 2024, alrededor del 1,5 % de la electricidad, según la Agencia Internacional de la Energía. En Irlanda, el caso más extremo de Europa, fue el 22 % de la electricidad medida en 2024.' },
      { q: '¿Tengo que prepararme de otra forma por la IA?', a: 'No. La preparación para un apagón es la misma sea cual sea la causa: linterna, radio a pilas, una power bank cargada, agua, comida y dinero en efectivo para 72 horas.' },
    ],
  },
};
