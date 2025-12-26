/**
 * useKitBuilder Hook
 * Centralized state management for KitBuilder component
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Locale, KitItem, StoredKitState, ScenarioConfig, QuickPreset, CategoryData, KitBuilderTranslations } from './types';

// Import data files for each locale
import esKitData from '../../../data/kit-items/es.json';
import nlKitData from '../../../data/kit-items/nl.json';
import deKitData from '../../../data/kit-items/de.json';

// Import i18n translations
import esTranslations from '../../../i18n/es.json';
import nlTranslations from '../../../i18n/nl.json';
import deTranslations from '../../../i18n/de.json';

function getKitData(locale: Locale) {
  switch (locale) {
    case 'nl': return nlKitData;
    case 'de': return deKitData;
    case 'es':
    default: return esKitData;
  }
}

function getTranslations(locale: Locale) {
  switch (locale) {
    case 'nl': return nlTranslations;
    case 'de': return deTranslations;
    case 'es':
    default: return esTranslations;
  }
}

interface UseKitBuilderProps {
  locale: Locale;
  initialScenario?: string;
}

export function useKitBuilder({ locale, initialScenario }: UseKitBuilderProps) {
  const kitData = getKitData(locale);
  const t = getTranslations(locale);
  const kb = t.kitBuilder as KitBuilderTranslations;

  const STORAGE_KEY = kb.storageKey || `kit72_builder_${locale}`;
  const urlParams = kb.urlParams || { scenario: 'escenario', babies: 'bebes', pets: 'mascotas' };

  // Extract data from locale files
  const scenarios = kitData.scenarios as Record<string, ScenarioConfig>;
  const scenarioIds = Object.keys(scenarios);
  const defaultScenario = scenarioIds[0] || 'general';

  const kitItems: KitItem[] = (kitData.items || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    priority: item.priority,
    scenarios: item.scenarios,
    notes: item.notes,
    amazonUrl: item.amazonUrl,
    affiliateUrl: item.affiliateUrl,
  }));

  const quickPresets: QuickPreset[] = kitData.quickPresets || [];
  const categoriesData: CategoryData[] = kitData.categories || [];

  // State
  const [scenario, setScenario] = useState<string>(initialScenario || defaultScenario);
  const [hasBabies, setHasBabies] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [milestone, setMilestone] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStoredProgress, setHasStoredProgress] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [showStickyProgress, setShowStickyProgress] = useState(false);
  const prevProgress = useRef(0);
  const progressSectionRef = useRef<HTMLDivElement>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlScenario = params.get(urlParams.scenario);
    const urlPreset = params.get('preset');

    if (urlScenario && scenarios[urlScenario]) {
      setScenario(urlScenario);
      setIsLoaded(true);
      const cats = [...new Set(kitItems.filter(i => i.scenarios.includes(urlScenario)).map(i => i.category))];
      setExpandedCategories(new Set(cats.slice(0, 2)));
      return;
    }

    if (urlPreset) {
      const preset = quickPresets.find((p) => p.id === urlPreset);
      if (preset) {
        setScenario(preset.config?.scenario || defaultScenario);
        setHasBabies(preset.config?.babies || false);
        setHasPets(preset.config?.pets || false);
        setIsLoaded(true);
        return;
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const state: StoredKitState = JSON.parse(stored);
        if (state.checkedItems.length > 0) {
          setHasStoredProgress(true);
        }
        if (!initialScenario) {
          setScenario(state.scenario);
        }
        setHasBabies(state.hasBabies);
        setHasPets(state.hasPets);
        setCheckedItems(new Set(state.checkedItems));
        setExpandedCategories(new Set(state.expandedCategories));
      } else {
        const cats = [...new Set(kitItems.filter(i => i.scenarios.includes(scenario)).map(i => i.category))];
        setExpandedCategories(new Set(cats.slice(0, 2)));
      }
    } catch {
      const cats = [...new Set(kitItems.filter(i => i.scenarios.includes(scenario)).map(i => i.category))];
      setExpandedCategories(new Set(cats.slice(0, 2)));
    }
    setIsLoaded(true);
  }, [initialScenario, STORAGE_KEY]);

  // Get category name from data or fallback
  const getCategoryName = useCallback((categoryId: string) => {
    const cat = categoriesData.find((c) => c.id === categoryId);
    if (cat) return cat.name;
    const catTranslations = kb.categories;
    if (catTranslations && catTranslations[categoryId]) return catTranslations[categoryId];
    return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  }, [categoriesData, kb.categories]);

  // Filter items based on scenario and family options
  const filteredItems = kitItems.filter((item) => {
    if (!item.scenarios.includes(scenario)) return false;
    const catData = categoriesData.find((c) => c.id === item.category);
    if (catData?.conditional === 'hasBabies' && !hasBabies) return false;
    if (catData?.conditional === 'hasPets' && !hasPets) return false;
    if (item.category === 'baby' && !hasBabies) return false;
    if (item.category === 'huisdieren' && !hasPets) return false;
    if (item.category === 'Bebés' && !hasBabies) return false;
    if (item.category === 'Mascotas' && !hasPets) return false;
    return true;
  });

  const categories = [...new Set(filteredItems.map((item) => item.category))];

  // Save state to localStorage
  const saveState = useCallback(() => {
    if (!isLoaded) return;

    const state: StoredKitState = {
      scenario,
      hasBabies,
      hasPets,
      checkedItems: [...checkedItems],
      expandedCategories: [...expandedCategories],
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    const globalProgress = JSON.parse(localStorage.getItem('kit72_progress') || '{}');
    globalProgress.kitBuilder = {
      scenario,
      done: checkedItems.size,
      total: filteredItems.length,
      lastUpdated: state.lastUpdated,
    };
    localStorage.setItem('kit72_progress', JSON.stringify(globalProgress));
  }, [scenario, hasBabies, hasPets, checkedItems, expandedCategories, isLoaded, filteredItems.length, STORAGE_KEY]);

  useEffect(() => {
    saveState();
  }, [saveState]);

  // Actions
  const toggleItem = useCallback((id: string) => {
    setCheckedItems(prev => {
      const newChecked = new Set(prev);
      if (newChecked.has(id)) {
        newChecked.delete(id);
      } else {
        newChecked.add(id);
      }
      return newChecked;
    });
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(category)) {
        newExpanded.delete(category);
      } else {
        newExpanded.add(category);
      }
      return newExpanded;
    });
  }, []);

  const applyPreset = useCallback((preset: QuickPreset) => {
    const config = preset.config || {};
    setScenario(config.scenario || defaultScenario);
    setHasBabies(config.babies || false);
    setHasPets(config.pets || false);
    setSelectedPreset(preset.id);
    const relevantItems = kitItems.filter(item =>
      item.scenarios.includes(config.scenario || defaultScenario)
    );
    const cats = [...new Set(relevantItems.map(i => i.category))];
    setExpandedCategories(new Set(cats.slice(0, 2)));
  }, [defaultScenario, kitItems]);

  const progress = filteredItems.length > 0
    ? Math.round((checkedItems.size / filteredItems.length) * 100)
    : 0;

  const criticalItems = filteredItems.filter((i) => i.priority === 'critical');
  const criticalChecked = criticalItems.filter((i) => checkedItems.has(i.id)).length;

  // Milestone detection
  useEffect(() => {
    if (!isLoaded) return;

    const milestones = kb.milestones;
    if (!milestones) return;

    const thresholds = [
      { threshold: 25, message: milestones['25'] },
      { threshold: 50, message: milestones['50'] },
      { threshold: 75, message: milestones['75'] },
      { threshold: 100, message: milestones['100'] },
    ].filter(m => m.message);

    const crossed = thresholds.find(m =>
      prevProgress.current < m.threshold && progress >= m.threshold
    );

    if (crossed) {
      setMilestone(crossed.message);
      if (crossed.threshold === 100) {
        setShowConfetti(true);
      }
      setTimeout(() => setMilestone(null), 3000);
    }

    prevProgress.current = progress;
  }, [progress, isLoaded, kb.milestones]);

  const printChecklist = useCallback(() => {
    window.print();
  }, []);

  const resetChecklist = useCallback(() => {
    setCheckedItems(new Set());
    setShowConfetti(false);
    localStorage.removeItem(STORAGE_KEY);
  }, [STORAGE_KEY]);

  const getShareUrl = useCallback(() => {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set(urlParams.scenario, scenario);
    if (hasBabies) url.searchParams.set(urlParams.babies, '1');
    if (hasPets) url.searchParams.set(urlParams.pets, '1');
    return url.toString();
  }, [scenario, hasBabies, hasPets, urlParams]);

  const copyShareUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setMilestone(kb.linkCopied || 'Link copied');
      setTimeout(() => setMilestone(null), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = getShareUrl();
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setMilestone(kb.linkCopied || 'Link copied');
      setTimeout(() => setMilestone(null), 2000);
    }
  }, [getShareUrl, kb.linkCopied]);

  // Scroll tracking for sticky progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (progressSectionRef.current) {
        const rect = progressSectionRef.current.getBoundingClientRect();
        setShowStickyProgress(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    // Data
    locale,
    scenarios,
    scenarioIds,
    kitItems,
    quickPresets,
    categoriesData,
    filteredItems,
    categories,
    criticalItems,
    kb,

    // State
    scenario,
    hasBabies,
    hasPets,
    checkedItems,
    expandedCategories,
    milestone,
    showConfetti,
    isLoaded,
    hasStoredProgress,
    selectedPreset,
    showStickyProgress,
    progress,
    criticalChecked,
    progressSectionRef,

    // Actions
    setScenario,
    setHasBabies,
    setHasPets,
    toggleItem,
    toggleCategory,
    applyPreset,
    printChecklist,
    resetChecklist,
    copyShareUrl,
    setMilestone,
    getCategoryName,
  };
}
