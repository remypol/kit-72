import type { Page } from './_shared';

/**
 * ES-Alert, for readers in Spain. Every statement comes from the page of the
 * Dirección General de Protección Civil y Emergencias, read on CHECKED.
 */
const CHECKED = '2026-11-26';
const READ = 'consultada el 26 nov. 2026';

export const esAlert: Page = {
  checked: CHECKED,
  published: '2026-11-26',
  sources: [
    { id: 'pc', org: 'Dirección General de Protección Civil y Emergencias', title: 'ES-Alert: sistema de avisos a la población', date: READ, url: 'https://www.proteccioncivil.es/coordinacion/redes/ran/public-warning-system' },
  ],
  content: {
    checkedLabel: 'Fuentes consultadas el',
    policy: { label: 'Cómo trabajamos', href: '/es/politica-editorial/' },
    shortTitle: 'Respuesta corta',
    faqTitle: 'Preguntas frecuentes',
    sourcesTitle: 'Fuentes',
    sourcesNote: 'Todo lo que se afirma arriba procede de esta página. Kit-72 no es un sitio oficial; en una emergencia mandan las indicaciones de las autoridades y de los servicios de emergencia.',
    title: 'ES-Alert: qué es, cómo suena y qué hacer si te llega',
    description: 'ES-Alert es el sistema de avisos de Protección Civil al móvil. No hay que instalar nada. Qué móviles lo reciben, por qué a veces no llega y qué hacer.',
    h1: 'ES-Alert: qué es y qué hacer cuando suena',
    crumb: 'ES-Alert',
    image: { src: '/images/shared/nl-alert.webp', alt: 'Móvil con la pantalla iluminada en amarillo conectado a un powerbank, junto a una radio a pilas y una linterna' },
    short: [
      'ES-Alert es el sistema con el que Protección Civil envía un aviso a todos los móviles de una zona cuando hay una emergencia grave. No tienes que instalar ninguna aplicación ni darte de alta: lo reciben los teléfonos conectados a la red de cualquier operador.{pc}',
      'El aviso suena y vibra aunque el móvil esté en silencio, bloqueado o en modo «No molestar».{pc} Si te llega y no es un simulacro: mantén la calma, lee el texto con sus instrucciones, avisa a quienes tengas cerca y sigue atento a la radio, la televisión y otros canales.{pc}',
    ],
    sections: [
      {
        id: 'que-hacer',
        heading: '¿Qué hago si recibo una alerta?',
        paragraphs: ['Protección Civil lo explica así:{pc}'],
        steps: [
          'Comprueba si es un simulacro o una prueba. El propio mensaje lo indica con claridad. Las pruebas se anuncian antes en los medios, pero puede que no te haya llegado el anuncio. Si es una prueba, no tienes que hacer nada.',
          'Si no lo es, mantén la calma y lee con atención el texto, incluidas las instrucciones sobre cómo actuar.',
          'Avisa a las personas que tengas alrededor. La mayoría habrá recibido la alerta, pero puede que alguna no.',
          'Sigue atento a otros canales: radio, televisión, redes sociales.',
        ],
        after: [
          'El mensaje suele explicar el riesgo, sus consecuencias y qué debes hacer.{pc} Un truco útil: al pulsar «Aceptar» (Android) o el botón de inicio (iPhone) se calla el pitido, pero el mensaje desaparece. Si pulsas una vez el botón de bajar volumen, se silencia y el texto sigue en pantalla.{pc}',
        ],
      },
      {
        id: 'activar',
        heading: '¿Tengo que activar algo en el móvil?',
        paragraphs: [
          'No. Los teléfonos compatibles reciben el aviso sin ninguna acción previa y sin aplicaciones, porque el mensaje llega directamente desde la antena de telefonía.{pc}',
          'Hay dos niveles. La «Alerta de Protección Civil», el nivel máximo, viene activada y no se puede desactivar. La «Pre-Alerta de Protección Civil», un aviso previo, sí se puede desactivar.{pc} Lo único que conviene comprobar es que no la has apagado.',
        ],
      },
      {
        id: 'moviles',
        heading: '¿Qué móviles lo reciben?',
        paragraphs: ['ES-Alert funciona con redes 4G y 5G.{pc} Depende de la versión del sistema:{pc}'],
        table: {
          head: ['Teléfono', '¿Recibe la alerta?'],
          rows: [
            ['Android 11 o superior', 'Sí, y la muestra correctamente'],
            ['Android 9 y 10', 'Sí, aunque puede aparecer como «Alerta Presidencial»'],
            ['Android 8 o anterior', 'No'],
            ['iPhone con iOS 15.6 o superior (desde el iPhone 6)', 'Sí, y la muestra correctamente'],
          ],
        },
        after: ['En Android, el fabricante puede haber cambiado algún detalle, así que el comportamiento no siempre es idéntico.{pc}'],
      },
      {
        id: 'no-llega',
        heading: '¿Por qué no me ha llegado?',
        paragraphs: ['Protección Civil menciona estos casos:{pc}'],
        bullets: [
          '<strong>El móvil estaba apagado.</strong> No recibe nada. Si lo enciendes dentro de la zona afectada mientras la alerta sigue vigente, aparece de inmediato.',
          '<strong>No tenías cobertura.</strong> Tampoco la recibes. Si entras en cobertura dentro de la zona afectada mientras la alerta sigue vigente, aparece de inmediato.',
          '<strong>Tu teléfono es antiguo.</strong> Con Android 8 o anterior no se reciben ni se muestran las alertas.',
        ],
        after: ['En cambio, el silencio, el bloqueo de pantalla y el modo «No molestar» no la frenan.{pc} Por si el móvil falla, ten también una <a href="/es/componentes/radios-emergencia/">radio a pilas o de manivela</a>.'],
      },
      {
        id: 'releer',
        heading: '¿Puedo volver a leer una alerta?',
        paragraphs: [
          'En Android queda guardada: Ajustes, Seguridad y emergencia, Alertas de emergencia inalámbricas, Historial de alertas de emergencia. En el iPhone no se guarda, pero la encuentras entre las notificaciones, deslizando desde la parte superior de la pantalla, hasta que la borres.{pc}',
        ],
      },
      {
        id: 'quien',
        heading: '¿Quién la envía y en qué idioma?',
        paragraphs: [
          'Las alertas las definen y emiten los centros de coordinación de emergencias de las comunidades autónomas y el Centro Nacional de Seguimiento y Coordinación de Emergencias del Ministerio del Interior.{pc}',
          'Llegan en castellano y, en su caso, en la lengua cooficial de la comunidad. El centro de emergencias puede añadir un segundo idioma, normalmente inglés, que se muestra en los teléfonos configurados en un idioma distinto del español.{pc}',
        ],
      },
      {
        id: 'privacidad',
        heading: '¿Saben dónde estoy o cuál es mi número?',
        paragraphs: [
          'No. El mensaje se envía desde las antenas a todos los teléfonos que tienen cerca, sin tener en cuenta su número. La única localización que interviene es la que ya usa tu operador para darte servicio, y no se transmite al sistema ES-Alert.{pc}',
        ],
      },
      {
        id: 'sirenas',
        heading: '¿Sustituye a las sirenas?',
        paragraphs: [
          'No. ES-Alert complementa los sistemas de sirenas y megafonía que existen en algunas zonas, por ejemplo cerca de industrias químicas o centrales nucleares. Allí recibirás el mensaje además de la señal acústica.{pc}',
        ],
      },
    ],
    doTitle: 'Qué puedes hacer ahora',
    doLead: 'Cuatro comprobaciones rápidas:',
    doSteps: [
      { text: 'Mira qué versión de Android o iOS tiene tu móvil y el de las personas mayores de tu familia.' },
      { text: 'Comprueba que no has desactivado las «Pre-Alertas de Protección Civil».' },
      { text: 'Ten una radio que funcione sin enchufe.', href: '/es/componentes/radios-emergencia/', link: 'Radios de emergencia' },
      { text: 'Prepara lo básico para tres días.', href: '/es/kit-72-horas/', link: 'Mochila de 72 horas' },
    ],
    cta: { label: 'Calcula lo que necesita tu hogar', href: '/es/' },
    related: {
      title: 'Más en Kit-72',
      links: [
        { label: 'Inundación y DANA: qué hacer', href: '/es/escenarios/inundacion/' },
        { label: 'Evacuación: qué llevar y cuándo salir', href: '/es/escenarios/kit-evacuacion/' },
        { label: 'El apagón del 28 de abril de 2025: qué pasó', href: '/es/escenarios/apagon-espana-2025/' },
      ],
    },
    faq: [
      { q: '¿Hay que instalar una aplicación para recibir ES-Alert?', a: 'No. El aviso llega directamente desde la antena de telefonía a todos los móviles compatibles de la zona, sin aplicaciones y sin darse de alta.' },
      { q: '¿Suena ES-Alert con el móvil en silencio?', a: 'Sí. El pitido y la vibración se producen aunque el teléfono esté en silencio, bloqueado o en modo «No molestar».' },
      { q: '¿Se puede desactivar ES-Alert?', a: 'La «Alerta de Protección Civil», el nivel máximo, no se puede desactivar. La «Pre-Alerta de Protección Civil» sí.' },
      { q: '¿Recibo la alerta con el móvil apagado o sin cobertura?', a: 'No. Pero si lo enciendes o recuperas la cobertura dentro de la zona afectada mientras la alerta sigue vigente, aparece de inmediato.' },
      { q: '¿Cómo sé si es una prueba?', a: 'El propio mensaje lo indica. Las pruebas y los simulacros se anuncian antes en los medios de comunicación.' },
      { q: '¿ES-Alert sabe mi número de teléfono?', a: 'No. El mensaje se envía a todos los teléfonos que están en la zona de cobertura de las antenas, sin tener en cuenta su número.' },
    ],
  },
};
