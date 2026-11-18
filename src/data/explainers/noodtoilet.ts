import { CHECKED, READ, labels, type Page } from './_shared';

export const noodtoilet: Page = {
  checked: CHECKED,
  published: '2026-11-18',
  sources: [
    { id: 'dv', org: 'Denk Vooruit (Rijksoverheid)', title: 'Veelgestelde vragen: voorbereiden', date: READ, url: 'https://www.denkvooruit.nl/veelgestelde-vragen/voorbereiden' },
    { id: 'dv-water', org: 'Denk Vooruit (Rijksoverheid)', title: 'Drinkwater', date: READ, url: 'https://www.denkvooruit.nl/risicos/risicos-in-nederland/drinkwater' },
    { id: 'lijst', org: 'Denk Vooruit (Rijksoverheid)', title: 'Stel je noodpakket samen', date: READ, url: 'https://www.denkvooruit.nl/bereid-je-voor/stel-je-noodpakket-samen' },
    { id: 'rijk', org: 'Rijksoverheid', title: 'Energie, drinkwater, internet, zorg en bereikbaarheid tijdens een crisis', date: READ, url: 'https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/dreiging-in-nederland/energie-drinkwater-internet-zorg-bereikbaarheid-tijdens-crisis' },
    { id: 'rk', org: 'Rode Kruis', title: 'Wat te doen bij stroomuitval', date: READ, url: 'https://www.rodekruis.nl/wat-doen-wij/hulp-in-nederland/goed-voorbereid/wat-te-doen-bij-stroomuitval/' },
    { id: 'zz', org: 'Waterschap Zuiderzeeland', title: 'Folder: wat doe je bij een noodsituatie?', date: 'feb. 2026', url: 'https://www.zuiderzeeland.nl/app/uploads/2026/03/260226-digitaal-toegankelijke-versie-folder-noodsituatie-Waterschap-Zuiderzeeland.pdf' },
    { id: 'zz-qa', org: 'Waterschap Zuiderzeeland', title: 'Vragen en antwoorden: zuiveren van afvalwater bij stroomuitval', date: READ, url: 'https://www.zuiderzeeland.nl/stroomuitval/meest-gestelde-vragen/qa-zuiveren-van-afvalwater/' },
    { id: 'vitens', org: 'Vitens', title: 'Drinkwater in uw noodpakket', date: READ, url: 'https://www.vitens.nl/over-water/drinkwater-in-uw-noodpakket' },
    { id: 'dunea', org: 'Dunea', title: 'Veelgestelde vragen en tips', date: READ, url: 'https://www.dunea.nl/klantenservice/veelgestelde-vragen-tips' },
    { id: 'wbg', org: 'Waterbedrijf Groningen', title: 'Zo bereid je je voor op een dag zonder drinkwater', date: READ, url: 'https://waterbedrijfgroningen.nl/zo-bereid-je-je-voor-op-een-dag-zonder-drinkwater/' },
    { id: 'waternet', org: 'Waternet', title: 'Werk aan de waterleiding', date: READ, url: 'https://www.waternet.nl/service-en-contact/problemen-met-water/werk-aan-de-waterleiding/' },
    { id: 'rivm', org: 'RIVM', title: 'Handen wassen', date: READ, url: 'https://www.rivm.nl/hygiene/handen-wassen' },
    { id: 'cbs', org: 'CBS', title: 'Watergebruik thuis 2021: het toilet', date: '2022', url: 'https://www.cbs.nl/nl-nl/longread/aanvullende-statistische-diensten/2022/watergebruik-thuis--wgt---2021/7-het-toilet' },
  ],
  content: {
    ...labels,
    title: 'Wc doorspoelen zonder water: noodtoilet en hygiëne',
    description: 'Geen water uit de kraan? Spoel de wc door met een emmer regen- of slootwater. Wat je doet als het riool niet werkt en hoe je je handen schoon houdt.',
    h1: 'Naar de wc zonder water uit de kraan',
    crumbParent: { label: 'Gidsen', href: '/nl/gidsen/' },
    crumb: 'Noodtoilet',
    image: { src: '/images/shared/water-outage.webp', alt: 'Kraan met één druppel naast een gele emmer water, een pan met deksel en drie gevulde flessen' },
    short: [
      'Komt er geen water uit de kraan, dan kun je de wc met de hand doorspoelen met water uit de regenton, een sloot of ander oppervlaktewater.{dv} Gebruik daar niet je drinkwatervoorraad voor.',
      'Werkt het riool of de zuivering niet, of vraagt het waterschap zo min mogelijk door te spoelen? Gebruik dan een emmer met een vuilniszak erin of een chemisch toilet.{zz} De overheid noemt ook plaszakken en, zoals vroeger, een gat in de tuin.{dv}',
    ],
    sections: [
      {
        id: 'doorspoelen',
        heading: 'Doorspoelen met een emmer',
        paragraphs: [
          'Giet het water in één keer in de pot; de wc spoelt dan door zoals met de knop. De overheid, het Rode Kruis en de waterbedrijven noemen hiervoor regenwater en slootwater.{dv}{rijk}{rk}{wbg} Water uit een regenton of sloot is niet om te drinken en niet om je mee te wassen.{rk}',
          'Hoeveel water een emmerspoeling vraagt, zegt geen van de waterbedrijven. Ter vergelijking: een gewone volle spoeling gebruikte in 2021 gemiddeld 6,7 liter en een kleine spoeling 3,7 liter.{cbs} Reken dus op ruwweg een halve emmer per keer.',
          'Weet je vooraf dat het water wordt afgesloten, vul dan het bad of de wastafel en zet een volle emmer naast de wc.{dunea} Let wel op de aanwijzing van je eigen waterbedrijf: Waternet vraagt bij werkzaamheden juist om de wc niet door te spoelen zolang het water is afgesloten.{waternet}',
        ],
      },
      {
        id: 'stroom',
        heading: 'Is er bij een stroomstoring nog water en werkt het riool?',
        paragraphs: [
          'Water uit de kraan blijft bij een stroomstoring meestal komen: Vitens zegt erop voorbereid te zijn om tien dagen zonder stroom te blijven leveren.{vitens} Woon je hoger dan de derde verdieping, dan kun je wel zonder water komen te zitten, omdat de pomp in het gebouw stroom nodig heeft.{vitens}{dv-water}',
          'Het riool is kwetsbaarder. Rioolgemalen draaien dan op noodstroom en voeren het afvalwater langzamer af. Soms spoelt de wc niet goed door, en bij een overvol riool kan afvalwater via de wc, het doucheputje of de gootsteen het huis in komen.{zz}',
        ],
      },
      {
        id: 'riool',
        heading: 'Als het riool niet werkt',
        paragraphs: ['Waterschap Zuiderzeeland adviseert bij een langdurige stroomstoring:{zz}'],
        bullets: [
          'Spoel zo min mogelijk door.',
          'Gebruik een chemisch toilet als je dat hebt, of een emmer met een vuilniszak erin.',
          'Woon je op de begane grond: span een handdoek over de wc-pot, doe bril en deksel dicht en leg er iets zwaars op, zoals een zandzak.',
          'Duw een stevige doek in het doucheputje en verzwaar die.',
        ],
        after: [
          'De overheid noemt nog twee manieren: plaszakken, die je bij het afval gooit, of een gat in je tuin.{dv} Over materiaal om in de emmer te strooien, zoals kattenbakkorrels, en over wat je met zakken ontlasting doet, vonden we geen officieel advies.',
          'Het waterschap raadt bij een stroomstoring aan contact met slootwater te vermijden: de zuivering werkt dan minder goed en het water wordt vuiler.{zz-qa} Haal je toch slootwater voor de wc, was daarna je handen.',
        ],
      },
      {
        id: 'handen',
        heading: 'Handen wassen zonder stromend water',
        paragraphs: [
          'Was je handen na de wc en voor het eten of koken, 20 seconden met water en zeep.{rivm} Thuis is desinfecteren normaal niet nodig. Is er geen gelegenheid om je handen te wassen en zijn ze niet zichtbaar vuil, dan kun je handdesinfectiemiddel gebruiken; op vieze handen werkt het minder goed.{rivm}',
          'In het noodpakket van de overheid zitten daarom desinfecterende gel, wc-papier, natte doekjes, maandverband, tandpasta en een tandenborstel.{lijst} Douchen kan beperkter: gebruik een beetje water en een washandje.{zz}',
        ],
      },
      {
        id: 'nooddrinkwater',
        heading: 'En drinkwater?',
        paragraphs: [
          'Komt er langer dan 24 uur geen goed drinkwater uit de kraan, dan leveren de drinkwaterbedrijven nooddrinkwater: minimaal 3 liter per persoon per dag, 2 liter om te drinken en 1 liter om mee te koken.{dv-water} Neem zelf een schone emmer, flessen of een jerrycan mee en kook het water 3 minuten voordat je het gebruikt.{dv-water} Voor de wc is dat water niet bedoeld.',
        ],
      },
    ],
    doTitle: 'Leg dit klaar',
    doLead: 'Weinig spullen, veel verschil:',
    doSteps: [
      { text: 'Een emmer, en stevige vuilniszakken die erin passen.' },
      { text: 'Wc-papier, natte doekjes, desinfecterende gel en zeep.', href: '/nl/noodpakket-checklist/', link: 'Checklist noodpakket' },
      { text: 'Een regenton, als je een tuin hebt. Het water kun je voor de wc gebruiken.' },
      { text: 'Genoeg drinkwater, zodat je dat niet voor de wc hoeft aan te spreken.', href: '/nl/gidsen/water-opslaan/', link: 'Water opslaan' },
    ],
    cta: { label: 'Reken uit hoeveel water je nodig hebt', href: '/nl/tools/water-calculator/' },
    related: {
      title: 'Verder lezen',
      links: [
        { label: 'Wateruitval: wat doe je als er geen water uit de kraan komt?', href: '/nl/scenario/wateruitval/' },
        { label: 'Stroomstoring: wat doe je en hoe bereid je je voor?', href: '/nl/scenario/stroomstoring/' },
      ],
    },
    faq: [
      { q: 'Hoe spoel je een wc door zonder water uit de kraan?', a: 'Met een emmer water die je in één keer in de pot giet. Gebruik regenwater of slootwater en bewaar je drinkwater om te drinken.' },
      { q: 'Kan ik naar de wc bij een stroomstoring?', a: 'Meestal wel: het water blijft in de meeste woningen komen. In hoge gebouwen kan de waterdruk wegvallen, en rioolgemalen voeren het afvalwater langzamer af. Vraagt het waterschap minder door te spoelen, doe dat dan.' },
      { q: 'Wat is een noodtoilet?', a: 'Een chemisch toilet, of eenvoudiger: een emmer met een vuilniszak erin. De overheid noemt ook plaszakken.' },
      { q: 'Mag ik slootwater gebruiken om door te spoelen?', a: 'Ja, de overheid noemt dat zelf. Het is niet geschikt om te drinken of je mee te wassen.' },
      { q: 'Hoe houd ik mijn handen schoon zonder water?', a: 'Met handdesinfectiemiddel, als je handen niet zichtbaar vuil zijn. Zijn ze dat wel, gebruik dan een beetje water en zeep.' },
    ],
  },
};
