/**
 * i18n Module
 *
 * Provides type-safe access to translations and locale utilities.
 */

import esTranslations from './es.json';
import nlTranslations from './nl.json';
import deTranslations from './de.json';

export type Locale = 'es' | 'nl' | 'de';

// Use a base type that allows locale-specific variations
export type Translations = typeof esTranslations;

// Allow locale-specific keys by using a less strict type assertion
const translations: Record<Locale, Translations> = {
  es: esTranslations,
  nl: nlTranslations as unknown as Translations,
  de: deTranslations as unknown as Translations,
};

/**
 * Get translations for a specific locale
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.es;
}

/**
 * Get a specific translation key with dot notation
 * Example: t('nav.home', 'es') => 'Inicio'
 */
export function t(key: string, locale: Locale): string {
  const trans = getTranslations(locale);
  const keys = key.split('.');
  let value: unknown = trans;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation key not found: ${key} for locale ${locale}`);
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Locale configuration
 */
export const localeConfig: Record<Locale, { hreflang: string; ogLocale: string; htmlLang: string; name: string; flag: string }> = {
  es: { hreflang: 'es-ES', ogLocale: 'es_ES', htmlLang: 'es', name: 'Español', flag: '🇪🇸' },
  nl: { hreflang: 'nl-NL', ogLocale: 'nl_NL', htmlLang: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  de: { hreflang: 'de-DE', ogLocale: 'de_DE', htmlLang: 'de', name: 'Deutsch', flag: '🇩🇪' },
};

/**
 * All supported locales
 */
export const supportedLocales: Locale[] = ['es', 'nl', 'de'];

/**
 * Default locale
 */
export const defaultLocale: Locale = 'es';

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

/**
 * Detect locale from URL path
 */
export function detectLocaleFromPath(pathname: string): Locale {
  const pathLocale = pathname.split('/')[1];
  return isValidLocale(pathLocale) ? pathLocale : defaultLocale;
}
