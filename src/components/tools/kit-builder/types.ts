/**
 * KitBuilder Types
 * Shared type definitions for all KitBuilder components
 */

export type Locale = 'es' | 'nl' | 'de';

export interface KitItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  priority: 'critical' | 'recommended' | 'optional';
  scenarios: string[];
  notes?: string;
  amazonUrl?: string;
  affiliateUrl?: string;
}

export interface ScenarioConfig {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  time?: string;
}

export interface StoredKitState {
  scenario: string;
  hasBabies: boolean;
  hasPets: boolean;
  checkedItems: string[];
  expandedCategories: string[];
  lastUpdated: string;
}

export interface QuickPreset {
  id: string;
  label: string;
  description: string;
  config: {
    scenario?: string;
    babies?: boolean;
    pets?: boolean;
  };
}

export interface CategoryData {
  id: string;
  name: string;
  conditional?: string;
}

export interface KitBuilderTranslations {
  storageKey?: string;
  urlParams?: { scenario: string; babies: string; pets: string };
  categories?: Record<string, string>;
  milestones?: Record<string, string>;
  linkCopied?: string;
  quickPresets?: { title: string };
  scenariosSection?: { title: string };
  familySection?: {
    title: string;
    babies?: { label: string; description: string };
    pets?: { label: string; description: string };
  };
  progress?: {
    completed?: string;
    complete?: string;
    critical?: string;
    items?: string;
  };
  progressSection?: {
    title?: string;
    complete?: string;
    items?: string;
    criticalLabel?: string;
    congratulations?: string;
    missingCritical?: string;
    allCriticalDone?: string;
  };
  priority?: {
    critical?: string;
    recommended?: string;
    optional?: string;
  };
  actions?: {
    print?: string;
    share?: string;
    reset?: string;
    buy?: string;
  };
  resumeBanner?: {
    title?: string;
    itemsMarked?: string;
    restart?: string;
  };
  autoSave?: string;
  print?: {
    siteName?: string;
    tagline?: string;
    generated?: string;
    scenario?: string;
    withBabies?: string;
    withPets?: string;
    scanQr?: string;
    url?: string;
  };
}

// Icon mapping for scenarios
export const scenarioIconMap: Record<string, string> = {
  'Package': 'backpack',
  'Zap': 'zap',
  'Sun': 'sun',
  'Droplet': 'droplet',
  'ArrowRight': 'logOut',
  'Waves': 'waves',
  'Shield': 'shield',
  'backpack': 'backpack',
  'zap': 'zap',
  'sun': 'sun',
  'droplet': 'droplet',
  'logOut': 'logOut',
};
