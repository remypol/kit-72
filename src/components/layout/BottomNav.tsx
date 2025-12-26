/**
 * BottomNav Component
 *
 * Sticky bottom navigation for mobile devices.
 * Hub-style navigation pattern focused on action.
 *
 * Features:
 * - 5 navigation items with locale support (ES, NL, DE)
 * - Scenarios opens bottom sheet with emergency scenarios
 * - Mi Kit is direct link to personal kit dashboard
 * - More opens bottom sheet with guides, products, etc.
 * - Search opens a search modal
 * - Active state based on current path
 * - Hidden on desktop (>768px)
 */

import { useState, useCallback, useEffect } from 'react';
import BottomSheet from './BottomSheet';
import SearchModal from './SearchModal';

interface BottomNavProps {
  currentPath: string;
  locale?: 'es' | 'nl' | 'de';
}

interface NavContent {
  ariaLabel: string;
  homeLabel: string;
  homeHref: string;
  scenariosLabel: string;
  scenariosTitle: string;
  scenariosFooterLabel: string;
  scenariosHref: string;
  myKitLabel: string;
  myKitHref: string;
  searchLabel: string;
  moreLabel: string;
  moreTitle: string;
  moreFooterLabel: string;
  moreFooterHref: string;
  closeLabel: string;
  scenarioItems: Array<{
    icon: string;
    label: string;
    description: string;
    href: string;
  }>;
  moreItems: Array<{
    icon: string;
    label: string;
    description: string;
    href: string;
  }>;
}

const contentPerLocale: Record<string, NavContent> = {
  es: {
    ariaLabel: 'Navegación principal',
    homeLabel: 'Inicio',
    homeHref: '/es/',
    scenariosLabel: 'Escenarios',
    scenariosTitle: 'Escenarios',
    scenariosFooterLabel: 'Ver todos los escenarios',
    scenariosHref: '/es/escenarios/',
    myKitLabel: 'Mi Kit',
    myKitHref: '/es/herramientas/configurador-kit/',
    searchLabel: 'Buscar',
    moreLabel: 'Más',
    moreTitle: 'Guías y Recursos',
    moreFooterLabel: 'Ver productos recomendados',
    moreFooterHref: '/es/componentes/',
    closeLabel: 'Cerrar',
    scenarioItems: [
      {
        icon: 'Zap',
        label: 'Apagón',
        description: 'Cortes de luz de 24h a varios días',
        href: '/es/escenarios/prepararse-apagon/',
      },
      {
        icon: 'Sun',
        label: 'Ola de Calor',
        description: 'Hidratación y refrigeración',
        href: '/es/escenarios/prepararse-ola-calor/',
      },
      {
        icon: 'Droplet',
        label: 'Corte de Agua',
        description: 'Almacenamiento y uso eficiente',
        href: '/es/escenarios/prepararse-corte-agua/',
      },
      {
        icon: 'Car',
        label: 'Evacuación',
        description: 'Qué llevar si tienes que salir',
        href: '/es/escenarios/kit-evacuacion/',
      },
    ],
    moreItems: [
      {
        icon: 'Package',
        label: 'Kit de Emergencia',
        description: 'Guía completa',
        href: '/es/kit-de-emergencia/',
      },
      {
        icon: 'Backpack',
        label: 'Kit 72 Horas',
        description: 'Mochila BOB',
        href: '/es/kit-72-horas/',
      },
      {
        icon: 'Droplets',
        label: 'Almacenamiento de Agua',
        description: 'Cómo almacenar agua',
        href: '/es/guias/almacenamiento-agua/',
      },
      {
        icon: 'Utensils',
        label: 'Almacenamiento de Comida',
        description: 'Alimentos de larga duración',
        href: '/es/guias/almacenamiento-comida/',
      },
      {
        icon: 'Radio',
        label: 'Energía y Comunicación',
        description: 'Mantente conectado',
        href: '/es/guias/energia-comunicacion/',
      },
      {
        icon: 'Heart',
        label: 'Botiquín de Primeros Auxilios',
        description: 'Suministros médicos',
        href: '/es/guias/botiquin-primeros-auxilios/',
      },
    ],
  },
  nl: {
    ariaLabel: 'Hoofdnavigatie',
    homeLabel: 'Home',
    homeHref: '/nl/',
    scenariosLabel: "Scenario's",
    scenariosTitle: "Scenario's",
    scenariosFooterLabel: "Alle scenario's bekijken",
    scenariosHref: '/nl/scenario/',
    myKitLabel: 'Mijn Pakket',
    myKitHref: '/nl/tools/noodpakket-samenstellen/',
    searchLabel: 'Zoeken',
    moreLabel: 'Meer',
    moreTitle: 'Gidsen en Hulpmiddelen',
    moreFooterLabel: 'Bekijk alle producten',
    moreFooterHref: '/nl/producten/',
    closeLabel: 'Sluiten',
    scenarioItems: [
      {
        icon: 'Zap',
        label: 'Stroomstoring',
        description: 'Stroomuitval van 24 uur tot meerdere dagen',
        href: '/nl/scenario/stroomstoring/',
      },
      {
        icon: 'Sun',
        label: 'Hittegolf',
        description: 'Hydratatie en koeling',
        href: '/nl/scenario/hittegolf/',
      },
      {
        icon: 'Droplet',
        label: 'Wateruitval',
        description: 'Opslag en efficiënt gebruik',
        href: '/nl/scenario/wateruitval/',
      },
      {
        icon: 'Waves',
        label: 'Overstroming',
        description: 'Voorbereiden op hoogwater',
        href: '/nl/scenario/overstroming/',
      },
      {
        icon: 'Car',
        label: 'Evacuatie',
        description: 'Wat mee te nemen als je moet vertrekken',
        href: '/nl/scenario/evacuatie/',
      },
      {
        icon: 'Shield',
        label: 'Cyberaanval',
        description: 'Digitale verstoring en uitval',
        href: '/nl/scenario/cyberaanval/',
      },
    ],
    moreItems: [
      {
        icon: 'Package',
        label: 'Noodpakket Samenstellen',
        description: 'Complete gids',
        href: '/nl/noodpakket-samenstellen/',
      },
      {
        icon: 'Backpack',
        label: 'Noodpakket 72 Uur',
        description: 'Noodtas voor 3 dagen',
        href: '/nl/noodpakket-72-uur/',
      },
      {
        icon: 'Droplets',
        label: 'Water Opslaan',
        description: 'Hoe je water opslaat',
        href: '/nl/gidsen/water-opslaan/',
      },
      {
        icon: 'Utensils',
        label: 'Voedsel Opslaan',
        description: 'Langdurig houdbaar voedsel',
        href: '/nl/gidsen/voedsel-opslaan/',
      },
      {
        icon: 'Radio',
        label: 'Energie & Communicatie',
        description: 'Blijf verbonden',
        href: '/nl/gidsen/energie-communicatie/',
      },
      {
        icon: 'Heart',
        label: 'EHBO-kit',
        description: 'Medische voorraad',
        href: '/nl/gidsen/ehbo-kit/',
      },
    ],
  },
  de: {
    ariaLabel: 'Hauptnavigation',
    homeLabel: 'Startseite',
    homeHref: '/de/',
    scenariosLabel: 'Szenarien',
    scenariosTitle: 'Szenarien',
    scenariosFooterLabel: 'Alle Szenarien anzeigen',
    scenariosHref: '/de/szenarien/',
    myKitLabel: 'Mein Paket',
    myKitHref: '/de/tools/notfallpaket-zusammenstellen/',
    searchLabel: 'Suchen',
    moreLabel: 'Mehr',
    moreTitle: 'Ratgeber und Ressourcen',
    moreFooterLabel: 'Alle Produkte anzeigen',
    moreFooterHref: '/de/produkte/',
    closeLabel: 'Schließen',
    scenarioItems: [
      {
        icon: 'Zap',
        label: 'Stromausfall',
        description: 'Stromausfälle von 24h bis mehrere Tage',
        href: '/de/szenarien/stromausfall/',
      },
      {
        icon: 'Sun',
        label: 'Hitzewelle',
        description: 'Flüssigkeitszufuhr und Kühlung',
        href: '/de/szenarien/hitzewelle/',
      },
      {
        icon: 'Droplet',
        label: 'Wasserausfall',
        description: 'Lagerung und effiziente Nutzung',
        href: '/de/szenarien/wasserausfall/',
      },
      {
        icon: 'Car',
        label: 'Evakuierung',
        description: 'Was mitnehmen wenn Sie gehen müssen',
        href: '/de/szenarien/evakuierung/',
      },
    ],
    moreItems: [
      {
        icon: 'Package',
        label: 'Notfallausrüstung',
        description: 'Kompletter Ratgeber',
        href: '/de/notfallausruestung/',
      },
      {
        icon: 'Backpack',
        label: 'Notfallpaket 72 Stunden',
        description: 'Notfallrucksack für 3 Tage',
        href: '/de/notfallpaket-72-stunden/',
      },
      {
        icon: 'Droplets',
        label: 'Wasser Lagerung',
        description: 'Wie man Wasser lagert',
        href: '/de/ratgeber/wasser-lagerung/',
      },
      {
        icon: 'Utensils',
        label: 'Lebensmittel Lagerung',
        description: 'Langlebige Lebensmittel',
        href: '/de/ratgeber/lebensmittel-lagerung/',
      },
      {
        icon: 'Radio',
        label: 'Energie & Kommunikation',
        description: 'Bleiben Sie verbunden',
        href: '/de/ratgeber/energie-kommunikation/',
      },
      {
        icon: 'Heart',
        label: 'Erste-Hilfe-Set',
        description: 'Medizinische Vorräte',
        href: '/de/ratgeber/erste-hilfe-set/',
      },
    ],
  },
};

// Icon SVG paths (inline for performance)
const icons: Record<string, string> = {
  Home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  Zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  ClipboardCheck: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  Menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
};

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const path = icons[name];
  if (!path) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g dangerouslySetInnerHTML={{ __html: path }} />
    </svg>
  );
}

export default function BottomNav({ currentPath, locale = 'es' }: BottomNavProps) {
  const [scenariosOpen, setScenariosOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const content = contentPerLocale[locale] || contentPerLocale.es;

  // Determine active section based on path
  const getActiveSection = useCallback(() => {
    const langPrefix = `/${locale}/`;
    if (currentPath === langPrefix || currentPath === `/${locale}`) return 'inicio';
    if (currentPath.includes('/escenarios/') || currentPath.includes('/scenario/') || currentPath.includes('/szenarien/')) return 'escenarios';
    if (currentPath.includes('/herramientas/configurador') || currentPath.includes('/tools/noodpakket-samenstellen') || currentPath.includes('/tools/notfallpaket-zusammenstellen') || currentPath.includes('/mi-kit')) return 'mikit';
    if (currentPath.includes('/guias/') || currentPath.includes('/gidsen/') || currentPath.includes('/ratgeber/') ||
        currentPath.includes('/kit-de-emergencia') || currentPath.includes('/noodpakket-samenstellen') || currentPath.includes('/notfallausruestung') ||
        currentPath.includes('/kit-72-horas') || currentPath.includes('/noodpakket-72-uur') || currentPath.includes('/notfallpaket-72-stunden') ||
        currentPath.includes('/componentes/') || currentPath.includes('/producten/') || currentPath.includes('/produkte/') ||
        currentPath.includes('/herramientas/') || currentPath.includes('/tools/')) return 'more';
    return '';
  }, [currentPath, locale]);

  const activeSection = getActiveSection();

  // Close sheets when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setScenariosOpen(false);
        setMoreOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleScenariosClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setScenariosOpen(true);
    setMoreOpen(false);
    setSearchOpen(false);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMoreOpen(true);
    setScenariosOpen(false);
    setSearchOpen(false);
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchOpen(true);
    setScenariosOpen(false);
    setMoreOpen(false);
  };

  return (
    <>
      <nav className="bottom-nav" aria-label={content.ariaLabel}>
        {/* Home */}
        <a
          href={content.homeHref}
          className={`bottom-nav-item ${activeSection === 'inicio' ? 'active' : ''}`}
        >
          <span className="bottom-nav-item-icon">
            <Icon name="Home" size={24} />
          </span>
          <span className="bottom-nav-item-label">{content.homeLabel}</span>
        </a>

        {/* Scenarios - opens bottom sheet */}
        <button
          type="button"
          className={`bottom-nav-item ${activeSection === 'escenarios' ? 'active' : ''}`}
          onClick={handleScenariosClick}
          aria-expanded={scenariosOpen}
          aria-haspopup="dialog"
        >
          <span className="bottom-nav-item-icon">
            <Icon name="Zap" size={24} />
          </span>
          <span className="bottom-nav-item-label">{content.scenariosLabel}</span>
        </button>

        {/* My Kit - direct link to kit configurator/dashboard */}
        <a
          href={content.myKitHref}
          className={`bottom-nav-item ${activeSection === 'mikit' ? 'active' : ''}`}
        >
          <span className="bottom-nav-item-icon">
            <Icon name="ClipboardCheck" size={24} />
          </span>
          <span className="bottom-nav-item-label">{content.myKitLabel}</span>
        </a>

        {/* Search - opens search modal */}
        <button
          type="button"
          className="bottom-nav-item"
          onClick={handleSearchClick}
          aria-expanded={searchOpen}
          aria-haspopup="dialog"
        >
          <span className="bottom-nav-item-icon">
            <Icon name="Search" size={24} />
          </span>
          <span className="bottom-nav-item-label">{content.searchLabel}</span>
        </button>

        {/* More - opens bottom sheet with guides and more */}
        <button
          type="button"
          className={`bottom-nav-item ${activeSection === 'more' ? 'active' : ''}`}
          onClick={handleMoreClick}
          aria-expanded={moreOpen}
          aria-haspopup="dialog"
        >
          <span className="bottom-nav-item-icon">
            <Icon name="Menu" size={24} />
          </span>
          <span className="bottom-nav-item-label">{content.moreLabel}</span>
        </button>
      </nav>

      {/* Bottom Sheets */}
      <BottomSheet
        isOpen={scenariosOpen}
        onClose={() => setScenariosOpen(false)}
        title={content.scenariosTitle}
        items={content.scenarioItems}
        footerLink={{
          label: content.scenariosFooterLabel,
          href: content.scenariosHref,
        }}
        closeLabel={content.closeLabel}
      />

      <BottomSheet
        isOpen={moreOpen}
        onClose={() => setMoreOpen(false)}
        title={content.moreTitle}
        items={content.moreItems}
        footerLink={{
          label: content.moreFooterLabel,
          href: content.moreFooterHref,
        }}
        closeLabel={content.closeLabel}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        locale={locale}
      />
    </>
  );
}
