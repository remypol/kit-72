/**
 * Centralized hreflang mapping for international SEO
 *
 * This file defines the relationships between equivalent pages across locales.
 * Used by BaseLayout to generate proper hreflang tags.
 *
 * Benefits:
 * - Single source of truth for URL mappings
 * - Easy to add new languages
 * - Validates bidirectional relationships
 * - Future-proof for DE and other locales
 */

export type Locale = 'es' | 'nl' | 'de';

interface PageMapping {
  es?: string;
  nl?: string;
  de?: string;
}

/**
 * Map of page identifiers to their locale-specific URLs
 * Key: unique identifier for the page concept
 * Value: object with locale keys and URL paths (without domain)
 */
export const hreflangMap: Record<string, PageMapping> = {
  // === HOMEPAGES ===
  'home': {
    es: '/es/',
    nl: '/nl/',
    de: '/de/',
  },

  // === PILLAR PAGES ===
  'kit-72-hours': {
    es: '/es/kit-72-horas/',
    nl: '/nl/noodpakket-72-uur/',
    de: '/de/notfallpaket-72-stunden/',
  },
  'emergency-kit': {
    es: '/es/kit-de-emergencia/',
    nl: '/nl/noodpakket-samenstellen/',
    de: '/de/notfallausruestung/',
  },

  // === SCENARIO HUB ===
  'scenarios-hub': {
    es: '/es/escenarios/',
    nl: '/nl/scenario/',
    de: '/de/szenarien/',
  },

  // === SCENARIOS ===
  'scenario-power-outage': {
    es: '/es/escenarios/prepararse-apagon/',
    nl: '/nl/scenario/stroomstoring/',
    de: '/de/szenarien/stromausfall/',
  },
  'scenario-heat-wave': {
    es: '/es/escenarios/prepararse-ola-calor/',
    nl: '/nl/scenario/hittegolf/',
    de: '/de/szenarien/hitzewelle/',
  },
  'scenario-water-outage': {
    es: '/es/escenarios/prepararse-corte-agua/',
    nl: '/nl/scenario/wateruitval/',
    de: '/de/szenarien/wasserausfall/',
  },
  'scenario-evacuation': {
    es: '/es/escenarios/kit-evacuacion/',
    nl: '/nl/scenario/evacuatie/',
    de: '/de/szenarien/evakuierung/',
  },
  // NL-specific scenarios (no ES equivalent)
  'scenario-flooding': {
    nl: '/nl/scenario/overstroming/',
    de: '/de/szenarien/hochwasser/',
  },
  'scenario-cyber-attack': {
    nl: '/nl/scenario/cyberaanval/',
    de: '/de/szenarien/cyberangriff/',
  },

  // === GUIDES HUB ===
  'guides-hub': {
    es: '/es/guias/',
    nl: '/nl/gidsen/',
    de: '/de/ratgeber/',
  },

  // === GUIDES ===
  'guide-water-storage': {
    es: '/es/guias/almacenamiento-agua/',
    nl: '/nl/gidsen/water-opslaan/',
    de: '/de/ratgeber/wasser-lagerung/',
  },
  'guide-food-storage': {
    es: '/es/guias/almacenamiento-comida/',
    nl: '/nl/gidsen/voedsel-opslaan/',
    de: '/de/ratgeber/lebensmittel-lagerung/',
  },
  'guide-first-aid': {
    es: '/es/guias/botiquin-primeros-auxilios/',
    nl: '/nl/gidsen/ehbo-kit/',
    de: '/de/ratgeber/erste-hilfe-set/',
  },
  'guide-energy-communication': {
    es: '/es/guias/energia-comunicacion/',
    nl: '/nl/gidsen/energie-communicatie/',
    de: '/de/ratgeber/energie-kommunikation/',
  },

  // === PRODUCTS HUB ===
  'products-hub': {
    es: '/es/componentes/',
    nl: '/nl/producten/',
    de: '/de/produkte/',
  },

  // === PRODUCTS ===
  'product-flashlights': {
    es: '/es/componentes/linternas/',
    nl: '/nl/producten/zaklampen/',
    de: '/de/produkte/taschenlampen/',
  },
  'product-powerbanks': {
    es: '/es/componentes/powerbanks/',
    nl: '/nl/producten/powerbanks/',
    de: '/de/produkte/powerbanks/',
  },
  'product-radios': {
    es: '/es/componentes/radios-emergencia/',
    nl: '/nl/producten/noodradio/',
    de: '/de/produkte/notfallradio/',
  },
  'product-water-containers': {
    es: '/es/componentes/bidones-agua/',
    nl: '/nl/producten/wateropslag/',
    de: '/de/produkte/wasserspeicher/',
  },
  'product-emergency-food': {
    es: '/es/componentes/comida-emergencia/',
    nl: '/nl/producten/noodvoedsel/',
    de: '/de/produkte/notnahrung/',
  },
  'product-first-aid-kit': {
    es: '/es/componentes/botiquin-basico/',
    nl: '/nl/producten/ehbo-doos/',
    de: '/de/produkte/erste-hilfe-kasten/',
  },
  'product-bags': {
    es: '/es/componentes/mochilas/',
    nl: '/nl/producten/noodtassen/',
    de: '/de/produkte/notfallrucksack/',
  },

  // === TOOLS HUB ===
  'tools-hub': {
    es: '/es/herramientas/',
    nl: '/nl/tools/',
    de: '/de/tools/',
  },

  // === TOOLS ===
  'tool-kit-builder': {
    es: '/es/herramientas/configurador-kit/',
    nl: '/nl/tools/noodpakket-samenstellen/',
    de: '/de/tools/notfallpaket-zusammenstellen/',
  },
  'tool-water-calculator': {
    es: '/es/herramientas/calculadora-agua/',
    nl: '/nl/tools/water-calculator/',
    de: '/de/tools/wasser-rechner/',
  },
  'tool-power-calculator': {
    es: '/es/herramientas/calculadora-energia/',
    nl: '/nl/tools/energie-calculator/',
    de: '/de/tools/energie-rechner/',
  },

  // === LEGAL PAGES ===
  'legal-privacy': {
    es: '/es/privacidad/',
    nl: '/nl/privacy/',
    de: '/de/datenschutz/',
  },
  'legal-cookies': {
    es: '/es/cookies/',
    nl: '/nl/cookies/',
    de: '/de/cookies/',
  },
  'legal-editorial': {
    es: '/es/politica-editorial/',
    nl: '/nl/redactioneel-beleid/',
    de: '/de/redaktionelle-richtlinien/',
  },
  'legal-affiliate': {
    es: '/es/afiliados/',
    nl: '/nl/affiliate-disclaimer/',
    de: '/de/affiliate-hinweis/',
  },
};

/**
 * Get alternates for a given page URL
 * Returns an object with locale keys and URL paths for all equivalent pages
 */
export function getAlternatesForPath(path: string): Partial<Record<Locale, string>> {
  // Normalize path (ensure trailing slash, remove domain)
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;

  // Find this path in the map
  for (const [, mapping] of Object.entries(hreflangMap)) {
    for (const [locale, url] of Object.entries(mapping)) {
      if (url === normalizedPath) {
        // Return all other locales (not the current one)
        const alternates: Partial<Record<Locale, string>> = {};
        for (const [altLocale, altUrl] of Object.entries(mapping)) {
          if (altLocale !== locale && altUrl) {
            alternates[altLocale as Locale] = altUrl;
          }
        }
        return alternates;
      }
    }
  }

  // No mapping found - return empty (page is locale-specific)
  return {};
}

/**
 * Get all locales that have a version of this page
 */
export function getAvailableLocalesForPath(path: string): Locale[] {
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;

  for (const [, mapping] of Object.entries(hreflangMap)) {
    for (const [, url] of Object.entries(mapping)) {
      if (url === normalizedPath) {
        return Object.keys(mapping) as Locale[];
      }
    }
  }

  // Extract locale from path as fallback
  const pathLocale = normalizedPath.split('/')[1] as Locale;
  return ['es', 'nl', 'de'].includes(pathLocale) ? [pathLocale] : ['es'];
}

/**
 * Check if a path has equivalent pages in other locales
 */
export function hasAlternates(path: string): boolean {
  const alternates = getAlternatesForPath(path);
  return Object.keys(alternates).length > 0;
}
