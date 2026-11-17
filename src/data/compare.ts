/**
 * "Buy a ready-made kit or build your own" pages.
 * Every price below was read from the shop's own page on CHECKED.
 * Re-check before changing the date; do not add prices from memory.
 */
import type { Locale } from './hreflang-map';

export const CHECKED = '2026-11-17';

export interface KitRow {
  name: string;
  shop: string;
  price: string;
  covers: string;
  url: string;
}

export interface CompareCopy {
  title: string;
  description: string;
  h1: string;
  checkedLabel: string;
  verdictTitle: string;
  verdict: string[];
  tableTitle: string;
  tableLead: string;
  cols: { kit: string; shop: string; price: string; covers: string; view: string };
  rows: KitRow[];
  tableNote: string;
  missingTitle: string;
  missing: string[];
  missingSource?: string;
  buyTitle: string;
  buy: string[];
  diyTitle: string;
  diy: string[];
  diyCta: string;
  partsTitle: string;
  partsLead: string;
  searchTitle: string;
  searchLead: string;
  searches: { label: string; url: string }[];
  faq: { q: string; a: string }[];
}

export const compareCopy: Record<Locale, CompareCopy> = {
  nl: {
    title: 'Noodpakket kopen of zelf samenstellen? Prijzen vergeleken',
    description: 'Kant-en-klare noodpakketten kosten vanaf € 99,95. Wat krijg je daarvoor, wat ontbreekt er altijd, en wanneer ben je goedkoper uit als je het zelf samenstelt?',
    h1: 'Noodpakket kopen of zelf samenstellen?',
    checkedLabel: 'Prijzen gecontroleerd op',
    verdictTitle: 'Kort antwoord',
    verdict: [
      'Zelf samenstellen is voor de meeste huishoudens goedkoper, omdat je de helft al in huis hebt: flessen water, houdbaar eten, een zaklamp, pleisters.',
      'Een kant-en-klaar pakket is zinvol als je in één keer klaar wilt zijn, of als je het voor iemand anders koopt. Reken dan op ongeveer € 100 tot € 130 voor een instapmodel voor één of twee personen.',
      'Welk pakket je ook koopt: water, medicijnen en documenten moet je er altijd zelf bij doen.',
    ],
    tableTitle: 'Wat kosten kant-en-klare noodpakketten?',
    tableLead: 'Prijzen zoals de winkel ze zelf toont. We krijgen geen vergoeding van deze winkel.',
    cols: { kit: 'Pakket', shop: 'Winkel', price: 'Prijs', covers: 'Bedoeld voor', view: 'Bekijk' },
    rows: [
      { name: 'Rampenrugzak Essentials', shop: 'noodpakket.nu', price: 'vanaf € 99,95', covers: 'Instapmodel, rugzak', url: 'https://noodpakket.nu' },
      { name: 'Rampenrugzak Essentials Plus', shop: 'noodpakket.nu', price: 'vanaf € 129,95', covers: 'Instapmodel met meer inhoud', url: 'https://noodpakket.nu' },
    ],
    tableNote: 'Grotere pakketten (ton voor 2 tot 5 personen, Premium, Deluxe) staan bij dezelfde winkel zonder prijs op de overzichtspagina. Ook het Rode Kruis verkoopt een noodpakket via shop.rodekruis.nl; de prijs staat niet op de informatiepagina.',
    missingTitle: 'Wat er in geen enkel pakket zit',
    missing: [
      'Genoeg drinkwater: 9 liter per persoon voor 72 uur weegt 9 kilo en past niet in een rugzak',
      'Je eigen medicijnen',
      'Kopieën van je identiteitsbewijs en verzekeringspapieren',
      'Contant geld',
      'Babyvoeding en voer voor huisdieren',
      'Schone kleding in jouw maat',
    ],
    missingSource: 'De winkel zegt het zelf ook: een standaardpakket vul je aan met medicijnen, water, documenten, schone kleding, babyvoeding en dierenvoer.',
    buyTitle: 'Kopen is logisch als',
    buy: [
      'je weinig in huis hebt en er niet over wilt nadenken',
      'je het cadeau doet aan ouders of kinderen die op zichzelf wonen',
      'je één tas wilt die bij de deur klaarstaat voor een evacuatie',
    ],
    diyTitle: 'Zelf samenstellen is logisch als',
    diy: [
      'je al water, houdbaar eten of een zaklamp in huis hebt',
      'je gezin iets nodig heeft dat niet standaard is: medicijnen, een baby, een huisdier',
      'je liever zelf kiest wat goed genoeg is, in plaats van te betalen voor spullen die je al hebt',
    ],
    diyCta: 'Stel je lijst samen en zie wat ontbreekt',
    partsTitle: 'Per onderdeel kopen',
    partsLead: 'Bij elk onderdeel staat waar je op let en wat je kunt overslaan.',
    searchTitle: 'Toch liever kant-en-klaar? Vergelijk het aanbod',
    searchLead: 'Let op wat er echt in zit en op de houdbaarheid van het eten. Via deze links kunnen wij een vergoeding krijgen.',
    searches: [
      { label: 'Noodpakketten bij bol', url: 'https://www.bol.com/nl/nl/s/?searchtext=noodpakket+72+uur' },
      { label: 'Noodpakketten bij Amazon.nl', url: 'https://www.amazon.nl/s?k=noodpakket+72+uur' },
    ],
    faq: [
      { q: 'Is een noodpakket verplicht?', a: 'Nee. De Rijksoverheid adviseert elk huishouden om 72 uur zonder hulp te kunnen, maar verplicht niets en keurt geen pakketten.' },
      { q: 'Hoe lang blijft een noodpakket goed?', a: 'Dat hangt af van het eten en het water. Flessenwater en blikken zijn meestal één tot enkele jaren houdbaar, noodrantsoenen vaak langer. Controleer twee keer per jaar de data en de batterijen.' },
      { q: 'Wat is het minimum om mee te beginnen?', a: 'Water, eten dat je niet hoeft te koelen of te koken, een zaklamp, een radio op batterijen en je medicijnen. Daarmee heb je de eerste dagen het belangrijkste geregeld.' },
    ],
  },
  de: {
    title: 'Notfallrucksack kaufen oder selbst packen? Preisvergleich',
    description: 'Fertige Notvorrat-Pakete gibt es ab 119 €, ein gefüllter Notfallrucksack kostet bis 980 €. Was du dafür bekommst, was immer fehlt und wann selbst packen günstiger ist.',
    h1: 'Notfallrucksack kaufen oder selbst packen?',
    checkedLabel: 'Preise geprüft am',
    verdictTitle: 'Kurze Antwort',
    verdict: [
      'Selbst zusammenstellen ist für die meisten Haushalte günstiger, weil die Hälfte schon da ist: Wasserflaschen, haltbare Lebensmittel, eine Taschenlampe, Pflaster.',
      'Fertig kaufen lohnt sich beim Essen: Ein Langzeit-Notvorrat mit 10 Jahren Haltbarkeit erspart dir das regelmäßige Austauschen. Rechne mit etwa 119 € für fünf Tage.',
      'Egal welches Paket: Wasser, Medikamente und Dokumente musst du immer selbst ergänzen.',
    ],
    tableTitle: 'Was kosten fertige Pakete?',
    tableLead: 'Preise, wie der Händler sie selbst anzeigt. Über Links zu diesem Händler können wir eine Provision erhalten.',
    cols: { kit: 'Paket', shop: 'Händler', price: 'Preis', covers: 'Gedacht für', view: 'Ansehen' },
    rows: [
      { name: 'POW-R1 High Energy Notfallnahrung, 5 Tage', shop: 'ration1.de', price: '32,00 €', covers: 'Riegel, 20 Jahre haltbar', url: 'https://ration1.de/produkt/pow-r1-high-energy-bar-5-tage-vorrat/' },
      { name: 'Notvorrat Klassik, 5 Tage', shop: 'ration1.de', price: '119,00 €', covers: 'Mahlzeiten, 10 Jahre haltbar', url: 'https://ration1.de/produkt/notvorrat-5-tage-paket-klassik-10-jahre-haltbar/' },
      { name: 'Notvorrat Kompakt, 7 Tage', shop: 'ration1.de', price: '159,00 €', covers: 'Mahlzeiten, 5 Jahre haltbar', url: 'https://ration1.de/produkt/notvorrat-kompakt-7-tage-paket-5-jahre-haltbar/' },
      { name: 'Stromausfall-Paket Klassik', shop: 'ration1.de', price: '299,00 €', covers: 'Licht, Kochen und Strom bei Blackout', url: 'https://ration1.de/produkt/stromausfall-paket-klassik-ration1/' },
      { name: 'Notfallrucksack SOS-BAG', shop: 'ration1.de', price: '980,00 €', covers: 'Gefüllter Rucksack für die Evakuierung', url: 'https://ration1.de/produkt/notfallrucksack-sos-bag-zur-krisenvorsorge-survival-evakuierung/' },
    ],
    tableNote: 'Einige Preise sind Aktionspreise und können sich ändern. Schweizer Langzeit-Pakete von SicherSatt beginnen bei 349 €.',
    missingTitle: 'Was in keinem Paket steckt',
    missing: [
      'Genug Trinkwasser: 6 Liter pro Person für 72 Stunden, für 10 Tage 20 Liter',
      'Deine eigenen Medikamente',
      'Kopien von Ausweis und Versicherungsunterlagen',
      'Bargeld',
      'Babynahrung und Tierfutter',
      'Kleidung in deiner Größe',
    ],
    buyTitle: 'Kaufen lohnt sich, wenn',
    buy: [
      'du Lebensmittel willst, die 10 Jahre halten und nicht rotiert werden müssen',
      'du für Eltern oder Kinder vorsorgst, die allein wohnen',
      'du einen Rucksack willst, der für eine Evakuierung fertig an der Tür steht',
    ],
    diyTitle: 'Selbst packen lohnt sich, wenn',
    diy: [
      'du schon Wasser, Konserven oder eine Taschenlampe im Haus hast',
      'dein Haushalt etwas braucht, das kein Standard ist: Medikamente, ein Baby, ein Haustier',
      'du lieber selbst entscheidest, was gut genug ist, statt für Vorhandenes zu zahlen',
    ],
    diyCta: 'Liste erstellen und sehen, was fehlt',
    partsTitle: 'Einzeln kaufen',
    partsLead: 'Zu jedem Baustein steht, worauf es ankommt und was du dir sparen kannst.',
    searchTitle: 'Doch lieber fertig? Angebote vergleichen',
    searchLead: 'Achte darauf, was wirklich enthalten ist, und auf die Haltbarkeit. Über diese Links können wir eine Provision erhalten.',
    searches: [
      { label: 'Notvorrat bei ration1', url: 'https://ration1.de' },
      { label: 'Notfallrucksäcke bei Amazon.de', url: 'https://www.amazon.de/s?k=notfallrucksack+gef%C3%BCllt' },
    ],
    faq: [
      { q: 'Reichen 72 Stunden?', a: '72 Stunden sind der Einstieg. Das BBK empfiehlt, den Vorrat danach schrittweise auf zehn Tage auszubauen.' },
      { q: 'Wie lange hält ein Notvorrat?', a: 'Das hängt vom Produkt ab: Konserven meist einige Jahre, spezielle Notvorrat-Pakete 5 bis 20 Jahre. Prüfe zweimal im Jahr Daten und Batterien.' },
      { q: 'Womit fange ich an?', a: 'Wasser, Essen, das weder Kühlung noch Kochen braucht, eine Taschenlampe, ein Batterieradio und deine Medikamente. Damit ist das Wichtigste für die ersten Tage geregelt.' },
    ],
  },
  es: {
    title: '¿Comprar un kit de emergencia o montarlo tú? Precios',
    description: 'Los kits de emergencia de 72 horas ya montados cuestan entre 57 € y más de 550 €. Qué incluyen, qué falta siempre y cuándo sale más barato montarlo tú.',
    h1: '¿Comprar un kit de emergencia o montarlo tú?',
    checkedLabel: 'Precios comprobados el',
    verdictTitle: 'Respuesta corta',
    verdict: [
      'Montarlo tú sale más barato para la mayoría de hogares, porque la mitad ya está en casa: botellas de agua, comida que no caduca pronto, una linterna, tiritas.',
      'Comprarlo hecho tiene sentido si quieres resolverlo de una vez o si es para otra persona. Cuenta con unos 70 € para un kit básico y entre 240 € y 550 € para una mochila completa de una persona.',
      'Compres el que compres, el agua, la medicación y los documentos los tienes que añadir tú.',
    ],
    tableTitle: '¿Cuánto cuestan los kits ya montados?',
    tableLead: 'Precios tal como los muestra la tienda. No recibimos comisión de esta tienda.',
    cols: { kit: 'Kit', shop: 'Tienda', price: 'Precio', covers: 'Pensado para', view: 'Ver' },
    rows: [
      { name: 'Kit de emergencia alimentaria 72H', shop: 'liofilizado.es', price: '56,97 €', covers: 'Solo raciones y agua', url: 'https://www.liofilizado.es/2931-mochilas-de-evacuacion' },
      { name: 'Kit de emergencia 72h', shop: 'liofilizado.es', price: '70,48 €', covers: 'Mochila de 40 L, 3,7 kg', url: 'https://www.liofilizado.es/15771-kit-emergencia-72h.html' },
      { name: 'Mochila de evacuación 72H, Esencial', shop: 'liofilizado.es', price: '237,86 €', covers: '1 persona, 1100 kcal al día', url: 'https://www.liofilizado.es/2931-mochilas-de-evacuacion' },
      { name: 'Mochila de evacuación 72H, Avanzada', shop: 'liofilizado.es', price: '406,46 €', covers: '1 persona, 1550 kcal al día', url: 'https://www.liofilizado.es/2931-mochilas-de-evacuacion' },
      { name: 'Mochila de evacuación 72H, Confort', shop: 'liofilizado.es', price: '553,14 €', covers: '1 persona, 2000 kcal al día', url: 'https://www.liofilizado.es/2931-mochilas-de-evacuacion' },
    ],
    tableNote: 'Todas las mochilas completas son para una sola persona: una familia de cuatro multiplica el precio. Varias estaban sin stock el día de la comprobación.',
    missingTitle: 'Lo que no trae ningún kit',
    missing: [
      'Agua suficiente: 9 litros por persona para 72 horas pesan 9 kilos y no caben en una mochila',
      'Tu medicación',
      'Copias del DNI y de los seguros',
      'Dinero en efectivo',
      'Comida para bebés y para mascotas',
      'Ropa de tu talla',
    ],
    buyTitle: 'Comprar tiene sentido si',
    buy: [
      'tienes poco en casa y no quieres pensarlo',
      'es un regalo para tus padres o para hijos que viven solos',
      'quieres una mochila lista junto a la puerta por si hay que evacuar',
    ],
    diyTitle: 'Montarlo tú tiene sentido si',
    diy: [
      'ya tienes agua, conservas o una linterna en casa',
      'tu hogar necesita algo que no es estándar: medicación, un bebé, una mascota',
      'prefieres decidir tú qué es suficiente en vez de pagar por lo que ya tienes',
    ],
    diyCta: 'Crea tu lista y mira qué falta',
    partsTitle: 'Comprar por partes',
    partsLead: 'En cada parte explicamos en qué fijarte y qué puedes ahorrarte.',
    searchTitle: '¿Prefieres uno ya montado? Compara la oferta',
    searchLead: 'Fíjate en lo que incluye de verdad y en la caducidad de la comida. Podemos recibir una comisión por estos enlaces.',
    searches: [{ label: 'Kits de emergencia en Amazon.es', url: 'https://www.amazon.es/s?k=kit+emergencia+72+horas' }],
    faq: [
      { q: '¿Es obligatorio tener un kit de emergencia?', a: 'No. La Unión Europea y Protección Civil recomiendan que cada hogar pueda aguantar 72 horas sin ayuda, pero no es una obligación.' },
      { q: '¿Cuánto dura un kit?', a: 'Depende del agua y de la comida. El agua embotellada y las conservas suelen durar de uno a varios años; las raciones de emergencia, más. Revisa fechas y pilas dos veces al año.' },
      { q: '¿Por dónde empiezo?', a: 'Agua, comida que no necesite nevera ni cocina, una linterna, una radio a pilas y tu medicación. Con eso tienes cubierto lo más importante de los primeros días.' },
    ],
  },
};
