/**
 * Copy for the lifecycle emails that Resend automations send.
 * Built into HTML templates by emails/build.mjs.
 *
 * {{{NAME}}} is a Resend template variable. HOUSEHOLD ("3 personen"),
 * WATER_LITRES, MEALS, LIGHTS and CASH_EUR come from the `kit72.subscribed` event payload;
 * RESEND_UNSUBSCRIBE_URL is supplied by Resend.
 */

const SITE = 'https://www.kit-72.com';

export const paths = {
  nl: {
    builder: '/nl/tools/noodpakket-samenstellen/',
    waterGuide: '/nl/gidsen/water-opslaan/',
    blackout: '/nl/scenario/stroomstoring/',
    compare: '/nl/noodpakket-kopen/',
    privacy: '/nl/privacy/',
  },
  de: {
    builder: '/de/tools/notfallpaket-zusammenstellen/',
    waterGuide: '/de/ratgeber/wasser-lagerung/',
    blackout: '/de/szenarien/stromausfall/',
    compare: '/de/notfallrucksack-kaufen/',
    privacy: '/de/datenschutz/',
  },
  es: {
    builder: '/es/herramientas/configurador-kit/',
    waterGuide: '/es/guias/almacenamiento-agua/',
    blackout: '/es/escenarios/prepararse-apagon/',
    compare: '/es/comprar-kit-emergencia/',
    privacy: '/es/privacidad/',
  },
};

export const url = (locale, key, campaign) =>
  `${SITE}${paths[locale][key]}?utm_source=email&utm_medium=lifecycle&utm_campaign=${campaign}`;

export const footer = {
  nl: {
    why: 'Je ontvangt deze e-mail omdat je je noodpakketlijst hebt aangevraagd op kit-72.com.',
    unsubscribe: 'Afmelden',
    privacy: 'Privacy',
    about: 'Kit-72 verkoopt niets zelf. Op de site staan links naar winkels waar we soms een vergoeding voor krijgen.',
  },
  de: {
    why: 'Du erhältst diese E-Mail, weil du deine Notfallliste auf kit-72.com angefordert hast.',
    unsubscribe: 'Abmelden',
    privacy: 'Datenschutz',
    about: 'Kit-72 verkauft nichts selbst. Auf der Website stehen Links zu Händlern, für die wir manchmal eine Provision erhalten.',
  },
  es: {
    why: 'Recibes este correo porque pediste tu lista de emergencia en kit-72.com.',
    unsubscribe: 'Darme de baja',
    privacy: 'Privacidad',
    about: 'Kit-72 no vende nada. En la web hay enlaces a tiendas por los que a veces recibimos una comisión.',
  },
};

/**
 * Each email: subject, preheader, heading, blocks, button.
 * Block kinds: p (text), soft (secondary text), sign (green figures panel),
 * steps (numbered), marks (crossed list).
 */
export const emails = {
  welcome: {
    variables: ['HOUSEHOLD', 'WATER_LITRES', 'MEALS', 'LIGHTS', 'CASH_EUR'],
    nl: {
      subject: 'Je noodpakketlijst voor 72 uur',
      preheader: 'Zoveel water, eten en licht heeft jouw huishouden nodig.',
      heading: 'Dit heeft jouw huishouden nodig',
      blocks: [
        ['p', 'Voor een huishouden van {{{HOUSEHOLD}}}, om 72 uur zonder hulp te kunnen:'],
        ['sign', '72 uur zonder hulp', [
          ['Drinkwater', '3 liter per persoon per dag', '{{{WATER_LITRES}}} L'],
          ['Maaltijden', 'houdbaar zonder koelkast', '{{{MEALS}}}'],
          ['Zaklampen', 'één per persoon, minstens twee', '{{{LIGHTS}}}'],
          ['Contant geld', '€ 70 per volwassene, € 30 per kind', '€ {{{CASH_EUR}}}'],
        ]],
        ['p', 'Begin met water en licht. Dat zijn de twee dingen die mensen bij een storing het eerst missen. In de samensteller vink je af wat je al in huis hebt, zodat je ziet wat er nog ontbreekt.'],
      ],
      button: ['builder', 'Open mijn lijst'],
      after: [['soft', 'De komende twee weken sturen we je drie korte tips. Daarna hoor je twee keer per jaar van ons, om houdbaarheidsdata te controleren.']],
    },
    de: {
      subject: 'Deine Notfallliste für 72 Stunden',
      preheader: 'So viel Wasser, Essen und Licht braucht dein Haushalt.',
      heading: 'Das braucht dein Haushalt',
      blocks: [
        ['p', 'Für einen Haushalt mit {{{HOUSEHOLD}}}, um 72 Stunden ohne Hilfe auszukommen:'],
        ['sign', '72 Stunden ohne Hilfe', [
          ['Trinkwasser', '2 Liter pro Person und Tag', '{{{WATER_LITRES}}} L'],
          ['Mahlzeiten', 'haltbar ohne Kühlung', '{{{MEALS}}}'],
          ['Taschenlampen', 'eine pro Person, mindestens zwei', '{{{LIGHTS}}}'],
        ]],
        ['p', 'Fang mit Wasser und Licht an. Das fehlt bei einem Ausfall zuerst. Im Konfigurator hakst du ab, was schon da ist, und siehst, was noch fehlt. Das BBK empfiehlt, den Vorrat danach auf zehn Tage auszubauen.'],
      ],
      button: ['builder', 'Meine Liste öffnen'],
      after: [['soft', 'In den nächsten zwei Wochen schicken wir dir drei kurze Tipps. Danach hörst du zweimal im Jahr von uns, um Haltbarkeitsdaten zu prüfen.']],
    },
    es: {
      subject: 'Tu lista de emergencia para 72 horas',
      preheader: 'Cuánta agua, comida y luz necesita tu hogar.',
      heading: 'Esto es lo que necesita tu hogar',
      blocks: [
        ['p', 'Para un hogar de {{{HOUSEHOLD}}}, para aguantar 72 horas sin ayuda:'],
        ['sign', '72 horas sin ayuda', [
          ['Agua potable', '3 litros por persona y día', '{{{WATER_LITRES}}} L'],
          ['Comidas', 'que no necesitan nevera', '{{{MEALS}}}'],
          ['Linternas', 'una por persona, mínimo dos', '{{{LIGHTS}}}'],
        ]],
        ['p', 'Empieza por el agua y la luz. Es lo primero que se echa en falta en un apagón. En el configurador marcas lo que ya tienes en casa y ves lo que falta.'],
      ],
      button: ['builder', 'Abrir mi lista'],
      after: [['soft', 'En las próximas dos semanas te enviaremos tres consejos breves. Después te escribiremos dos veces al año para revisar las fechas de caducidad.']],
    },
  },

  'tip-water': {
    variables: ['WATER_LITRES'],
    nl: {
      subject: 'Water: waar de meeste noodpakketten op stranden',
      preheader: 'Het zijn een paar kratten flessen of twee jerrycans.',
      heading: 'Water raakt het eerst op',
      blocks: [
        ['p', 'Voor jouw huishouden is dat {{{WATER_LITRES}}} liter. Dat klinkt veel, maar het zijn een paar kratten flessen of twee jerrycans.'],
        ['steps', [
          ['Flessenwater', 'blijft ongeopend goed tot de datum op de fles.'],
          ['Kraanwater', 'in een schone jerrycan ververs je elk half jaar.'],
          ['Bewaar het', 'koel en donker, en niet naast benzine of schoonmaakmiddel.'],
          ['Huisdieren', 'reken per dier een liter extra.'],
        ]],
        ['p', 'Op de site staat welke jerrycans geschikt zijn voor drinkwater en hoe je water zuivert als het toch opraakt.'],
      ],
      button: ['waterGuide', 'Lees: water opslaan'],
    },
    de: {
      subject: 'Wasser: daran scheitern die meisten Notvorräte',
      preheader: 'Es sind ein paar Kästen Flaschen oder zwei Kanister.',
      heading: 'Wasser geht zuerst aus',
      blocks: [
        ['p', 'Für deinen Haushalt sind das {{{WATER_LITRES}}} Liter für 72 Stunden. Das sind ein paar Kästen Flaschen oder zwei Kanister.'],
        ['steps', [
          ['Flaschenwasser', 'hält ungeöffnet bis zum aufgedruckten Datum.'],
          ['Leitungswasser', 'im sauberen Kanister tauschst du alle sechs Monate aus.'],
          ['Lagere es', 'kühl und dunkel, nicht neben Benzin oder Putzmitteln.'],
          ['Haustiere', 'rechne pro Tier einen Liter dazu.'],
        ]],
        ['p', 'Auf der Website steht, welche Kanister für Trinkwasser geeignet sind und wie du Wasser aufbereitest, wenn es doch ausgeht.'],
      ],
      button: ['waterGuide', 'Lesen: Wasser lagern'],
    },
    es: {
      subject: 'Agua: donde fallan casi todos los kits',
      preheader: 'Son unas cuantas garrafas o dos bidones.',
      heading: 'El agua es lo primero que se acaba',
      blocks: [
        ['p', 'Para tu hogar son {{{WATER_LITRES}}} litros. Parece mucho, pero son unas cuantas garrafas o dos bidones.'],
        ['steps', [
          ['El agua embotellada', 'sin abrir dura hasta la fecha del envase.'],
          ['El agua del grifo', 'en un bidón limpio se cambia cada seis meses.'],
          ['Guárdala', 'en un sitio fresco y oscuro, lejos de gasolina o productos de limpieza.'],
          ['Mascotas', 'cuenta un litro más por animal.'],
        ]],
        ['p', 'En la web explicamos qué bidones sirven para agua potable y cómo potabilizar agua si se acaba.'],
      ],
      button: ['waterGuide', 'Leer: almacenar agua'],
    },
  },

  'tip-light': {
    variables: [],
    nl: {
      subject: 'Als het licht uitvalt',
      preheader: 'Een zaklamp per persoon en een powerbank die vol is.',
      heading: 'Als het licht uitvalt',
      blocks: [
        ['p', 'Bij een stroomstoring mis je eerst licht en daarna je telefoon. Drie dingen lossen dat op.'],
        ['steps', [
          ['Zaklamp', 'één per persoon, op een vaste plek die iedereen kent.'],
          ['Powerbank', 'laad hem elke drie maanden bij. Een lege powerbank is de meest voorkomende verrassing.'],
          ['Radio op batterijen', 'zo hoor je het nieuws als internet en tv wegvallen.'],
        ]],
        ['p', 'Wat je doet in het eerste uur van een storing, en wat je beter laat, staat in onze stroomstoringsgids.'],
      ],
      button: ['blackout', 'Lees: voorbereiden op een stroomstoring'],
    },
    de: {
      subject: 'Wenn das Licht ausgeht',
      preheader: 'Eine Taschenlampe pro Person und eine volle Powerbank.',
      heading: 'Wenn das Licht ausgeht',
      blocks: [
        ['p', 'Bei einem Stromausfall fehlt zuerst das Licht und dann das Handy. Drei Dinge lösen das.'],
        ['steps', [
          ['Taschenlampe', 'eine pro Person, an einem festen Platz, den alle kennen.'],
          ['Powerbank', 'lade sie alle drei Monate nach. Eine leere Powerbank ist die häufigste Überraschung.'],
          ['Batterieradio', 'so hörst du Nachrichten, wenn Internet und Fernsehen ausfallen.'],
        ]],
        ['p', 'Was du in der ersten Stunde eines Ausfalls tust und was du besser lässt, steht in unserem Stromausfall-Ratgeber.'],
      ],
      button: ['blackout', 'Lesen: auf einen Stromausfall vorbereiten'],
    },
    es: {
      subject: 'Cuando se va la luz',
      preheader: 'Una linterna por persona y una powerbank cargada.',
      heading: 'Cuando se va la luz',
      blocks: [
        ['p', 'En un apagón primero falta la luz y después el móvil. Tres cosas lo resuelven.'],
        ['steps', [
          ['Linterna', 'una por persona, en un sitio fijo que todos conozcan.'],
          ['Powerbank', 'recárgala cada tres meses. Encontrarla vacía es la sorpresa más habitual.'],
          ['Radio a pilas', 'para oír las noticias cuando fallan internet y la tele.'],
        ]],
        ['p', 'Qué hacer en la primera hora de un apagón, y qué evitar, está en nuestra guía.'],
      ],
      button: ['blackout', 'Leer: prepararse para un apagón'],
    },
  },

  'tip-buy': {
    variables: [],
    nl: {
      subject: 'Kopen of zelf samenstellen: de prijzen',
      preheader: 'Kant-en-klare pakketten beginnen rond € 100. Dit zit er nooit in.',
      heading: 'Kopen of zelf samenstellen?',
      blocks: [
        ['p', 'Kant-en-klare noodpakketten beginnen rond € 100. De helft van wat erin zit heb je waarschijnlijk al. En dit zit er nooit in:'],
        ['marks', ['Genoeg drinkwater', 'Je eigen medicijnen', 'Kopieën van je papieren', 'Contant geld']],
        ['p', 'We hebben de prijzen naast elkaar gezet en opgeschreven wanneer kopen logisch is en wanneer niet.'],
      ],
      button: ['compare', 'Bekijk de vergelijking'],
    },
    de: {
      subject: 'Kaufen oder selbst packen: die Preise',
      preheader: 'Fertige Pakete gibt es ab 119 €. Das ist nie dabei.',
      heading: 'Kaufen oder selbst packen?',
      blocks: [
        ['p', 'Fertige Notvorrat-Pakete gibt es ab 119 €, ein gefüllter Notfallrucksack kostet bis 980 €. Vieles davon hast du wahrscheinlich schon. Und das ist nie dabei:'],
        ['marks', ['Genug Trinkwasser', 'Deine eigenen Medikamente', 'Kopien deiner Unterlagen', 'Bargeld']],
        ['p', 'Wir haben die Preise nebeneinandergestellt und aufgeschrieben, wann sich Kaufen lohnt und wann nicht.'],
      ],
      button: ['compare', 'Zum Vergleich'],
    },
    es: {
      subject: 'Comprar o montarlo tú: los precios',
      preheader: 'Los kits ya montados cuestan desde unos 57 €. Esto nunca viene.',
      heading: '¿Comprar o montarlo tú?',
      blocks: [
        ['p', 'Los kits ya montados cuestan desde unos 57 € hasta más de 550 €. La mitad de lo que traen seguramente ya lo tienes. Y esto no viene nunca:'],
        ['marks', ['Agua suficiente', 'Tu medicación', 'Copias de tus documentos', 'Dinero en efectivo']],
        ['p', 'Hemos puesto los precios lado a lado y explicamos cuándo tiene sentido comprar y cuándo no.'],
      ],
      button: ['compare', 'Ver la comparación'],
    },
  },

  reminder: {
    variables: [],
    nl: {
      subject: 'Vijf minuten: controleer je noodpakket',
      preheader: 'Water, eten, batterijen, medicijnen.',
      heading: 'Tijd voor een controle',
      blocks: [
        ['p', 'Het is een half jaar geleden. Loop deze vier na; het kost vijf minuten.'],
        ['steps', [
          ['Water', 'kijk naar de datum op de flessen en ververs het water in je jerrycans.'],
          ['Eten', 'wat binnen een half jaar verloopt, eet je op en vervang je.'],
          ['Batterijen en powerbank', 'opladen of vervangen.'],
          ['Medicijnen en papieren', 'klopt het nog met wie er nu in huis woont?'],
        ]],
      ],
      button: ['builder', 'Open mijn lijst'],
      after: [['soft', 'Over zes maanden herinneren we je opnieuw.']],
    },
    de: {
      subject: 'Fünf Minuten: prüfe deinen Notvorrat',
      preheader: 'Wasser, Lebensmittel, Batterien, Medikamente.',
      heading: 'Zeit für eine Kontrolle',
      blocks: [
        ['p', 'Ein halbes Jahr ist vorbei. Geh diese vier Punkte durch; es dauert fünf Minuten.'],
        ['steps', [
          ['Wasser', 'prüfe das Datum auf den Flaschen und tausche das Wasser in deinen Kanistern aus.'],
          ['Lebensmittel', 'was in den nächsten sechs Monaten abläuft, isst du auf und ersetzt es.'],
          ['Batterien und Powerbank', 'aufladen oder ersetzen.'],
          ['Medikamente und Unterlagen', 'passt noch alles zu den Personen, die jetzt bei dir wohnen?'],
        ]],
      ],
      button: ['builder', 'Meine Liste öffnen'],
      after: [['soft', 'In sechs Monaten erinnern wir dich wieder.']],
    },
    es: {
      subject: 'Cinco minutos: revisa tu kit de emergencia',
      preheader: 'Agua, comida, pilas, medicación.',
      heading: 'Toca revisar',
      blocks: [
        ['p', 'Han pasado seis meses. Repasa estos cuatro puntos; son cinco minutos.'],
        ['steps', [
          ['Agua', 'mira la fecha de las botellas y cambia el agua de los bidones.'],
          ['Comida', 'lo que caduque en los próximos seis meses, cómetelo y repónlo.'],
          ['Pilas y powerbank', 'recargar o sustituir.'],
          ['Medicación y documentos', '¿siguen correspondiendo a quien vive ahora en casa?'],
        ]],
      ],
      button: ['builder', 'Abrir mi lista'],
      after: [['soft', 'Dentro de seis meses te lo recordaremos otra vez.']],
    },
  },
};
