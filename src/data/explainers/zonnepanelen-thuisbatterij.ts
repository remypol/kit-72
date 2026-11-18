import { CHECKED, READ, labels, type Page } from './_shared';

export const zonnepanelenThuisbatterij: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'enexis', org: 'Enexis', title: 'Tips bij werkzaamheden aan het stroomnet', date: READ, url: 'https://www.enexis.nl/storingen-en-onderhoud/tips-bij-gas-en-stroomstoringen/tips-bij-werkzaamheden-stroom' },
    { id: 'enexis-bat', org: 'Enexis', title: 'Thuisbatterij', date: READ, url: 'https://www.enexis.nl/aansluitingen/verduurzamen/thuisbatterij' },
    { id: 'liander', org: 'Liander', title: 'Tips bij storingen', date: READ, url: 'https://www.liander.nl/storingen-en-onderhoud/tips-bij-storingen-en-werkzaamheden/tips-bij-storingen' },
    { id: 'stedin', org: 'Stedin', title: 'Tips tijdens een storing', date: READ, url: 'https://www.stedin.net/storing-en-onderhoud/tips-tijdens-een-storing' },
    { id: 'mc', org: 'Milieu Centraal', title: 'Thuisbatterij: zonne-energie opslaan', date: '9 nov. 2026', url: 'https://www.milieucentraal.nl/energie-besparen/zonnepanelen/thuisbatterij-zonne-energie-opslaan/' },
    { id: 'cb', org: 'Consumentenbond', title: 'Thuisbatterij', date: '19 okt. 2026', url: 'https://www.consumentenbond.nl/zonnepanelen/thuisbatterij' },
    { id: 'rvo', org: 'RVO', title: 'Handreiking energieopslag en netinpassing voor installateurs zonnestroom', date: '2022', url: 'https://www.rvo.nl/sites/default/files/2022-09/Handreiking-energieopslag-en-netinpassing-voor-installateurs-zonnestroom.pdf' },
    { id: 'bw', org: 'Brandweer Nederland', title: 'Plug-and-play thuisbatterij', date: READ, url: 'https://www.brandweer.nl/onderwerpen/plug-and-play-thuisbatterij/' },
    { id: 'nbnl', org: 'Netbeheer Nederland', title: 'Betrouwbaarheid van energienetten blijft hoog, geplande uitval neemt opnieuw toe', date: '2026', url: 'https://www.netbeheernederland.nl/artikelen/nieuws/betrouwbaarheid-van-energienetten-blijft-hoog-geplande-uitval-neemt-opnieuw-toe' },
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'Geen stroom', date: READ, url: 'https://www.denkvooruit.nl/risicos/risicos-in-nederland/geen-stroom' },
  ],
  content: {
    ...labels,
    title: 'Werken zonnepanelen en een thuisbatterij bij stroomuitval?',
    description: 'Nee: bij een stroomstoring schakelt de omvormer van je zonnepanelen uit. Een thuisbatterij helpt alleen met een noodstroomfunctie. Wat netbeheerders zeggen.',
    h1: 'Werken zonnepanelen en een thuisbatterij bij stroomuitval?',
    crumbParent: { label: 'Gidsen', href: '/nl/gidsen/' },
    crumb: 'Zonnepanelen en thuisbatterij',
    image: { src: '/images/shared/powerbanks.webp', alt: 'Drie powerbanks met een telefoon aan de kabel en een opvouwbaar zonnepaneel' },
    short: [
      'Gewone zonnepanelen leveren bij een stroomstoring geen stroom. De omvormer valt uit, zodat er geen gevaarlijke situatie ontstaat voor jou of voor de monteur die aan het net werkt.{enexis}',
      'Ook een thuisbatterij werkt dan niet zomaar. Daarvoor moet de batterij een speciale noodstroomfunctie hebben, en vaak is een aanpassing in de meterkast nodig.{mc}{enexis-bat}',
      'Voor een stroomstoring adviseert de overheid iets eenvoudigers: een zaklamp, een radio op batterijen en een opgeladen powerbank.{dv}',
    ],
    sections: [
      {
        id: 'panelen',
        heading: 'Waarom vallen zonnepanelen uit?',
        paragraphs: [
          'De omvormer van je panelen is gekoppeld aan het stroomnet. Valt het net weg, dan schakelt hij uit. Komt de stroom terug, dan gaat hij meestal vanzelf weer aan; controleer dat wel.{enexis}',
          'De reden is veiligheid. Zou je installatie stroom blijven leveren, dan houd je het net onder spanning terwijl er monteurs aan werken. Liander vraagt wie zelf stroom opwekt en teruglevert daarom bij een storing de hoofdschakelaar van de installatie uit te zetten.{liander}',
        ],
      },
      {
        id: 'noodstroom',
        heading: 'Wat is er nodig om wel stroom te hebben?',
        paragraphs: [
          'Een thuisbatterij met een noodstroomfunctie, ook wel back-upbox genoemd, en vaak een aanpassing in de meterkast.{enexis-bat} Die functie zit niet standaard op elke batterij.{cb}',
          'Hoe het technisch werkt, staat in de handreiking van RVO voor installateurs: bij een storing wordt de aansluiting op het net losgekoppeld en voedt de omvormer het huis, of alleen een paar groepen die jij vooraf hebt gekozen. Je kunt dan niet meer stroom vragen dan de omvormer kan leveren.{rvo} Vraag je installateur dus welke groepen op noodstroom komen en hoeveel vermogen er dan beschikbaar is.',
          'Welk deel van de thuisbatterijen in Nederland zo’n functie heeft en wat ze extra kost, vonden we bij geen van deze bronnen.',
        ],
      },
      {
        id: 'hoelang',
        heading: 'Hoe lang kom je ermee toe?',
        paragraphs: [
          'Een gemiddelde thuisbatterij slaat ongeveer 6 kWh op; de kleinste 2 kWh, de grootste rond 20 kWh.{mc} Volgens de Consumentenbond levert een gemiddelde batterij genoeg stroom voor één of twee dagen.{cb} Hoe lang precies hangt af van hoe vol de batterij is op het moment dat de stroom uitvalt en van wat je aanzet.{mc}',
          'In de winter vullen de panelen de batterij nauwelijks bij: tien panelen wekken op een gemiddelde dag in december ongeveer 2,5 kWh op, tegen 15 kWh in juni.{mc} Juist in de maanden waarin een lange storing het zwaarst valt, moet je het dus doen met wat er al in zat.',
        ],
        table: {
          head: ['', 'Zonder noodstroomfunctie', 'Met noodstroomfunctie'],
          rows: [
            ['Zonnepanelen bij storing', 'Vallen uit', 'Verschilt per systeem; vraag het je installateur'],
            ['Thuisbatterij bij storing', 'Levert geen stroom aan het huis', 'Voedt het huis of de gekozen groepen'],
            ['Beperking', '', 'Capaciteit van de batterij en vermogen van de omvormer'],
          ],
        },
      },
      {
        id: 'kosten',
        heading: 'Is het de investering waard voor noodgevallen?',
        paragraphs: [
          'Een thuisbatterij van 6 kWh kost volgens Milieu Centraal een paar duizend euro, inclusief omvormer en installatie.{mc} Milieu Centraal raadt thuisbatterijen op dit moment niet aan.{mc}',
          'Zet daar tegenover hoe vaak de stroom uitvalt: in 2025 zat een aansluiting gemiddeld 23,4 minuten zonder stroom door storingen, en een storing duurde gemiddeld 73,9 minuten.{nbnl} De meeste storingen zijn dus kort. Voor een langere storing adviseert de overheid een opgeladen powerbank in je noodpakket.{dv}',
        ],
      },
      {
        id: 'stekker',
        heading: 'Stekkerbatterijen',
        paragraphs: [
          'Een stekkerbatterij steek je zelf in het stopcontact. Milieu Centraal wijst op een brandrisico: stroom kan dan van twee kanten op één groep komen, waardoor de bedrading te heet kan worden zonder dat de zekering uitschakelt.{mc}',
          'De brandweer adviseert: steek de batterij rechtstreeks in een stopcontact, zonder verlengsnoer of stekkerblok, gebruik bij voorkeur een aparte groep, zet de batterij niet in een vluchtroute of onder de trap en hang een rookmelder op in dezelfde ruimte.{bw}',
        ],
      },
      {
        id: 'auto',
        heading: 'En de elektrische auto?',
        paragraphs: [
          'De accu van een elektrische auto is met gemiddeld 60 kWh veel groter dan een thuisbatterij. Toch is de auto volgens Milieu Centraal nu nog geen thuisbatterij op wielen: je kunt de stroom alleen voor de auto zelf gebruiken, niet voor de apparaten in huis.{mc} Dat kan in de toekomst veranderen.',
        ],
      },
      {
        id: 'aggregaat',
        heading: 'Een aggregaat aansluiten',
        paragraphs: [
          'Kun je echt niet zonder stroom, dan raden de netbeheerders aan een noodstroomaggregaat te huren.{liander}{stedin} Terugleveren met zonnepanelen werkt ook dan niet.{enexis} Laat het aansluiten op je huisinstallatie over aan de verhuurder of een installateur. Een aggregaat met een verbrandingsmotor geeft uitlaatgassen af: gebruik het volgens de gebruiksaanwijzing en niet in huis.',
        ],
      },
    ],
    doTitle: 'Wat je kunt doen',
    doLead: 'Afhankelijk van wat je al hebt:',
    doSteps: [
      { text: 'Heb je zonnepanelen: zoek op waar de schakelaar van de omvormer zit, en controleer na een storing of hij weer aanstaat.' },
      { text: 'Overweeg je een thuisbatterij: vraag uitdrukkelijk naar de noodstroomfunctie, welke groepen erop komen en wat de aanpassing in de meterkast kost.' },
      { text: 'Voor nu: leg een opgeladen powerbank klaar.', href: '/nl/tools/energie-calculator/', link: 'Reken uit hoeveel capaciteit je nodig hebt' },
      { text: 'Schrijf het storingsnummer op: 0800-9009.' },
    ],
    cta: { label: 'Lees wat je doet bij een stroomstoring', href: '/nl/scenario/stroomstoring/' },
    related: {
      title: 'Verder lezen',
      links: [
        { label: 'Powerbanks: waar je op let', href: '/nl/producten/powerbanks/' },
        { label: 'Kan AI een stroomstoring veroorzaken?', href: '/nl/gidsen/ai-stroomuitval/' },
        { label: 'Extreme kou: warm blijven zonder verwarming', href: '/nl/scenario/extreme-kou/' },
      ],
    },
    faq: [
      { q: 'Werken zonnepanelen bij een stroomstoring?', a: 'Nee. De omvormer schakelt uit zodra het net wegvalt, zodat er geen gevaar ontstaat voor monteurs. Als de stroom terug is, gaat hij meestal vanzelf weer aan.' },
      { q: 'Kun je een thuisbatterij gebruiken tijdens een stroomstoring?', a: 'Niet zomaar. De batterij moet een speciale noodstroomfunctie hebben en vaak is een aanpassing in de meterkast nodig.' },
      { q: 'Hoe lang heb je stroom met een thuisbatterij?', a: 'Dat hangt af van hoe vol de batterij is en wat je aanzet. De Consumentenbond houdt voor een gemiddelde batterij één tot twee dagen aan.' },
      { q: 'Maakt een thuisbatterij je onafhankelijk van het stroomnet?', a: 'Nee. In de winter wekken zonnepanelen te weinig op en de batterij is te klein om zomerstroom te bewaren.' },
      { q: 'Kan ik mijn elektrische auto als noodstroom gebruiken?', a: 'Volgens Milieu Centraal nu nog niet: de stroom uit de auto kun je alleen voor de auto zelf gebruiken. Dat kan in de toekomst veranderen.' },
      { q: 'Hoe vaak valt de stroom uit in Nederland?', a: 'In 2025 zat een aansluiting gemiddeld 23,4 minuten zonder stroom door storingen. Een storing duurde gemiddeld 73,9 minuten.' },
    ],
  },
};
