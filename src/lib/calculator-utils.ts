/**
 * Calculator Utilities
 * Shared logic for Power and Water calculators
 */

// Import translations
import esTranslations from '../i18n/es.json';
import nlTranslations from '../i18n/nl.json';
import deTranslations from '../i18n/de.json';

export type Locale = 'es' | 'nl' | 'de';

// Translation getter
const translationsMap: Record<Locale, typeof esTranslations> = {
  es: esTranslations,
  nl: nlTranslations,
  de: deTranslations,
};

export function getTranslations(locale: Locale) {
  return translationsMap[locale];
}

// Get locale-specific date format
export function getLocaleDateFormat(locale: Locale): string {
  switch (locale) {
    case 'nl': return 'nl-NL';
    case 'de': return 'de-DE';
    case 'es':
    default: return 'es-ES';
  }
}

// Format number with locale
export function formatNumber(value: number, locale: Locale, decimals = 1): string {
  return value.toLocaleString(getLocaleDateFormat(locale), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Ease-out cubic function for animations
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Animation helper for smooth number transitions
export function animateValue(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
): () => void {
  const startTime = performance.now();
  let animationId: number;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = from + (to - from) * eased;

    onUpdate(current);

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };

  animationId = requestAnimationFrame(animate);

  // Return cleanup function
  return () => cancelAnimationFrame(animationId);
}

// Category color palettes
export const categoryColors: Record<string, { bg: string; text: string; bar: string }> = {
  communication: {
    bg: 'from-blue-500/20 to-blue-600/10',
    text: 'text-blue-400',
    bar: 'bg-gradient-to-r from-blue-400 to-blue-500'
  },
  lighting: {
    bg: 'from-amber-500/20 to-amber-600/10',
    text: 'text-amber-400',
    bar: 'bg-gradient-to-r from-amber-400 to-amber-500'
  },
  medical: {
    bg: 'from-rose-500/20 to-rose-600/10',
    text: 'text-rose-400',
    bar: 'bg-gradient-to-r from-rose-400 to-rose-500'
  },
  water: {
    bg: 'from-cyan-500/20 to-cyan-600/10',
    text: 'text-cyan-400',
    bar: 'bg-gradient-to-r from-cyan-400 to-cyan-500'
  },
  other: {
    bg: 'from-slate-500/20 to-slate-600/10',
    text: 'text-slate-400',
    bar: 'bg-gradient-to-r from-slate-400 to-slate-500'
  },
};

// Product recommendation interface
export interface ProductRecommendation {
  id: string;
  name: string;
  capacity: string;
  price: string;
  features: string[];
  url: string;
  bestFor: string;
}

// Calculate storage recommendation
export function getStorageRecommendation(
  totalNeeded: number,
  unit: 'L' | 'Wh'
): { size: string; containers: number } {
  if (unit === 'L') {
    // Water storage
    if (totalNeeded <= 20) {
      return { size: '10L', containers: 2 };
    } else if (totalNeeded <= 40) {
      return { size: '20L', containers: 2 };
    } else {
      const containers = Math.ceil(totalNeeded / 20);
      return { size: '20L', containers };
    }
  } else {
    // Power storage
    if (totalNeeded <= 10000) {
      return { size: '10,000mAh', containers: 1 };
    } else if (totalNeeded <= 20000) {
      return { size: '20,000mAh', containers: 1 };
    } else if (totalNeeded <= 50000) {
      return { size: '50,000mAh', containers: 1 };
    } else {
      const containers = Math.ceil(totalNeeded / 50000);
      return { size: '50,000mAh', containers };
    }
  }
}

// Water calculation constants
export const WATER_CONSTANTS = {
  adultLitersPerDay: 3,
  childLitersPerDay: 2,
  babyLitersPerDay: 1.5,
  dogLitersPerDay: 1,
  catLitersPerDay: 0.3,
} as const;

// Calculate water needs
export function calculateWaterNeeds(params: {
  adults: number;
  children: number;
  babies: number;
  dogs: number;
  cats: number;
  days: number;
}): { total: number; perDay: number } {
  const perDay =
    params.adults * WATER_CONSTANTS.adultLitersPerDay +
    params.children * WATER_CONSTANTS.childLitersPerDay +
    params.babies * WATER_CONSTANTS.babyLitersPerDay +
    params.dogs * WATER_CONSTANTS.dogLitersPerDay +
    params.cats * WATER_CONSTANTS.catLitersPerDay;

  return {
    total: perDay * params.days,
    perDay,
  };
}
