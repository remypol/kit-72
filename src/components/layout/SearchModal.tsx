/**
 * SearchModal Component
 *
 * Full-screen search modal for mobile, command palette style for desktop.
 * Searches through site pages and shows results grouped by category.
 *
 * Features:
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Recent searches stored locally
 * - Grouped results by section
 * - Full screen on mobile
 * - Multi-locale support (ES, NL, DE)
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: 'es' | 'nl' | 'de';
}

interface SearchResult {
  title: string;
  path: string;
  category: string;
  description?: string;
}

interface SearchContent {
  placeholder: string;
  ariaLabel: string;
  closeLabel: string;
  noResults: string;
  popularPages: string;
  navigate: string;
  select: string;
  close: string;
  pages: SearchResult[];
}

const contentPerLocale: Record<string, SearchContent> = {
  es: {
    placeholder: 'Buscar en Kit-72...',
    ariaLabel: 'Buscar',
    closeLabel: 'Cerrar',
    noResults: 'No se encontraron resultados para',
    popularPages: 'Páginas populares',
    navigate: 'navegar',
    select: 'seleccionar',
    close: 'cerrar',
    pages: [
      // Main
      { title: 'Inicio', path: '/es/', category: 'Principal', description: 'Página principal' },

      // Guías principales
      { title: 'Kit de Emergencia', path: '/es/kit-de-emergencia/', category: 'Guías', description: 'Guía completa de preparación' },
      { title: 'Kit 72 Horas', path: '/es/kit-72-horas/', category: 'Guías', description: 'Mochila de emergencia BOB' },
      { title: 'Almacenamiento de Agua', path: '/es/guias/almacenamiento-agua/', category: 'Guías', description: 'Cómo almacenar agua potable' },
      { title: 'Almacenamiento de Comida', path: '/es/guias/almacenamiento-comida/', category: 'Guías', description: 'Alimentos de larga duración' },
      { title: 'Energía y Comunicación', path: '/es/guias/energia-comunicacion/', category: 'Guías', description: 'Mantente conectado' },
      { title: 'Botiquín de Primeros Auxilios', path: '/es/guias/botiquin-primeros-auxilios/', category: 'Guías', description: 'Suministros médicos esenciales' },

      // Escenarios
      { title: 'Escenarios de Emergencia', path: '/es/escenarios/', category: 'Escenarios', description: 'Todos los escenarios' },
      { title: 'Prepararse para un Apagón', path: '/es/escenarios/prepararse-apagon/', category: 'Escenarios', description: 'Corte de electricidad' },
      { title: 'Prepararse para Ola de Calor', path: '/es/escenarios/prepararse-ola-calor/', category: 'Escenarios', description: 'Temperaturas extremas' },
      { title: 'Prepararse para Corte de Agua', path: '/es/escenarios/prepararse-corte-agua/', category: 'Escenarios', description: 'Interrupción del suministro' },
      { title: 'Kit de Evacuación', path: '/es/escenarios/kit-evacuacion/', category: 'Escenarios', description: 'Salida de emergencia' },

      // Herramientas
      { title: 'Herramientas', path: '/es/herramientas/', category: 'Herramientas', description: 'Calculadoras y configuradores' },
      { title: 'Configurador de Kit', path: '/es/herramientas/configurador-kit/', category: 'Herramientas', description: 'Crea tu lista personalizada' },
      { title: 'Calculadora de Agua', path: '/es/herramientas/calculadora-agua/', category: 'Herramientas', description: 'Calcula cuánta agua necesitas' },
      { title: 'Calculadora de Energía', path: '/es/herramientas/calculadora-energia/', category: 'Herramientas', description: 'Qué powerbank necesitas' },

      // Componentes
      { title: 'Componentes del Kit', path: '/es/componentes/', category: 'Componentes', description: 'Todos los componentes' },
      { title: 'Linternas de Emergencia', path: '/es/componentes/linternas/', category: 'Componentes', description: 'Iluminación de respaldo' },
      { title: 'Powerbanks', path: '/es/componentes/powerbanks/', category: 'Componentes', description: 'Baterías portátiles' },
      { title: 'Radios de Emergencia', path: '/es/componentes/radios-emergencia/', category: 'Componentes', description: 'Comunicación sin internet' },
      { title: 'Bidones de Agua', path: '/es/componentes/bidones-agua/', category: 'Componentes', description: 'Almacenamiento de agua' },
      { title: 'Comida de Emergencia', path: '/es/componentes/comida-emergencia/', category: 'Componentes', description: 'Alimentos de larga duración' },
      { title: 'Botiquín Básico', path: '/es/componentes/botiquin-basico/', category: 'Componentes', description: 'Kit de primeros auxilios' },
      { title: 'Mochilas de Emergencia', path: '/es/componentes/mochilas/', category: 'Componentes', description: 'Mochilas para kit 72h' },
    ],
  },
  nl: {
    placeholder: 'Zoeken op Kit-72...',
    ariaLabel: 'Zoeken',
    closeLabel: 'Sluiten',
    noResults: 'Geen resultaten gevonden voor',
    popularPages: 'Populaire pagina\'s',
    navigate: 'navigeren',
    select: 'selecteren',
    close: 'sluiten',
    pages: [
      // Hoofdpagina
      { title: 'Home', path: '/nl/', category: 'Hoofdpagina', description: 'Startpagina' },

      // Hoofdgidsen
      { title: 'Noodpakket Samenstellen', path: '/nl/noodpakket-samenstellen/', category: 'Gidsen', description: 'Complete gids voor voorbereiding' },
      { title: 'Noodpakket 72 Uur', path: '/nl/noodpakket-72-uur/', category: 'Gidsen', description: 'Noodtas voor 3 dagen' },
      { title: 'Water Opslaan', path: '/nl/gidsen/water-opslaan/', category: 'Gidsen', description: 'Hoe je drinkwater opslaat' },
      { title: 'Voedsel Opslaan', path: '/nl/gidsen/voedsel-opslaan/', category: 'Gidsen', description: 'Langdurig houdbaar voedsel' },
      { title: 'Energie & Communicatie', path: '/nl/gidsen/energie-communicatie/', category: 'Gidsen', description: 'Blijf verbonden' },
      { title: 'EHBO-kit', path: '/nl/gidsen/ehbo-kit/', category: 'Gidsen', description: 'Essentiële medische benodigdheden' },

      // Scenario's
      { title: "Alle Scenario's", path: '/nl/scenario/', category: "Scenario's", description: "Overzicht van alle scenario's" },
      { title: 'Stroomstoring', path: '/nl/scenario/stroomstoring/', category: "Scenario's", description: 'Stroomuitval voorbereiden' },
      { title: 'Hittegolf', path: '/nl/scenario/hittegolf/', category: "Scenario's", description: 'Extreme temperaturen' },
      { title: 'Wateruitval', path: '/nl/scenario/wateruitval/', category: "Scenario's", description: 'Onderbreking watervoorziening' },
      { title: 'Overstroming', path: '/nl/scenario/overstroming/', category: "Scenario's", description: 'Voorbereiden op hoogwater' },
      { title: 'Evacuatie', path: '/nl/scenario/evacuatie/', category: "Scenario's", description: 'Nooduitgang en vluchten' },
      { title: 'Cyberaanval', path: '/nl/scenario/cyberaanval/', category: "Scenario's", description: 'Digitale verstoring' },

      // Tools
      { title: 'Tools', path: '/nl/tools/', category: 'Tools', description: 'Calculators en hulpmiddelen' },
      { title: 'Noodpakket Samenstellen', path: '/nl/tools/noodpakket-samenstellen/', category: 'Tools', description: 'Maak je eigen checklist' },
      { title: 'Water Calculator', path: '/nl/tools/water-calculator/', category: 'Tools', description: 'Bereken je waterbehoefte' },
      { title: 'Energie Calculator', path: '/nl/tools/energie-calculator/', category: 'Tools', description: 'Welke powerbank heb je nodig' },

      // Producten
      { title: 'Producten', path: '/nl/producten/', category: 'Producten', description: 'Alle aanbevolen producten' },
      { title: 'Zaklampen', path: '/nl/producten/zaklampen/', category: 'Producten', description: 'Noodverlichting' },
      { title: 'Powerbanks', path: '/nl/producten/powerbanks/', category: 'Producten', description: 'Draagbare batterijen' },
      { title: 'Noodradio', path: '/nl/producten/noodradio/', category: 'Producten', description: 'Communicatie zonder internet' },
      { title: 'Wateropslag', path: '/nl/producten/wateropslag/', category: 'Producten', description: 'Watercontainers' },
      { title: 'Noodvoedsel', path: '/nl/producten/noodvoedsel/', category: 'Producten', description: 'Langdurig houdbaar eten' },
      { title: 'EHBO-doos', path: '/nl/producten/ehbo-doos/', category: 'Producten', description: 'Verbandmiddelen' },
      { title: 'Noodtassen', path: '/nl/producten/noodtassen/', category: 'Producten', description: 'Rugzakken voor noodpakket' },
    ],
  },
  de: {
    placeholder: 'Auf Kit-72 suchen...',
    ariaLabel: 'Suchen',
    closeLabel: 'Schließen',
    noResults: 'Keine Ergebnisse gefunden für',
    popularPages: 'Beliebte Seiten',
    navigate: 'navigieren',
    select: 'auswählen',
    close: 'schließen',
    pages: [
      // Hauptseite
      { title: 'Startseite', path: '/de/', category: 'Hauptseite', description: 'Homepage' },

      // Hauptratgeber
      { title: 'Notfallausrüstung', path: '/de/notfallausruestung/', category: 'Ratgeber', description: 'Kompletter Vorbereitungsratgeber' },
      { title: 'Notfallpaket 72 Stunden', path: '/de/notfallpaket-72-stunden/', category: 'Ratgeber', description: 'Notfalltasche für 3 Tage' },
      { title: 'Wasser Lagerung', path: '/de/ratgeber/wasser-lagerung/', category: 'Ratgeber', description: 'Wie man Trinkwasser lagert' },
      { title: 'Lebensmittel Lagerung', path: '/de/ratgeber/lebensmittel-lagerung/', category: 'Ratgeber', description: 'Lang haltbare Lebensmittel' },
      { title: 'Energie & Kommunikation', path: '/de/ratgeber/energie-kommunikation/', category: 'Ratgeber', description: 'Bleiben Sie verbunden' },
      { title: 'Erste-Hilfe-Set', path: '/de/ratgeber/erste-hilfe-set/', category: 'Ratgeber', description: 'Wichtige medizinische Vorräte' },

      // Szenarien
      { title: 'Alle Szenarien', path: '/de/szenarien/', category: 'Szenarien', description: 'Übersicht aller Szenarien' },
      { title: 'Stromausfall', path: '/de/szenarien/stromausfall/', category: 'Szenarien', description: 'Vorbereitung auf Stromausfall' },
      { title: 'Hitzewelle', path: '/de/szenarien/hitzewelle/', category: 'Szenarien', description: 'Extreme Temperaturen' },
      { title: 'Wasserausfall', path: '/de/szenarien/wasserausfall/', category: 'Szenarien', description: 'Unterbrechung der Wasserversorgung' },
      { title: 'Evakuierung', path: '/de/szenarien/evakuierung/', category: 'Szenarien', description: 'Notausgang und Flucht' },

      // Tools
      { title: 'Tools', path: '/de/tools/', category: 'Tools', description: 'Rechner und Hilfsmittel' },
      { title: 'Notfallpaket Zusammenstellen', path: '/de/tools/notfallpaket-zusammenstellen/', category: 'Tools', description: 'Erstellen Sie Ihre Checkliste' },
      { title: 'Wasser Rechner', path: '/de/tools/wasser-rechner/', category: 'Tools', description: 'Berechnen Sie Ihren Wasserbedarf' },
      { title: 'Energie Rechner', path: '/de/tools/energie-rechner/', category: 'Tools', description: 'Welche Powerbank brauchen Sie' },

      // Produkte
      { title: 'Produkte', path: '/de/produkte/', category: 'Produkte', description: 'Alle empfohlenen Produkte' },
      { title: 'Taschenlampen', path: '/de/produkte/taschenlampen/', category: 'Produkte', description: 'Notbeleuchtung' },
      { title: 'Powerbanks', path: '/de/produkte/powerbanks/', category: 'Produkte', description: 'Tragbare Batterien' },
      { title: 'Notfallradio', path: '/de/produkte/notfallradio/', category: 'Produkte', description: 'Kommunikation ohne Internet' },
      { title: 'Wasserspeicher', path: '/de/produkte/wasserspeicher/', category: 'Produkte', description: 'Wasserbehälter' },
      { title: 'Notnahrung', path: '/de/produkte/notnahrung/', category: 'Produkte', description: 'Lang haltbares Essen' },
      { title: 'Erste-Hilfe-Kasten', path: '/de/produkte/erste-hilfe-kasten/', category: 'Produkte', description: 'Verbandmaterial' },
      { title: 'Notfallrucksack', path: '/de/produkte/notfallrucksack/', category: 'Produkte', description: 'Rucksäcke für Notfallpaket' },
    ],
  },
};

export default function SearchModal({ isOpen, onClose, locale = 'es' }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const content = contentPerLocale[locale] || contentPerLocale.es;

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Search logic
  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = content.pages.filter(
      (page) =>
        page.title.toLowerCase().includes(q) ||
        page.description?.toLowerCase().includes(q) ||
        page.category.toLowerCase().includes(q)
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, [content.pages]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    search(value);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].path;
    }
  };

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  let flatIndex = 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`search-modal-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`search-modal ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={content.ariaLabel}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="search-input-wrapper" role="combobox" aria-expanded={results.length > 0} aria-haspopup="listbox" aria-owns="search-results-list">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={content.placeholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label={content.ariaLabel}
            aria-autocomplete="list"
            aria-controls="search-results-list"
            aria-activedescendant={results[selectedIndex] ? `search-result-${selectedIndex}` : undefined}
          />
          {/* Mobile close button */}
          <button
            type="button"
            className="md:hidden p-2 text-tertiary hover:text-primary"
            onClick={onClose}
            aria-label={content.closeLabel}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div className="search-results" id="search-results-list" role="listbox" aria-label={content.ariaLabel}>
          {query && results.length === 0 && (
            <div className="p-4 text-center text-tertiary" role="status" aria-live="polite">
              {content.noResults} "{query}"
            </div>
          )}

          {Object.entries(groupedResults).map(([category, categoryResults]) => (
            <div key={category} className="mb-4" role="group" aria-label={category}>
              <div className="px-4 py-2 text-xs font-semibold text-tertiary uppercase tracking-wide" id={`category-${category}`}>
                {category}
              </div>
              {categoryResults.map((result) => {
                const currentIndex = flatIndex++;
                return (
                  <a
                    key={result.path}
                    href={result.path}
                    id={`search-result-${currentIndex}`}
                    role="option"
                    aria-selected={currentIndex === selectedIndex}
                    className={`search-result-item ${currentIndex === selectedIndex ? 'selected' : ''}`}
                    onClick={onClose}
                  >
                    <div className="search-result-title">{result.title}</div>
                    {result.description && (
                      <div className="search-result-path">{result.description}</div>
                    )}
                  </a>
                );
              })}
            </div>
          ))}

          {/* Empty state - show popular pages */}
          {!query && (
            <div className="p-4">
              <div className="text-xs font-semibold text-tertiary uppercase tracking-wide mb-2">
                {content.popularPages}
              </div>
              {content.pages.slice(1, 6).map((page) => (
                <a
                  key={page.path}
                  href={page.path}
                  className="search-result-item"
                  onClick={onClose}
                >
                  <div className="search-result-title">{page.title}</div>
                  <div className="search-result-path">{page.description}</div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Keyboard hints - desktop only */}
        <div className="hidden md:flex items-center gap-4 px-4 py-2 border-t border-border-subtle text-xs text-tertiary">
          <span>
            <kbd className="px-1 py-0.5 bg-elevated rounded text-xs">↑↓</kbd> {content.navigate}
          </span>
          <span>
            <kbd className="px-1 py-0.5 bg-elevated rounded text-xs">Enter</kbd> {content.select}
          </span>
          <span>
            <kbd className="px-1 py-0.5 bg-elevated rounded text-xs">Esc</kbd> {content.close}
          </span>
        </div>
      </div>
    </>
  );
}
