/**
 * Storage Utility - Centralized localStorage management
 *
 * Provides type-safe, consistent localStorage operations for:
 * - Kit builder progress and state
 * - Checklist completion tracking
 * - Phase progress for scenarios
 * - UI dismissal preferences
 * - Global progress aggregation
 *
 * All keys are prefixed with 'kit72_' for namespacing.
 */

// Storage key constants
export const STORAGE_KEYS = {
  // Global progress tracker (used on homepage)
  PROGRESS: 'kit72_progress',

  // Kit builder state (locale-specific)
  KIT_BUILDER: (locale: string) => `kit72_builder_${locale}`,

  // Checklist state
  CHECKLIST: (key: string) => `checklist_${key}`,

  // Phase tabs completion
  PHASES: (scenarioKey: string) => `phases_${scenarioKey}`,

  // Sticky bar dismissal
  STICKY_DISMISSED: (key: string) => `sticky_dismissed_${key}`,
} as const;

// Type definitions
export interface GlobalProgress {
  kitBuilder?: {
    scenario: string;
    done: number;
    total: number;
    lastUpdated: string;
  };
  [key: string]: {
    done: number;
    total: number;
    lastUpdated: string;
    scenario?: string;
  } | undefined;
}

export interface KitBuilderState {
  scenario: string;
  hasBabies: boolean;
  hasPets: boolean;
  checkedItems: string[];
  expandedCategories: string[];
  lastUpdated: string;
}

/**
 * Safely get a value from localStorage with JSON parsing
 * Returns null if key doesn't exist or parsing fails
 */
export function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as T;
  } catch {
    console.warn(`[storage] Failed to parse "${key}"`);
    return null;
  }
}

/**
 * Safely set a value in localStorage with JSON stringification
 */
export function setItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`[storage] Failed to set "${key}"`, e);
    return false;
  }
}

/**
 * Remove an item from localStorage
 */
export function removeItem(key: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

// --- Global Progress ---

/**
 * Get global progress object
 */
export function getProgress(): GlobalProgress {
  return getItem<GlobalProgress>(STORAGE_KEYS.PROGRESS) || {};
}

/**
 * Update a specific section of global progress
 */
export function updateProgress(
  section: string,
  data: { done: number; total: number; scenario?: string }
): void {
  const progress = getProgress();
  progress[section] = {
    ...data,
    lastUpdated: new Date().toISOString(),
  };
  setItem(STORAGE_KEYS.PROGRESS, progress);
}

// --- Kit Builder State ---

/**
 * Get kit builder state for a specific locale
 */
export function getKitBuilderState(locale: string): KitBuilderState | null {
  return getItem<KitBuilderState>(STORAGE_KEYS.KIT_BUILDER(locale));
}

/**
 * Save kit builder state for a specific locale
 */
export function setKitBuilderState(locale: string, state: KitBuilderState): void {
  setItem(STORAGE_KEYS.KIT_BUILDER(locale), state);

  // Also update global progress
  updateProgress('kitBuilder', {
    scenario: state.scenario,
    done: state.checkedItems.length,
    total: 0, // Will be set by component with actual total
  });
}

/**
 * Clear kit builder state for a specific locale
 */
export function clearKitBuilderState(locale: string): void {
  removeItem(STORAGE_KEYS.KIT_BUILDER(locale));
}

// --- Checklist State ---

/**
 * Get checked items for a checklist
 */
export function getCheckedItems(storageKey: string): string[] {
  return getItem<string[]>(STORAGE_KEYS.CHECKLIST(storageKey)) || [];
}

/**
 * Save checked items for a checklist
 */
export function setCheckedItems(storageKey: string, items: string[]): void {
  setItem(STORAGE_KEYS.CHECKLIST(storageKey), items);
}

// --- Phase Tabs State ---

/**
 * Get completed phases for a scenario
 */
export function getCompletedPhases(scenarioKey: string): string[] {
  return getItem<string[]>(STORAGE_KEYS.PHASES(scenarioKey)) || [];
}

/**
 * Save completed phases for a scenario
 */
export function setCompletedPhases(scenarioKey: string, phases: string[]): void {
  setItem(STORAGE_KEYS.PHASES(scenarioKey), phases);
}

// --- Dismissal State ---

/**
 * Check if a sticky bar has been dismissed
 */
export function isDismissed(dismissKey: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    return localStorage.getItem(STORAGE_KEYS.STICKY_DISMISSED(dismissKey)) === 'true';
  } catch {
    return false;
  }
}

/**
 * Mark a sticky bar as dismissed
 */
export function setDismissed(dismissKey: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.STICKY_DISMISSED(dismissKey), 'true');
  } catch {
    // Ignore storage errors
  }
}

// --- Utility Functions ---

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear all kit72 data from localStorage
 */
export function clearAllData(): void {
  if (typeof window === 'undefined') return;

  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('kit72_') || key.startsWith('checklist_') ||
        key.startsWith('phases_') || key.startsWith('sticky_dismissed_'))) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
}
