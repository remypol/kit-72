/**
 * SearchModal Component
 *
 * Full-screen search modal using Pagefind for real full-text search.
 * Falls back to hardcoded pages if Pagefind is not available.
 *
 * Features:
 * - Real full-text search via Pagefind
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Locale-filtered results (only current language)
 * - Highlighted search excerpts
 * - Full screen on mobile
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: 'es' | 'nl' | 'de';
}

interface PagefindResult {
  id: string;
  url: string;
  content: string;
  word_count: number;
  meta: {
    title?: string;
  };
  excerpt: string;
}

interface SearchResult {
  title: string;
  path: string;
  excerpt?: string;
}

interface SearchContent {
  placeholder: string;
  ariaLabel: string;
  closeLabel: string;
  noResults: string;
  popularPages: string;
  searching: string;
  navigate: string;
  select: string;
  close: string;
  fallbackPages: { title: string; path: string }[];
}

const contentPerLocale: Record<string, SearchContent> = {
  es: {
    placeholder: 'Buscar en Kit-72...',
    ariaLabel: 'Buscar',
    closeLabel: 'Cerrar',
    noResults: 'No se encontraron resultados para',
    popularPages: 'Páginas populares',
    searching: 'Buscando...',
    navigate: 'navegar',
    select: 'seleccionar',
    close: 'cerrar',
    fallbackPages: [
      { title: 'Kit de Emergencia', path: '/es/kit-de-emergencia/' },
      { title: 'Prepararse para un Apagón', path: '/es/escenarios/prepararse-apagon/' },
      { title: 'Almacenamiento de Agua', path: '/es/guias/almacenamiento-agua/' },
      { title: 'Calculadora de Energía', path: '/es/herramientas/calculadora-energia/' },
      { title: 'Configurador de Kit', path: '/es/herramientas/configurador-kit/' },
    ],
  },
  nl: {
    placeholder: 'Zoeken op Kit-72...',
    ariaLabel: 'Zoeken',
    closeLabel: 'Sluiten',
    noResults: 'Geen resultaten gevonden voor',
    popularPages: 'Populaire pagina\'s',
    searching: 'Zoeken...',
    navigate: 'navigeren',
    select: 'selecteren',
    close: 'sluiten',
    fallbackPages: [
      { title: 'Noodpakket Samenstellen', path: '/nl/noodpakket-samenstellen/' },
      { title: 'Stroomstoring', path: '/nl/scenario/stroomstoring/' },
      { title: 'Water Opslaan', path: '/nl/gidsen/water-opslaan/' },
      { title: 'Energie Calculator', path: '/nl/tools/energie-calculator/' },
      { title: 'Noodpakket Samenstellen', path: '/nl/tools/noodpakket-samenstellen/' },
    ],
  },
  de: {
    placeholder: 'Auf Kit-72 suchen...',
    ariaLabel: 'Suchen',
    closeLabel: 'Schließen',
    noResults: 'Keine Ergebnisse gefunden für',
    popularPages: 'Beliebte Seiten',
    searching: 'Suche...',
    navigate: 'navigieren',
    select: 'auswählen',
    close: 'schließen',
    fallbackPages: [
      { title: 'Notfallausrüstung', path: '/de/notfallausruestung/' },
      { title: 'Stromausfall', path: '/de/szenarien/stromausfall/' },
      { title: 'Wasser Lagerung', path: '/de/ratgeber/wasser-lagerung/' },
      { title: 'Energie Rechner', path: '/de/tools/energie-rechner/' },
      { title: 'Notfallpaket Zusammenstellen', path: '/de/tools/notfallpaket-zusammenstellen/' },
    ],
  },
};

// Pagefind type declarations
declare global {
  interface Window {
    pagefind?: {
      search: (query: string, options?: { filters?: Record<string, string> }) => Promise<{
        results: Array<{ data: () => Promise<PagefindResult> }>;
      }>;
      init: () => Promise<void>;
    };
  }
}

export default function SearchModal({ isOpen, onClose, locale = 'es' }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [pagefindLoaded, setPagefindLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const content = contentPerLocale[locale] || contentPerLocale.es;

  // Load Pagefind script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.pagefind) {
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind.js';
      script.async = true;
      script.onload = async () => {
        if (window.pagefind) {
          await window.pagefind.init();
          setPagefindLoaded(true);
        }
      };
      script.onerror = () => {
        console.warn('Pagefind not available, falling back to static search');
      };
      document.head.appendChild(script);
    } else if (window.pagefind) {
      setPagefindLoaded(true);
    }
  }, []);

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

  // Search with Pagefind
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    try {
      if (window.pagefind && pagefindLoaded) {
        const searchResults = await window.pagefind.search(searchQuery);

        // Load full data for top 10 results
        const fullResults = await Promise.all(
          searchResults.results.slice(0, 10).map(async (r) => {
            const data = await r.data();
            return data;
          })
        );

        // Filter by locale (URL must start with /locale/)
        const localePrefix = `/${locale}/`;
        const filteredResults = fullResults
          .filter((r) => r.url.startsWith(localePrefix))
          .map((r) => ({
            title: r.meta.title || r.url,
            path: r.url,
            excerpt: r.excerpt,
          }));

        setResults(filteredResults);
      } else {
        // Fallback: filter popular pages
        const filtered = content.fallbackPages.filter(
          (page) => page.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filtered);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }

    setIsSearching(false);
    setSelectedIndex(0);
  }, [locale, pagefindLoaded, content.fallbackPages]);

  // Debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 150);
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
          {isSearching && (
            <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full opacity-50" />
          )}
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
          {isSearching && (
            <div className="p-4 text-center text-tertiary" role="status" aria-live="polite">
              {content.searching}
            </div>
          )}

          {!isSearching && query && results.length === 0 && (
            <div className="p-4 text-center text-tertiary" role="status" aria-live="polite">
              {content.noResults} "{query}"
            </div>
          )}

          {!isSearching && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <a
                  key={result.path}
                  href={result.path}
                  id={`search-result-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={onClose}
                >
                  <div className="search-result-title">{result.title}</div>
                  {result.excerpt && (
                    <div
                      className="search-result-excerpt"
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Empty state - show popular pages */}
          {!query && !isSearching && (
            <div className="p-4">
              <div className="text-xs font-semibold text-tertiary uppercase tracking-wide mb-2">
                {content.popularPages}
              </div>
              {content.fallbackPages.map((page) => (
                <a
                  key={page.path}
                  href={page.path}
                  className="search-result-item"
                  onClick={onClose}
                >
                  <div className="search-result-title">{page.title}</div>
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

      <style>{`
        .search-result-excerpt {
          font-size: 12px;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-top: 4px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .search-result-excerpt mark {
          background: var(--color-accent-primary);
          color: var(--color-bg-primary);
          padding: 0 2px;
          border-radius: 2px;
        }
      `}</style>
    </>
  );
}
