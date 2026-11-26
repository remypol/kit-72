import type { Page } from './_shared';

/**
 * How people in Germany are warned. Every statement comes from the BBK guide
 * or a BBK page, read on CHECKED.
 */
const CHECKED = '2026-11-26';
const READ = 'gelesen am 26. Nov. 2026';

export const deWarnung: Page = {
  checked: CHECKED,
  published: '2026-11-26',
  sources: [
    { id: 'ratgeber', org: 'BBK', title: 'Ratgeber „Vorsorgen für Krisen und Katastrophen“ (PDF)', date: 'Oktober 2025', url: 'https://www.bbk.bund.de/SharedDocs/Downloads/DE/Mediathek/Publikationen/Buergerinformationen/Ratgeber/BBK-Vorsorgen-fuer-Krisen-und-Katastrophen.pdf?__blob=publicationFile&v=44' },
    { id: 'sirenen', org: 'BBK', title: 'Sirenen', date: READ, url: 'https://www.bbk.bund.de/DE/Warnung-Vorsorge/Warnung-in-Deutschland/So-werden-Sie-gewarnt/Sirenen/sirenen_node.html' },
    { id: 'nina', org: 'BBK', title: 'Warn-App NINA', date: READ, url: 'https://www.bbk.bund.de/DE/Warnung-Vorsorge/Warn-App-NINA/warn-app-nina_node.html' },
    { id: 'wt', org: 'BBK', title: 'Bundesweiter Warntag', date: READ, url: 'https://www.bbk.bund.de/DE/Warnung-Vorsorge/Bundesweiter-Warntag/bundesweiter-warntag_node.html' },
  ],
  content: {
    checkedLabel: 'Quellen geprüft am',
    policy: { label: 'So arbeiten wir', href: '/de/redaktionelle-richtlinien/' },
    shortTitle: 'Kurz gesagt',
    faqTitle: 'Häufige Fragen',
    sourcesTitle: 'Quellen',
    sourcesNote: 'Jede Aussage oben stammt von einer dieser Seiten. Kit-72 ist keine Behördenseite; im Ernstfall gelten die Anweisungen der Behörden und der Einsatzkräfte.',
    title: 'Sirene, Handy-Warnung, NINA: so wirst du gewarnt',
    description: 'Was der Sirenenton bedeutet, wie die Warn-App NINA funktioniert, wann der Bundesweite Warntag ist und was du tust, wenn Strom und Mobilfunk ausfallen.',
    h1: 'So wirst du in Deutschland gewarnt',
    crumb: 'Warnung',
    image: { src: '/images/shared/siren.webp', alt: 'Modell einer Warnsirene auf einem Mast, daneben ein batteriebetriebenes Radio und ein Hausschlüssel' },
    short: [
      'Die Behörden warnen über mehrere Kanäle. Die meisten Informationen kommen über Warn-Apps und Radio; in besonderen Gefahrenlagen wird zusätzlich über Sirenen und Handys gewarnt.{ratgeber}',
      'Ein Heulton von einer Minute, der an- und abschwillt, bedeutet: Es besteht Gefahr, informiere dich. Ein Dauerton von einer Minute bedeutet: Die Gefahr ist vorbei.{ratgeber}',
      'Geprobt wird am Bundesweiten Warntag, in der Regel am zweiten Donnerstag im September. Der nächste ist am 9. September 2027.{wt}',
    ],
    sections: [
      {
        id: 'sirene',
        heading: 'Was bedeuten die Sirenensignale?',
        paragraphs: ['Seit einem Beschluss der Innenministerkonferenz von 2019 gelten in Deutschland einheitlich diese zwei Signale:{sirenen}'],
        table: {
          head: ['Signal', 'Ton', 'Bedeutung'],
          rows: [
            ['Warnung', 'Eine Minute Heulton, auf- und abschwellend', 'Es besteht Gefahr. Informiere dich.{ratgeber}'],
            ['Entwarnung', 'Eine Minute gleichbleibender Dauerton', 'Die Gefahr ist vorbei.{ratgeber}'],
          ],
        },
        after: [
          'Die Sirene sagt dir nicht, was los ist. Sie weist auf eine Gefahr hin; was genau passiert und was du tun sollst, erfährst du danach über andere Quellen, zum Beispiel Radio oder Warn-App.{sirenen}',
          'Öffentliche Sirenen gehören den Kommunen. Sie beschaffen, betreiben und warten sie, und manche nutzen für andere Ereignisse eigene Signale. Frag deshalb bei deiner Gemeinde nach, ob es bei dir Sirenen gibt und welche Signale gelten.{sirenen}',
        ],
      },
      {
        id: 'verhalten',
        heading: 'Was tust du, wenn gewarnt wird?',
        paragraphs: ['Das rät das BBK:{ratgeber}'],
        bullets: [
          'Nimm amtliche Warnungen ernst. Sie enthalten wichtige Informationen, um dich und andere zu schützen.',
          'Gib Warnungen weiter: an Nachbarschaft, Freundeskreis und Familie. Vielleicht haben nicht alle die Information erhalten.',
          'Bleib erreichbar, wenn du von einer Krise betroffen bist. Halte zum Beispiel dein Handy auch nachts empfangsbereit.',
        ],
        after: ['Was bei einzelnen Gefahren zu tun ist, steht in unseren <a href="/de/szenarien/">Szenarien</a>, etwa für <a href="/de/szenarien/hochwasser/">Hochwasser</a> oder eine <a href="/de/szenarien/evakuierung/">Evakuierung</a>.'],
      },
      {
        id: 'nina',
        heading: 'Die Warn-App NINA',
        paragraphs: [
          'NINA ist die Warn-App des Bundes. Wichtig: Abonniere in der App die Gebiete und Orte, für die du gewarnt werden willst, am besten deinen Wohnort und den Ort deines Arbeits- oder Ausbildungsplatzes. Sonst bekommst du keine Warnung auf dein Smartphone.{nina}',
          'Auf Wunsch warnt die App auch für deinen aktuellen Standort. Damit die Meldungen als Push-Benachrichtigung ankommen, müssen bestimmte Einstellungen auf dem Smartphone stimmen; das BBK beschreibt sie auf seiner Seite.{nina}',
          'In der App findest du außerdem die Wetterwarnungen des Deutschen Wetterdienstes und die Hochwasserinformationen des länderübergreifenden Hochwasserportals.{nina}',
        ],
      },
      {
        id: 'warntag',
        heading: 'Der Bundesweite Warntag',
        paragraphs: [
          'Am Warntag proben Bund, Länder und Kommunen gemeinsam. Er findet in der Regel jedes Jahr am zweiten Donnerstag im September statt. 2026 war das der 10. September, der nächste ist am 9. September 2027.{wt}',
          'Ab 11 Uhr geht eine Probewarnung an alle angeschlossenen Stellen, zum Beispiel Rundfunksender und App-Server. Sie geben sie zeitversetzt weiter an Fernseher, Radios und Smartphones. Parallel können Länder, Landkreise und Kommunen ihre eigenen Warnmittel auslösen, etwa Sirenen oder Lautsprecherwagen. Gegen 11:45 Uhr folgt die Entwarnung.{wt}',
          'Laute Signale können Kindern, älteren Menschen oder Geflüchteten aus Kriegsgebieten Angst machen. Sag ihnen vorher, dass es eine Probe ist.{wt}',
        ],
      },
      {
        id: 'ausfall',
        heading: 'Wenn Strom oder Mobilfunk ausfallen',
        paragraphs: [
          'Bei einem Stromausfall oder einem Ausfall des Mobilfunknetzes funktionieren viele Warnkanäle nicht. Fallen Mobilfunk und Internet aus, fallen auch Warn-Apps und Handy-Warnungen aus. Radiosender funktionieren dann noch.{ratgeber}',
          'Deshalb gehört ein Radio in jeden Haushalt, das keinen Strom aus der Steckdose braucht: ein batteriebetriebenes Radio, ein Kurbelradio oder das Autoradio.{ratgeber}',
          'Funktionieren die Notrufnummern 110 und 112 nicht mehr, geh bei einem Notfall wenn möglich zur nächsten Polizeiwache oder ins Krankenhaus. Es hilft, vorher zu wissen, wo du dich vor Ort informieren kannst, zum Beispiel im Rathaus oder an einem Notfalltreffpunkt.{ratgeber}',
        ],
      },
    ],
    doTitle: 'Was du jetzt tun kannst',
    doLead: 'Vier Dinge, in einer Viertelstunde erledigt:',
    doSteps: [
      { text: 'Lade die Warn-App NINA und abonniere deinen Wohnort und deinen Arbeitsort.' },
      { text: 'Frag bei deiner Gemeinde nach, ob es Sirenen gibt und welche Signale gelten.' },
      { text: 'Besorg ein Radio, das ohne Steckdose läuft, und notiere die UKW-Frequenzen deiner Regionalsender.', href: '/de/produkte/notfallradio/', link: 'Worauf es beim Notfallradio ankommt' },
      { text: 'Leg einen Vorrat an: möglichst für zehn Tage, mindestens für drei.', href: '/de/bbk-notfallvorsorge/', link: 'Was das BBK empfiehlt' },
    ],
    cta: { label: 'Berechne, was dein Haushalt braucht', href: '/de/' },
    faq: [
      { q: 'Was bedeutet ein einminütiger Heulton der Sirene?', a: 'Ein Heulton von einer Minute, der an- und abschwillt, ist die Warnung: Es besteht Gefahr, informiere dich, zum Beispiel über Radio oder Warn-App.' },
      { q: 'Wie klingt die Entwarnung?', a: 'Ein gleichbleibender Dauerton von einer Minute. Er bedeutet: Die Gefahr ist vorbei.' },
      { q: 'Wann ist der nächste Bundesweite Warntag?', a: 'Am 9. September 2027. Der Warntag findet in der Regel jedes Jahr am zweiten Donnerstag im September statt; die Probewarnung beginnt um 11 Uhr, die Entwarnung folgt gegen 11:45 Uhr.' },
      { q: 'Warnt mich die NINA-App automatisch?', a: 'Nur, wenn du Orte abonniert oder die Standort-Warnung aktiviert hast. Ohne abonnierte Orte bekommst du keine Warnung.' },
      { q: 'Gibt es überall Sirenen?', a: 'Das ist von Ort zu Ort verschieden. Öffentliche Sirenen werden von den Kommunen betrieben; ob es bei dir welche gibt, erfährst du bei deiner Gemeinde.' },
      { q: 'Wie werde ich gewarnt, wenn der Strom ausfällt?', a: 'Warn-Apps und Handy-Warnungen fallen aus, wenn Mobilfunk und Internet nicht mehr funktionieren. Radiosender senden weiter. Darum rät das BBK zu einem Radio mit Batterien oder Kurbel.' },
    ],
  },
};
