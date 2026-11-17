/**
 * Per-locale routes and shared UI copy for the homepage, signup form,
 * consent banner and shop boxes. One file so the three languages stay in step.
 */
import type { Locale } from './hreflang-map';

export type { Locale };

/**
 * The legal entity behind Kit-72 (same company as invoicenavigator.eu).
 * Used on the colofon / Impressum / aviso legal pages, the privacy pages and
 * in the Organization schema.
 */
export const company = {
  name: 'CCC Impact B.V.',
  street: 'Zwolseweg 210',
  postalCode: '7315 GP',
  city: 'Apeldoorn',
  representedBy: 'Hugo Pol',
  kvk: '90941284',
  vat: 'NL865503515B01',
  email: 'hello@invoicenavigator.eu',
} as const;

/** Litres of water per person per day in the official advice of each country. */
export const WATER_PER_DAY: Record<Locale, number> = { nl: 3, es: 3, de: 2 };

export interface CategoryLink {
  href: string;
  label: string;
  hint: string;
  icon: string;
}

export interface Routes {
  home: string;
  builder: string;
  water: string;
  power: string;
  products: string;
  compare: string;
  thanks: string;
  privacy: string;
  affiliate: string;
  editorial: string;
  legal: string;
  /** page explaining the government's own advice, where one exists */
  official: string | null;
  scenarios: { href: string; label: string; icon: string }[];
  categories: CategoryLink[];
}

export const routes: Record<Locale, Routes> = {
  nl: {
    home: '/nl/',
    builder: '/nl/tools/noodpakket-samenstellen/',
    water: '/nl/tools/water-calculator/',
    power: '/nl/tools/energie-calculator/',
    products: '/nl/producten/',
    compare: '/nl/noodpakket-kopen/',
    thanks: '/nl/aangemeld/',
    privacy: '/nl/privacy/',
    affiliate: '/nl/affiliate-disclaimer/',
    editorial: '/nl/redactioneel-beleid/',
    legal: '/nl/colofon/',
    official: '/nl/denk-vooruit/',
    scenarios: [
      { href: '/nl/scenario/stroomstoring/', label: 'Stroomstoring', icon: 'Zap' },
      { href: '/nl/scenario/overstroming/', label: 'Overstroming', icon: 'Waves' },
      { href: '/nl/scenario/wateruitval/', label: 'Wateruitval', icon: 'Droplet' },
      { href: '/nl/scenario/hittegolf/', label: 'Hittegolf', icon: 'Sun' },
      { href: '/nl/scenario/evacuatie/', label: 'Evacuatie', icon: 'Backpack' },
      { href: '/nl/scenario/cyberaanval/', label: 'Cyberaanval', icon: 'Wifi' },
    ],
    categories: [
      { href: '/nl/producten/wateropslag/', label: 'Wateropslag', hint: 'Jerrycans en flessen die je kunt stapelen', icon: 'Droplet' },
      { href: '/nl/producten/noodvoedsel/', label: 'Noodvoedsel', hint: 'Eten dat jaren goed blijft zonder koelkast', icon: 'Utensils' },
      { href: '/nl/producten/zaklampen/', label: 'Zaklampen', hint: 'Licht voor elke kamer, plus een hoofdlamp', icon: 'Flashlight' },
      { href: '/nl/producten/noodradio/', label: 'Noodradio', hint: 'Nieuws ontvangen als internet wegvalt', icon: 'Radio' },
      { href: '/nl/producten/powerbanks/', label: 'Powerbanks', hint: 'Je telefoon drie dagen aan de praat', icon: 'BatteryCharging' },
      { href: '/nl/producten/ehbo-doos/', label: 'EHBO-doos', hint: 'Verband, pleisters en je eigen medicijnen', icon: 'Bandage' },
      { href: '/nl/producten/noodtassen/', label: 'Noodtas', hint: 'Eén tas die klaarstaat als je weg moet', icon: 'Backpack' },
    ],
  },
  de: {
    home: '/de/',
    builder: '/de/tools/notfallpaket-zusammenstellen/',
    water: '/de/tools/wasser-rechner/',
    power: '/de/tools/energie-rechner/',
    products: '/de/produkte/',
    compare: '/de/notfallrucksack-kaufen/',
    thanks: '/de/angemeldet/',
    privacy: '/de/datenschutz/',
    affiliate: '/de/affiliate-hinweis/',
    editorial: '/de/redaktionelle-richtlinien/',
    legal: '/de/impressum/',
    official: '/de/bbk-notfallvorsorge/',
    scenarios: [
      { href: '/de/szenarien/stromausfall/', label: 'Stromausfall', icon: 'Zap' },
      { href: '/de/szenarien/hochwasser/', label: 'Hochwasser', icon: 'Waves' },
      { href: '/de/szenarien/wasserausfall/', label: 'Wasserausfall', icon: 'Droplet' },
      { href: '/de/szenarien/hitzewelle/', label: 'Hitzewelle', icon: 'Sun' },
      { href: '/de/szenarien/evakuierung/', label: 'Evakuierung', icon: 'Backpack' },
      { href: '/de/szenarien/cyberangriff/', label: 'Cyberangriff', icon: 'Wifi' },
    ],
    categories: [
      { href: '/de/produkte/wasserspeicher/', label: 'Wasserspeicher', hint: 'Kanister und Flaschen, die sich stapeln lassen', icon: 'Droplet' },
      { href: '/de/produkte/notnahrung/', label: 'Notnahrung', hint: 'Essen, das ohne Kühlung jahrelang hält', icon: 'Utensils' },
      { href: '/de/produkte/taschenlampen/', label: 'Taschenlampen', hint: 'Licht für jedes Zimmer, dazu eine Stirnlampe', icon: 'Flashlight' },
      { href: '/de/produkte/notfallradio/', label: 'Notfallradio', hint: 'Nachrichten empfangen, wenn das Netz ausfällt', icon: 'Radio' },
      { href: '/de/produkte/powerbanks/', label: 'Powerbanks', hint: 'Dein Handy drei Tage am Laufen halten', icon: 'BatteryCharging' },
      { href: '/de/produkte/erste-hilfe-kasten/', label: 'Erste-Hilfe-Kasten', hint: 'Verbandszeug und deine eigenen Medikamente', icon: 'Bandage' },
      { href: '/de/produkte/notfallrucksack/', label: 'Notfallrucksack', hint: 'Ein Rucksack, der fertig gepackt bereitsteht', icon: 'Backpack' },
    ],
  },
  es: {
    home: '/es/',
    builder: '/es/herramientas/configurador-kit/',
    water: '/es/herramientas/calculadora-agua/',
    power: '/es/herramientas/calculadora-energia/',
    products: '/es/componentes/',
    compare: '/es/comprar-kit-emergencia/',
    thanks: '/es/suscrito/',
    privacy: '/es/privacidad/',
    affiliate: '/es/afiliados/',
    editorial: '/es/politica-editorial/',
    legal: '/es/aviso-legal/',
    official: null,
    scenarios: [
      { href: '/es/escenarios/prepararse-apagon/', label: 'Apagón', icon: 'Zap' },
      { href: '/es/escenarios/inundacion/', label: 'Inundación', icon: 'Waves' },
      { href: '/es/escenarios/prepararse-corte-agua/', label: 'Corte de agua', icon: 'Droplet' },
      { href: '/es/escenarios/prepararse-ola-calor/', label: 'Ola de calor', icon: 'Sun' },
      { href: '/es/escenarios/kit-evacuacion/', label: 'Evacuación', icon: 'Backpack' },
      { href: '/es/escenarios/ciberataque/', label: 'Ciberataque', icon: 'Wifi' },
    ],
    categories: [
      { href: '/es/componentes/bidones-agua/', label: 'Bidones de agua', hint: 'Garrafas y bidones que se pueden apilar', icon: 'Droplet' },
      { href: '/es/componentes/comida-emergencia/', label: 'Comida de emergencia', hint: 'Comida que aguanta años sin nevera', icon: 'Utensils' },
      { href: '/es/componentes/linternas/', label: 'Linternas', hint: 'Luz para cada habitación y un frontal', icon: 'Flashlight' },
      { href: '/es/componentes/radios-emergencia/', label: 'Radios de emergencia', hint: 'Noticias cuando no hay internet', icon: 'Radio' },
      { href: '/es/componentes/powerbanks/', label: 'Powerbanks', hint: 'Tu móvil encendido durante tres días', icon: 'BatteryCharging' },
      { href: '/es/componentes/botiquin-basico/', label: 'Botiquín', hint: 'Vendas, tiritas y tu medicación', icon: 'Bandage' },
      { href: '/es/componentes/mochilas/', label: 'Mochila de emergencia', hint: 'Una mochila lista por si hay que salir', icon: 'Backpack' },
    ],
  },
};

export interface HomeCopy {
  title: string;
  description: string;
  h1: string;
  lead: string;
  adults: string;
  children: string;
  pets: string;
  fewer: string;
  more: string;
  panelTitle: string;
  panelSource: string;
  water: string;
  waterUnit: string;
  waterNote: string;
  meals: string;
  mealsNote: string;
  lights: string;
  lightsNote: string;
  cash?: string;
  cashNote?: string;
  cta: string;
  ctaNote: string;
  ownTitle: string;
  ownBody: string;
  ownPoints: string[];
  ownCta: string;
  missingTitle: string;
  missingLead: string;
  scenariosTitle: string;
  scenariosLead: string;
  toolsTitle: string;
  toolWater: string;
  toolWaterHint: string;
  toolPower: string;
  toolPowerHint: string;
  howTitle: string;
  how: { title: string; body: string }[];
  howLinks: { editorial: string; affiliate: string };
  faqTitle: string;
}

export const homeCopy: Record<Locale, HomeCopy> = {
  nl: {
    title: 'Noodpakket samenstellen voor 72 uur: jouw lijst in 2 minuten | Kit-72',
    description: 'Bereken wat jouw huishouden nodig heeft voor 72 uur en stel zelf je noodpakket samen. Gratis checklist volgens het advies van de Rijksoverheid.',
    h1: 'Wat heeft jouw huishouden nodig voor 72 uur?',
    lead: 'Vul in met hoeveel jullie zijn. Je ziet meteen hoeveel water en eten je in huis moet hebben volgens het advies van de Rijksoverheid.',
    adults: 'Volwassenen',
    children: 'Kinderen',
    pets: 'Huisdieren',
    fewer: 'minder',
    more: 'meer',
    panelTitle: '72 uur zonder hulp',
    panelSource: 'Rekenregels: Rijksoverheid, Denk Vooruit',
    water: 'Drinkwater',
    waterUnit: 'liter',
    waterNote: '3 liter per persoon per dag',
    meals: 'Maaltijden',
    mealsNote: 'houdbaar zonder koelkast',
    lights: 'Zaklampen',
    lightsNote: 'één per persoon, minstens twee',
    cash: 'Contant geld',
    cashNote: '€ 70 per volwassene, € 30 per kind',
    cta: 'Maak mijn lijst',
    ctaNote: 'Gratis, zonder account. Je vinkt af wat je al hebt.',
    ownTitle: 'De meeste spullen heb je al in huis',
    ownBody: 'Consumentenprogramma Kassa waarschuwt voor peperdure kant-en-klare noodpakketten. Terecht. Een pakket dat je zelf samenstelt past bij je gezin, en je betaalt alleen voor wat ontbreekt.',
    ownPoints: [
      'Vink af wat je al hebt: flessen water, een zaklamp, pleisters',
      'Zie wat er nog ontbreekt, op volgorde van belang',
      'Koop alleen dat, waar jij wilt',
    ],
    ownCta: 'Kopen of zelf samenstellen: de prijzen naast elkaar',
    missingTitle: 'Wat er meestal nog ontbreekt',
    missingLead: 'Per onderdeel: waar je op let en wat je kunt overslaan.',
    scenariosTitle: 'Voorbereiden op één situatie',
    scenariosLead: 'Een stroomstoring vraagt iets anders dan hoogwater. Kies wat bij jouw woonplek speelt.',
    toolsTitle: 'Zelf doorrekenen',
    toolWater: 'Watercalculator',
    toolWaterHint: 'Hoeveel liter, in welke verpakking',
    toolPower: 'Energiecalculator',
    toolPowerHint: 'Welke powerbank je apparaten drie dagen laadt',
    howTitle: 'Zo werkt Kit-72',
    how: [
      { title: 'Officieel advies als basis', body: 'Hoeveelheden komen van de Rijksoverheid en het Rode Kruis. Waar wij iets toevoegen, staat dat erbij.' },
      { title: 'Geen eigen winkel', body: 'We verkopen niets zelf. Daardoor kunnen we ook zeggen wat je níet hoeft te kopen.' },
      { title: 'Zo verdienen we', body: 'Koop je iets via een link naar een winkel, dan krijgen wij soms een kleine vergoeding. Jij betaalt hetzelfde.' },
    ],
    howLinks: { editorial: 'Redactioneel beleid', affiliate: 'Over affiliate-links' },
    faqTitle: 'Veelgestelde vragen',
  },
  de: {
    title: 'Notfallvorrat für 72 Stunden: deine Liste in 2 Minuten | Kit-72',
    description: 'Berechne, was dein Haushalt für 72 Stunden braucht, und stelle deinen Notvorrat selbst zusammen. Kostenlose Checkliste nach BBK-Empfehlung.',
    h1: 'Was braucht dein Haushalt für 72 Stunden?',
    lead: 'Gib an, wie viele ihr seid. Du siehst sofort, wie viel Wasser und Essen du nach der Empfehlung des BBK im Haus haben solltest.',
    adults: 'Erwachsene',
    children: 'Kinder',
    pets: 'Haustiere',
    fewer: 'weniger',
    more: 'mehr',
    panelTitle: '72 Stunden ohne Hilfe',
    panelSource: 'Rechenregeln: BBK. Das BBK rät, später auf 10 Tage aufzustocken.',
    water: 'Trinkwasser',
    waterUnit: 'Liter',
    waterNote: '2 Liter pro Person und Tag',
    meals: 'Mahlzeiten',
    mealsNote: 'haltbar ohne Kühlung',
    lights: 'Taschenlampen',
    lightsNote: 'eine pro Person, mindestens zwei',
    cta: 'Meine Liste erstellen',
    ctaNote: 'Kostenlos, ohne Konto. Du hakst ab, was du schon hast.',
    ownTitle: 'Das meiste hast du schon zu Hause',
    ownBody: 'Fertige Notfallrucksäcke kosten schnell mehrere hundert Euro. Ein Vorrat, den du selbst zusammenstellst, passt zu deinem Haushalt, und du zahlst nur für das, was fehlt.',
    ownPoints: [
      'Hake ab, was schon da ist: Wasserflaschen, Taschenlampe, Pflaster',
      'Sieh, was noch fehlt, nach Wichtigkeit sortiert',
      'Kaufe nur das, wo du willst',
    ],
    ownCta: 'Kaufen oder selbst packen: die Preise im Vergleich',
    missingTitle: 'Was meistens noch fehlt',
    missingLead: 'Pro Baustein: worauf es ankommt und was du dir sparen kannst.',
    scenariosTitle: 'Auf eine Lage vorbereiten',
    scenariosLead: 'Ein Stromausfall verlangt anderes als Hochwasser. Wähle, was bei dir wahrscheinlich ist.',
    toolsTitle: 'Selbst nachrechnen',
    toolWater: 'Wasser-Rechner',
    toolWaterHint: 'Wie viele Liter, in welchen Behältern',
    toolPower: 'Energie-Rechner',
    toolPowerHint: 'Welche Powerbank deine Geräte drei Tage lädt',
    howTitle: 'So arbeitet Kit-72',
    how: [
      { title: 'Offizielle Empfehlungen als Basis', body: 'Mengen stammen vom BBK und vom Deutschen Roten Kreuz. Wo wir etwas ergänzen, steht es dabei.' },
      { title: 'Kein eigener Shop', body: 'Wir verkaufen nichts selbst. Deshalb können wir auch sagen, was du nicht kaufen musst.' },
      { title: 'So verdienen wir', body: 'Kaufst du über einen Link bei einem Händler, erhalten wir manchmal eine kleine Provision. Du zahlst dasselbe.' },
    ],
    howLinks: { editorial: 'Redaktionelle Richtlinien', affiliate: 'Über Affiliate-Links' },
    faqTitle: 'Häufige Fragen',
  },
  es: {
    title: 'Kit de emergencia para 72 horas: tu lista en 2 minutos | Kit-72',
    description: 'Calcula lo que necesita tu hogar para 72 horas y monta tú mismo el kit de emergencia. Lista gratuita según las recomendaciones de Protección Civil.',
    h1: '¿Qué necesita tu hogar para aguantar 72 horas?',
    lead: 'Indica cuántos sois. Verás al momento cuánta agua y comida conviene tener en casa según las recomendaciones de Protección Civil.',
    adults: 'Adultos',
    children: 'Niños',
    pets: 'Mascotas',
    fewer: 'menos',
    more: 'más',
    panelTitle: '72 horas sin ayuda',
    panelSource: 'Cálculo: recomendaciones de Protección Civil',
    water: 'Agua potable',
    waterUnit: 'litros',
    waterNote: '3 litros por persona y día',
    meals: 'Comidas',
    mealsNote: 'que no necesitan nevera',
    lights: 'Linternas',
    lightsNote: 'una por persona, mínimo dos',
    cta: 'Crear mi lista',
    ctaNote: 'Gratis y sin registro. Marcas lo que ya tienes.',
    ownTitle: 'Casi todo lo tienes ya en casa',
    ownBody: 'Las mochilas de emergencia ya montadas cuestan fácilmente varios cientos de euros. Un kit que montas tú se ajusta a tu familia, y solo pagas lo que falta.',
    ownPoints: [
      'Marca lo que ya tienes: botellas de agua, una linterna, tiritas',
      'Mira lo que falta, ordenado por importancia',
      'Compra solo eso, donde prefieras',
    ],
    ownCta: 'Comprar o montarlo tú: los precios comparados',
    missingTitle: 'Lo que suele faltar',
    missingLead: 'Para cada parte del kit: en qué fijarte y qué puedes ahorrarte.',
    scenariosTitle: 'Prepararse para una situación concreta',
    scenariosLead: 'Un apagón no pide lo mismo que una inundación. Elige lo que es probable donde vives.',
    toolsTitle: 'Haz tus números',
    toolWater: 'Calculadora de agua',
    toolWaterHint: 'Cuántos litros y en qué envases',
    toolPower: 'Calculadora de energía',
    toolPowerHint: 'Qué powerbank carga tus aparatos tres días',
    howTitle: 'Cómo trabaja Kit-72',
    how: [
      { title: 'Recomendaciones oficiales como base', body: 'Las cantidades vienen de Protección Civil y Cruz Roja. Cuando añadimos algo, lo indicamos.' },
      { title: 'Sin tienda propia', body: 'No vendemos nada. Por eso también podemos decirte lo que no hace falta comprar.' },
      { title: 'Así ganamos dinero', body: 'Si compras a través de un enlace a una tienda, a veces recibimos una pequeña comisión. Tú pagas lo mismo.' },
    ],
    howLinks: { editorial: 'Política editorial', affiliate: 'Sobre los enlaces de afiliado' },
    faqTitle: 'Preguntas frecuentes',
  },
};

export interface SignupCopy {
  title: string;
  body: string;
  email: string;
  placeholder: string;
  consent: string;
  button: string;
  sending: string;
  success: string;
  errorEmail: string;
  errorConsent: string;
  errorSend: string;
  privacy: string;
}

export const signupCopy: Record<Locale, SignupCopy> = {
  nl: {
    title: 'Krijg je lijst in je mailbox, en een seintje als je water over de datum gaat',
    body: 'Je ontvangt je persoonlijke lijst en in de eerste twee weken drie korte tips. Daarna twee keer per jaar een herinnering om water, eten en batterijen te controleren.',
    email: 'E-mailadres',
    placeholder: 'naam@voorbeeld.nl',
    consent: 'Ja, stuur me mijn lijst, de drie tips en de halfjaarlijkse herinnering.',
    button: 'Stuur mijn lijst',
    sending: 'Bezig met versturen',
    success: 'Kijk in je inbox en bevestig je adres. Daarna komt je lijst eraan.',
    errorEmail: 'Dit e-mailadres klopt niet. Controleer het en probeer opnieuw.',
    errorConsent: 'Vink het vakje aan, dan mogen we je de lijst sturen.',
    errorSend: 'Versturen is niet gelukt. Probeer het over een minuut opnieuw.',
    privacy: 'Afmelden kan in elke e-mail. Zo gaan we om met je gegevens',
  },
  de: {
    title: 'Deine Liste per E-Mail, und eine Erinnerung, bevor dein Wasser abläuft',
    body: 'Du bekommst deine persönliche Liste und in den ersten zwei Wochen drei kurze Tipps. Danach zweimal im Jahr eine Erinnerung, Wasser, Lebensmittel und Batterien zu prüfen.',
    email: 'E-Mail-Adresse',
    placeholder: 'name@beispiel.de',
    consent: 'Ja, schickt mir meine Liste, die drei Tipps und die halbjährliche Erinnerung.',
    button: 'Liste senden',
    sending: 'Wird gesendet',
    success: 'Schau in dein Postfach und bestätige deine Adresse. Danach kommt deine Liste.',
    errorEmail: 'Diese E-Mail-Adresse stimmt nicht. Bitte prüfen und erneut versuchen.',
    errorConsent: 'Setze das Häkchen, damit wir dir die Liste senden dürfen.',
    errorSend: 'Senden hat nicht geklappt. Versuch es in einer Minute noch einmal.',
    privacy: 'Abmelden geht in jeder E-Mail. So gehen wir mit deinen Daten um',
  },
  es: {
    title: 'Recibe tu lista por correo y un aviso antes de que caduque el agua',
    body: 'Te enviamos tu lista personal y, en las dos primeras semanas, tres consejos breves. Después, dos veces al año, un recordatorio para revisar agua, comida y pilas.',
    email: 'Correo electrónico',
    placeholder: 'nombre@ejemplo.es',
    consent: 'Sí, enviadme mi lista, los tres consejos y el recordatorio semestral.',
    button: 'Enviar mi lista',
    sending: 'Enviando',
    success: 'Mira tu bandeja de entrada y confirma tu dirección. Después llegará tu lista.',
    errorEmail: 'Este correo no es válido. Revísalo e inténtalo de nuevo.',
    errorConsent: 'Marca la casilla para que podamos enviarte la lista.',
    errorSend: 'No se ha podido enviar. Inténtalo de nuevo en un minuto.',
    privacy: 'Puedes darte de baja en cada correo. Así tratamos tus datos',
  },
};

export const consentCopy: Record<Locale, { text: string; accept: string; decline: string; more: string; href: string }> = {
  nl: {
    text: 'Mogen we anoniem meten welke pagina’s gelezen worden? Daarmee verbeteren we de site. Zonder toestemming plaatsen we geen meetcookies.',
    accept: 'Ja, meten mag',
    decline: 'Nee, liever niet',
    more: 'Cookies',
    href: '/nl/cookies/',
  },
  de: {
    text: 'Dürfen wir anonym messen, welche Seiten gelesen werden? Damit verbessern wir die Website. Ohne Einwilligung setzen wir keine Analyse-Cookies.',
    accept: 'Ja, einverstanden',
    decline: 'Nein, lieber nicht',
    more: 'Cookies',
    href: '/de/cookies/',
  },
  es: {
    text: '¿Podemos medir de forma anónima qué páginas se leen? Así mejoramos la web. Sin tu permiso no usamos cookies de medición.',
    accept: 'Sí, de acuerdo',
    decline: 'No, prefiero que no',
    more: 'Cookies',
    href: '/es/cookies/',
  },
};
