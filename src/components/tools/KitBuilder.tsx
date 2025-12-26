import { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '../ui/Icon';
import { withErrorBoundary } from '../ui/withErrorBoundary';

// Import data files for each locale
import esKitData from '../../data/kit-items/es.json';
import nlKitData from '../../data/kit-items/nl.json';
import deKitData from '../../data/kit-items/de.json';

// Import i18n translations
import esTranslations from '../../i18n/es.json';
import nlTranslations from '../../i18n/nl.json';
import deTranslations from '../../i18n/de.json';

type Locale = 'es' | 'nl' | 'de';

// Get kit data by locale
function getKitData(locale: Locale) {
  switch (locale) {
    case 'nl': return nlKitData;
    case 'de': return deKitData;
    case 'es':
    default: return esKitData;
  }
}

// Get translations by locale
function getTranslations(locale: Locale) {
  switch (locale) {
    case 'nl': return nlTranslations;
    case 'de': return deTranslations;
    case 'es':
    default: return esTranslations;
  }
}

// Map scenario icons to shared icon names (backwards compatible)
const scenarioIconMap: Record<string, string> = {
  'Package': 'backpack',
  'Zap': 'zap',
  'Sun': 'sun',
  'Droplet': 'droplet',
  'ArrowRight': 'logOut',
  'Waves': 'waves',
  'Shield': 'shield',
  // ES legacy icons
  'backpack': 'backpack',
  'zap': 'zap',
  'sun': 'sun',
  'droplet': 'droplet',
  'logOut': 'logOut',
};

// Animated progress ring - Mobile optimized with larger size
function ProgressRing({ progress, size = 140, strokeWidth = 10, completedLabel }: { progress: number; size?: number; strokeWidth?: number; completedLabel: string }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const getColor = () => {
    if (progress >= 100) return 'text-emerald-400';
    if (progress >= 75) return 'text-[--color-accent-primary]';
    if (progress >= 50) return 'text-amber-400';
    return 'text-[--color-text-muted]';
  };

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(animatedProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${completedLabel}: ${Math.round(animatedProgress)}%`}
    >
      <svg className="transform -rotate-90" width={size} height={size} aria-hidden="true">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-[--color-bg-tertiary]"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${getColor()} transition-all duration-700 ease-out`}
        />
      </svg>
      {/* Center text - larger for mobile */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <span className={`text-4xl md:text-3xl font-bold ${getColor()}`}>{Math.round(animatedProgress)}%</span>
        <span className="text-sm md:text-xs text-[--color-text-muted] font-medium">{completedLabel}</span>
      </div>
    </div>
  );
}

// Confetti burst for celebrations
function Confetti({ show }: { show: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
      }));
      setParticles(newParticles);
      const timer = setTimeout(() => setParticles([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show && particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Scenario card - Mobile optimized with larger touch targets
function ScenarioCard({
  scenario,
  label,
  icon,
  description,
  isSelected,
  onClick,
  color
}: {
  scenario: string;
  label: string;
  icon: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  color: string;
}) {
  const iconName = scenarioIconMap[icon] || 'backpack';
  return (
    <button
      onClick={onClick}
      className={`
        relative p-5 md:p-4 rounded-2xl text-left transition-all duration-300 border min-h-[120px] md:min-h-0
        active:scale-[0.98] touch-manipulation
        ${isSelected
          ? `bg-gradient-to-br ${color} border-[--color-accent-primary] shadow-lg shadow-[--color-accent-primary]/20`
          : 'bg-[--color-bg-tertiary] border-transparent hover:bg-[--color-bg-secondary] hover:border-[--color-border]'
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-7 h-7 md:w-5 md:h-5 rounded-full bg-[--color-accent-primary] flex items-center justify-center shadow-lg">
            <Icon name="check" size={16} className="text-[--color-bg-primary]" />
          </div>
        </div>
      )}
      <div className={`w-14 h-14 md:w-10 md:h-10 rounded-xl mb-3 flex items-center justify-center ${isSelected ? 'bg-[--color-accent-primary]' : 'bg-[--color-bg-secondary]'}`}>
        <Icon name={iconName} size={28} className={`md:w-5 md:h-5 ${isSelected ? 'text-[--color-bg-primary]' : 'text-[--color-text-muted]'}`} />
      </div>
      <h4 className={`font-semibold text-base md:text-sm mb-1.5 ${isSelected ? 'text-[--color-text-primary]' : 'text-[--color-text-secondary]'}`}>{label}</h4>
      <p className="text-sm md:text-xs text-[--color-text-muted] leading-relaxed">{description}</p>
    </button>
  );
}

// Category accordion - Mobile optimized with larger touch areas
function CategorySection({
  category,
  items,
  checkedItems,
  onToggle,
  isExpanded,
  onExpandToggle,
  translations,
}: {
  category: string;
  items: KitItem[];
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
  translations: {
    complete: string;
    critical: string;
    criticalOf: string;
    buy: string;
  };
}) {
  const checkedCount = items.filter(i => checkedItems.has(i.id)).length;
  const criticalCount = items.filter(i => i.priority === 'critical').length;
  const criticalChecked = items.filter(i => i.priority === 'critical' && checkedItems.has(i.id)).length;
  const allChecked = checkedCount === items.length;

  return (
    <div className={`card overflow-hidden transition-all duration-300 ${allChecked ? 'ring-2 ring-emerald-500/50' : ''}`}>
      <button
        onClick={onExpandToggle}
        className="w-full px-5 py-5 md:px-6 md:py-4 bg-[--color-bg-tertiary] flex items-center justify-between hover:bg-[--color-bg-secondary] transition-colors active:bg-[--color-bg-secondary] touch-manipulation"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <h3 className="font-semibold text-lg md:text-base text-[--color-text-primary] truncate">{category}</h3>
          {allChecked && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium flex-shrink-0">
              {translations.complete}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 ml-3">
          <div className="flex items-center gap-2">
            {/* Progress bar for mobile - more visual */}
            <div className="w-16 h-2 bg-[--color-bg-primary] rounded-full overflow-hidden md:hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${allChecked ? 'bg-emerald-500' : 'bg-[--color-accent-primary]'}`}
                style={{ width: `${(checkedCount / items.length) * 100}%` }}
              />
            </div>
            <span className={`text-base md:text-sm font-medium ${checkedCount === items.length ? 'text-emerald-400' : 'text-[--color-text-muted]'}`}>
              {checkedCount}/{items.length}
            </span>
          </div>
          {criticalCount > 0 && (
            <span className={`hidden md:inline-block px-2 py-0.5 rounded text-xs ${criticalChecked === criticalCount ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {criticalChecked}/{criticalCount} {translations.criticalOf}
            </span>
          )}
          <div className={`w-8 h-8 md:w-auto md:h-auto flex items-center justify-center rounded-full bg-[--color-bg-secondary] md:bg-transparent transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icon
              name="chevronDown"
              size={20}
              className="text-[--color-text-muted]"
            />
          </div>
        </div>
      </button>

      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="divide-y divide-[--color-border]">
          {items.map((item, index) => (
            <ItemRow
              key={item.id}
              item={item}
              isChecked={checkedItems.has(item.id)}
              onToggle={() => onToggle(item.id)}
              index={index}
              translations={translations}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Individual item row - Mobile optimized with proper text flow
function ItemRow({
  item,
  isChecked,
  onToggle,
  index,
  translations,
}: {
  item: KitItem;
  isChecked: boolean;
  onToggle: () => void;
  index: number;
  translations: {
    critical: string;
    buy: string;
  };
}) {
  const priorityStyles = {
    critical: { bg: 'bg-rose-500', ring: 'ring-rose-500/30', badge: 'bg-rose-500/20 text-rose-400', border: 'border-l-rose-500' },
    recommended: { bg: 'bg-amber-500', ring: 'ring-amber-500/30', badge: 'bg-amber-500/20 text-amber-400', border: 'border-l-amber-500' },
    optional: { bg: 'bg-blue-500', ring: 'ring-blue-500/30', badge: 'bg-blue-500/20 text-blue-400', border: 'border-l-blue-500' },
  };

  const styles = priorityStyles[item.priority];
  const affiliateUrl = item.affiliateUrl || item.amazonUrl;

  return (
    <div
      className={`
        border-l-4 ${styles.border}
        transition-all duration-200
        ${isChecked
          ? 'bg-emerald-500/5 border-l-emerald-500'
          : 'hover:bg-[--color-bg-tertiary] active:bg-[--color-bg-tertiary]'
        }
      `}
      style={{
        animationDelay: `${index * 0.03}s`,
      }}
    >
      {/* Main tap area */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 md:px-6 md:py-4 text-left touch-manipulation"
        aria-label={`${isChecked ? 'Uncheck' : 'Check'} ${item.name}`}
      >
        {/* Top row: checkbox + name + badge + (desktop: quantity + buy button) */}
        <div className="flex items-start gap-3">
          {/* Custom checkbox */}
          <div className="flex-shrink-0 mt-0.5">
            <div className={`
              w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
              ${isChecked
                ? 'bg-emerald-500 border-emerald-500'
                : `border-[--color-border] ${styles.ring}`
              }
            `}>
              {isChecked && <Icon name="check" size={14} className="text-white" />}
            </div>
          </div>

          {/* Content area - min-w-0 required for text to wrap properly in flexbox */}
          <div className="flex-1 min-w-0">
            {/* Name row with badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-base md:text-sm font-medium transition-all duration-200 ${isChecked ? 'line-through text-[--color-text-muted]' : 'text-[--color-text-primary]'}`}>
                {item.name}
              </span>
              {item.priority === 'critical' && !isChecked && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${styles.badge}`}>
                  {translations.critical}
                </span>
              )}
            </div>

            {/* Notes - full width, proper text flow */}
            {item.notes && (
              <p className="text-sm text-[--color-text-muted] mt-1.5 leading-relaxed break-words">
                {item.notes}
              </p>
            )}

            {/* Quantity */}
            <p className={`text-sm mt-1.5 break-words ${isChecked ? 'text-[--color-text-muted]' : 'text-[--color-text-secondary]'}`}>
              {item.quantity}
            </p>
          </div>
        </div>
      </button>

      {/* Affiliate link - separate row on mobile for clean layout */}
      {affiliateUrl && (
        <div className="px-4 pb-4 md:px-6 md:pb-4 -mt-2">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 active:bg-amber-500/30 transition-colors print:hidden touch-manipulation"
          >
            <Icon name="shoppingCart" size={16} />
            <span>{translations.buy}</span>
          </a>
        </div>
      )}
    </div>
  );
}

// Milestone celebration - Mobile optimized with larger text and touch targets
function MilestoneAlert({ milestone, onDismiss }: { milestone: string; onDismiss: () => void }) {
  return (
    <div className="fixed bottom-28 md:bottom-24 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 animate-slideUp">
      <div className="bg-gradient-to-r from-[--color-accent-primary] to-[--color-accent-secondary] text-[--color-bg-primary] px-5 py-4 md:px-6 md:py-3 rounded-2xl shadow-2xl flex items-center gap-3">
        <Icon name="sparkles" size={28} className="md:w-6 md:h-6 flex-shrink-0" />
        <span className="font-semibold text-base md:text-sm flex-1">{milestone}</span>
        <button
          onClick={onDismiss}
          className="w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
          aria-label="Dismiss"
        >
          <span className="text-xl md:text-lg">×</span>
        </button>
      </div>
    </div>
  );
}

interface KitItem {
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

// Interface for stored state
interface StoredKitState {
  scenario: string;
  hasBabies: boolean;
  hasPets: boolean;
  checkedItems: string[];
  expandedCategories: string[];
  lastUpdated: string;
}

interface KitBuilderProps {
  /** Locale for translations and data */
  locale?: Locale;
  /** Pre-select scenario from URL or parent component */
  initialScenario?: string;
  /** Show quick presets section */
  showPresets?: boolean;
}

function KitBuilder({ locale = 'es', initialScenario, showPresets = true }: KitBuilderProps) {
  // Load data and translations for locale
  const kitData = getKitData(locale);
  const t = getTranslations(locale);
  const kb = t.kitBuilder;

  // Get storage key from translations (locale-specific)
  const STORAGE_KEY = kb.storageKey || `kit72_builder_${locale}`;

  // Get URL param names from translations (locale-specific)
  const urlParams = kb.urlParams || { scenario: 'escenario', babies: 'bebes', pets: 'mascotas' };

  // Extract scenarios from data
  const scenarios = kitData.scenarios as Record<string, { id: string; label: string; description: string; icon: string; color: string; time?: string }>;
  const scenarioIds = Object.keys(scenarios);
  const defaultScenario = scenarioIds[0] || 'general';

  // Extract items from data
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

  // Extract quick presets
  const quickPresets = kitData.quickPresets || [];

  // Extract categories
  const categoriesData = kitData.categories || [];

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
  const prevProgress = useRef(0);

  // Load state from localStorage on mount
  useEffect(() => {
    // Check URL params first
    const params = new URLSearchParams(window.location.search);
    const urlScenario = params.get(urlParams.scenario);
    const urlPreset = params.get('preset');

    if (urlScenario && scenarios[urlScenario]) {
      setScenario(urlScenario);
      setIsLoaded(true);
      // Expand first two categories
      const cats = [...new Set(kitItems.filter(i => i.scenarios.includes(urlScenario)).map(i => i.category))];
      setExpandedCategories(new Set(cats.slice(0, 2)));
      return;
    }

    if (urlPreset) {
      const preset = quickPresets.find((p: any) => p.id === urlPreset);
      if (preset) {
        setScenario(preset.config?.scenario || defaultScenario);
        setHasBabies(preset.config?.babies || false);
        setHasPets(preset.config?.pets || false);
        setIsLoaded(true);
        return;
      }
    }

    // Then try localStorage
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
        // Default: expand first two categories
        const cats = [...new Set(kitItems.filter(i => i.scenarios.includes(scenario)).map(i => i.category))];
        setExpandedCategories(new Set(cats.slice(0, 2)));
      }
    } catch {
      // Invalid stored data - expand first two categories
      const cats = [...new Set(kitItems.filter(i => i.scenarios.includes(scenario)).map(i => i.category))];
      setExpandedCategories(new Set(cats.slice(0, 2)));
    }
    setIsLoaded(true);
  }, [initialScenario, STORAGE_KEY]);

  // Get category name from data or fallback
  const getCategoryName = (categoryId: string) => {
    // First try to find in categories data
    const cat = categoriesData.find((c: any) => c.id === categoryId);
    if (cat) return cat.name;
    // Then try the translations
    const catTranslations = kb.categories as Record<string, string> | undefined;
    if (catTranslations && catTranslations[categoryId]) return catTranslations[categoryId];
    // Fallback to capitalized id
    return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  };

  const filteredItems = kitItems.filter((item) => {
    if (!item.scenarios.includes(scenario)) return false;
    // Check conditional categories
    const catData = categoriesData.find((c: any) => c.id === item.category);
    if (catData?.conditional === 'hasBabies' && !hasBabies) return false;
    if (catData?.conditional === 'hasPets' && !hasPets) return false;
    // Legacy: check by category name
    if (item.category === 'baby' && !hasBabies) return false;
    if (item.category === 'huisdieren' && !hasPets) return false;
    if (item.category === 'Bebés' && !hasBabies) return false;
    if (item.category === 'Mascotas' && !hasPets) return false;
    return true;
  });

  const categories = [...new Set(filteredItems.map((item) => item.category))];

  // Save state to localStorage when it changes
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

    // Also update global progress for homepage "Continue" feature
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

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const applyPreset = (preset: any) => {
    const config = preset.config || {};
    setScenario(config.scenario || defaultScenario);
    setHasBabies(config.babies || false);
    setHasPets(config.pets || false);
    setSelectedPreset(preset.id);
    // Expand first two relevant categories
    const relevantItems = kitItems.filter(item =>
      item.scenarios.includes(config.scenario || defaultScenario)
    );
    const cats = [...new Set(relevantItems.map(i => i.category))];
    setExpandedCategories(new Set(cats.slice(0, 2)));
  };

  const progress = filteredItems.length > 0
    ? Math.round((checkedItems.size / filteredItems.length) * 100)
    : 0;

  const criticalItems = filteredItems.filter((i) => i.priority === 'critical');
  const criticalChecked = criticalItems.filter((i) => checkedItems.has(i.id)).length;

  // Milestone detection
  useEffect(() => {
    if (!isLoaded) return;

    const milestones = kb.milestones as Record<string, string> | undefined;
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

  const printChecklist = () => {
    window.print();
  };

  const resetChecklist = () => {
    setCheckedItems(new Set());
    setShowConfetti(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Generate shareable URL
  const getShareUrl = () => {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set(urlParams.scenario, scenario);
    if (hasBabies) url.searchParams.set(urlParams.babies, '1');
    if (hasPets) url.searchParams.set(urlParams.pets, '1');
    return url.toString();
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setMilestone(kb.linkCopied || 'Link copied');
      setTimeout(() => setMilestone(null), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = getShareUrl();
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setMilestone(kb.linkCopied || 'Link copied');
      setTimeout(() => setMilestone(null), 2000);
    }
  };

  // Get localized preset icon
  const getPresetIcon = (presetId: string): string => {
    switch (presetId) {
      case 'solo':
      case 'alleen': return 'backpack';
      case 'familia':
      case 'gezin': return 'users';
      case 'mascotas':
      case 'huisdieren': return 'pawPrint';
      case 'evacuacion':
      case 'noodtas': return 'logOut';
      default: return 'backpack';
    }
  };

  // Track scroll for sticky progress bar
  const [showStickyProgress, setShowStickyProgress] = useState(false);
  const progressSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (progressSectionRef.current) {
        const rect = progressSectionRef.current.getBoundingClientRect();
        // Show sticky bar when progress section scrolls out of view
        setShowStickyProgress(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-6 md:space-y-6 relative">
      {/* Sticky Progress Bar - Mobile only, shows when main progress is out of view */}
      {showStickyProgress && (
        <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-[--color-bg-primary]/95 backdrop-blur-lg border-b border-[--color-border] safe-area-inset-top">
          <div className="px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Mini progress ring */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke={progress >= 100 ? '#10B981' : progress >= 50 ? '#F59E0B' : '#3B82F6'}
                    strokeWidth="4"
                    strokeDasharray={`${(progress / 100) * 100.53} 100.53`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[--color-text-primary] truncate">
                  {checkedItems.size}/{filteredItems.length} {kb.progress?.items || 'items'}
                </div>
                <div className={`text-xs ${criticalChecked === criticalItems.length ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {criticalChecked}/{criticalItems.length} {kb.progressSection?.criticalLabel || 'critical'}
                </div>
              </div>
            </div>
            {/* Quick actions in sticky bar */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={printChecklist}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[--color-accent-primary] text-[--color-bg-primary] active:scale-95 transition-transform touch-manipulation"
                aria-label={kb.actions?.print || 'Print'}
              >
                <Icon name="printer" size={18} />
              </button>
              <button
                onClick={copyShareUrl}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[--color-bg-tertiary] text-[--color-text-primary] active:scale-95 transition-transform touch-manipulation"
                aria-label={kb.actions?.share || 'Share'}
              >
                <Icon name="share" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti */}
      <Confetti show={showConfetti} />

      {/* Milestone alert */}
      {milestone && (
        <MilestoneAlert milestone={milestone} onDismiss={() => setMilestone(null)} />
      )}

      {/* Resume Progress Banner */}
      {hasStoredProgress && checkedItems.size > 0 && (
        <div className="card p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Icon name="save" size={20} className="text-emerald-400" />
              </div>
              <div>
                <span className="font-medium text-[--color-text-primary]">{kb.resumeBanner?.title || 'Progress saved'}</span>
                <span className="text-sm text-[--color-text-muted] block">
                  {checkedItems.size} {kb.resumeBanner?.itemsMarked || 'items marked'}
                </span>
              </div>
            </div>
            <button
              onClick={resetChecklist}
              className="text-sm text-[--color-text-muted] hover:text-rose-400 transition-colors"
            >
              {kb.resumeBanner?.restart || 'Start over'}
            </button>
          </div>
        </div>
      )}

      {/* Quick Presets - Mobile optimized with larger cards */}
      {showPresets && !hasStoredProgress && quickPresets.length > 0 && (
        <section className="card p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="sparkles" size={24} className="text-[--color-accent-primary] md:w-5 md:h-5" />
            <h3 className="text-xl md:text-lg font-semibold text-[--color-text-primary]">{kb.quickPresets?.title || 'Quick start'}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-3">
            {quickPresets.map((preset: any) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className={`
                    relative p-4 md:p-4 rounded-2xl md:rounded-xl text-left transition-all duration-200 border
                    active:scale-[0.98] touch-manipulation min-h-[120px] md:min-h-0
                    ${isSelected
                      ? 'bg-gradient-to-br from-[--color-accent-primary]/20 to-[--color-accent-secondary]/10 border-[--color-accent-primary]/50 shadow-lg'
                      : 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-transparent hover:border-[--color-accent-primary]/30 hover:shadow-lg active:border-[--color-accent-primary]/30'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 md:top-2 md:right-2">
                      <div className="w-6 h-6 md:w-5 md:h-5 rounded-full bg-[--color-accent-primary] flex items-center justify-center">
                        <Icon name="check" size={14} className="text-[--color-bg-primary] md:w-3 md:h-3" />
                      </div>
                    </div>
                  )}
                  <div className={`w-12 h-12 md:w-10 md:h-10 rounded-xl mb-3 flex items-center justify-center ${isSelected ? 'bg-[--color-accent-primary]' : 'bg-[--color-bg-primary]/50'}`}>
                    <Icon name={getPresetIcon(preset.id)} size={24} className={`md:w-5 md:h-5 ${isSelected ? 'text-[--color-bg-primary]' : 'text-[--color-text-secondary]'}`} />
                  </div>
                  <h4 className={`font-semibold text-base md:text-sm ${isSelected ? 'text-[--color-accent-primary]' : 'text-[--color-text-primary]'}`}>{preset.label}</h4>
                  <p className="text-sm md:text-xs text-[--color-text-muted] mt-1 leading-relaxed">{preset.description}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Scenario Selection - Mobile optimized */}
      <section className="card p-5 md:p-6">
        <h3 className="text-xl md:text-lg font-semibold mb-4 text-[--color-text-primary]">{kb.scenariosSection?.title || 'Choose your scenario'}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-3">
          {scenarioIds.map((s) => {
            const config = scenarios[s];
            // Convert color format if needed
            const colorClass = config.color?.includes('from-')
              ? config.color.replace('from-', 'from-').replace(' to-', '/20 to-') + '/10'
              : 'from-[--color-accent-primary]/20 to-[--color-accent-secondary]/10';
            return (
              <ScenarioCard
                key={s}
                scenario={s}
                label={config.label}
                icon={config.icon}
                description={config.description}
                color={colorClass}
                isSelected={scenario === s}
                onClick={() => setScenario(s)}
              />
            );
          })}
        </div>
      </section>

      {/* Family Options - Mobile optimized with larger touch targets */}
      <section className="card p-5 md:p-6">
        <h3 className="text-xl md:text-lg font-semibold mb-4 text-[--color-text-primary]">{kb.familySection?.title || 'Your household'}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => setHasBabies(!hasBabies)}
            className={`
              p-5 md:p-4 rounded-2xl md:rounded-xl border-2 transition-all duration-200 flex items-center gap-4
              active:scale-[0.98] touch-manipulation
              ${hasBabies
                ? 'border-[--color-accent-primary] bg-[--color-accent-primary]/10'
                : 'border-[--color-border] hover:border-[--color-accent-primary]/50'
              }
            `}
          >
            <div className={`w-14 h-14 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${hasBabies ? 'bg-[--color-accent-primary]' : 'bg-[--color-bg-tertiary]'}`}>
              <Icon name="baby" size={28} className={`md:w-6 md:h-6 ${hasBabies ? 'text-[--color-bg-primary]' : 'text-[--color-text-muted]'}`} />
            </div>
            <div className="text-left flex-1 min-w-0">
              <span className={`font-semibold text-base md:text-sm block leading-tight ${hasBabies ? 'text-[--color-accent-primary]' : 'text-[--color-text-primary]'}`}>
                {kb.familySection?.babies?.label || 'Babies or young children'}
              </span>
              <span className="text-sm md:text-xs text-[--color-text-muted] mt-1 block">{kb.familySection?.babies?.description || 'Adds diapers, bottles, etc.'}</span>
            </div>
            <div className="flex-shrink-0">
              <div className={`w-7 h-7 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all ${hasBabies ? 'bg-[--color-accent-primary]' : 'border-2 border-[--color-border]'}`}>
                {hasBabies && <Icon name="check" size={16} className="text-[--color-bg-primary] md:w-3.5 md:h-3.5" />}
              </div>
            </div>
          </button>

          <button
            onClick={() => setHasPets(!hasPets)}
            className={`
              p-5 md:p-4 rounded-2xl md:rounded-xl border-2 transition-all duration-200 flex items-center gap-4
              active:scale-[0.98] touch-manipulation
              ${hasPets
                ? 'border-[--color-accent-primary] bg-[--color-accent-primary]/10'
                : 'border-[--color-border] hover:border-[--color-accent-primary]/50'
              }
            `}
          >
            <div className={`w-14 h-14 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${hasPets ? 'bg-[--color-accent-primary]' : 'bg-[--color-bg-tertiary]'}`}>
              <Icon name="pawPrint" size={28} className={`md:w-6 md:h-6 ${hasPets ? 'text-[--color-bg-primary]' : 'text-[--color-text-muted]'}`} />
            </div>
            <div className="text-left flex-1 min-w-0">
              <span className={`font-semibold text-base md:text-sm block leading-tight ${hasPets ? 'text-[--color-accent-primary]' : 'text-[--color-text-primary]'}`}>
                {kb.familySection?.pets?.label || 'Pets'}
              </span>
              <span className="text-sm md:text-xs text-[--color-text-muted] mt-1 block">{kb.familySection?.pets?.description || 'Adds food, carrier, etc.'}</span>
            </div>
            <div className="flex-shrink-0">
              <div className={`w-7 h-7 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all ${hasPets ? 'bg-[--color-accent-primary]' : 'border-2 border-[--color-border]'}`}>
                {hasPets && <Icon name="check" size={16} className="text-[--color-bg-primary] md:w-3.5 md:h-3.5" />}
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Progress Section */}
      <section
        ref={progressSectionRef}
        className="relative overflow-hidden rounded-2xl p-5 md:p-6"
        style={{
          background: progress >= 100
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ProgressRing progress={progress} completedLabel={kb.progress?.completed || 'completed'} />

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-[--color-text-primary] mb-2">
              {progress >= 100 ? (kb.progressSection?.complete || 'Kit Complete!') : (kb.progressSection?.title || 'Kit Progress')}
            </h3>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-4">
              <div className="px-3 py-1.5 rounded-lg bg-[--color-bg-primary]/50 text-sm">
                <span className="text-[--color-text-muted]">{kb.progressSection?.items || 'Items:'} </span>
                <span className="font-medium text-[--color-text-primary]">{checkedItems.size}/{filteredItems.length}</span>
              </div>
              <div className={`px-3 py-1.5 rounded-lg text-sm ${criticalChecked === criticalItems.length ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                <span className={criticalChecked === criticalItems.length ? 'text-emerald-400' : 'text-rose-400'}>
                  {kb.progressSection?.criticalLabel || 'Critical:'} {criticalChecked}/{criticalItems.length}
                </span>
              </div>
            </div>

            {progress >= 100 ? (
              <div className="flex items-center gap-2 justify-center sm:justify-start text-emerald-400">
                <Icon name="trophy" size={20} />
                <span className="font-medium">{kb.progressSection?.congratulations || 'Congratulations! Your kit is ready'}</span>
              </div>
            ) : (
              <p className="text-sm text-[--color-text-muted]">
                {criticalChecked < criticalItems.length
                  ? (kb.progressSection?.missingCritical || 'You are missing {count} critical items').replace('{count}', String(criticalItems.length - criticalChecked))
                  : (kb.progressSection?.allCriticalDone || 'All critical items completed')
                }
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Priority Legend - Mobile optimized */}
      <div className="flex flex-wrap gap-4 md:gap-4 text-base md:text-sm print:hidden px-1">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 md:w-3 md:h-3 rounded-full bg-rose-500"></span>
          <span className="font-medium">{kb.priority?.critical || 'Critical'}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 md:w-3 md:h-3 rounded-full bg-amber-500"></span>
          <span className="font-medium">{kb.priority?.recommended || 'Recommended'}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 md:w-3 md:h-3 rounded-full bg-blue-500"></span>
          <span className="font-medium">{kb.priority?.optional || 'Optional'}</span>
        </span>
      </div>

      {/* Checklist Categories */}
      <div className="space-y-4 print:space-y-2" id="checklist-content">
        {categories.map((category) => (
          <CategorySection
            key={category}
            category={getCategoryName(category)}
            items={filteredItems.filter((item) => item.category === category)}
            checkedItems={checkedItems}
            onToggle={toggleItem}
            isExpanded={expandedCategories.has(category)}
            onExpandToggle={() => toggleCategory(category)}
            translations={{
              complete: kb.progress?.complete || 'Complete',
              critical: kb.priority?.critical || 'Critical',
              criticalOf: kb.progress?.critical || 'critical',
              buy: kb.actions?.buy || 'Buy',
            }}
          />
        ))}
      </div>

      {/* Actions - Mobile optimized with full-width buttons */}
      <div className="card p-5 md:p-6 print:hidden">
        {/* Mobile: Stack buttons vertically for easier tapping */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
          {/* Primary Actions */}
          <div className="flex flex-col md:flex-row gap-3 flex-1">
            <button
              onClick={printChecklist}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 md:px-5 md:py-3 bg-[--color-accent-primary] text-[--color-bg-primary] font-semibold text-base md:text-sm rounded-2xl md:rounded-xl hover:bg-[--color-accent-secondary] transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[--color-accent-primary]/20 touch-manipulation"
            >
              <Icon name="printer" size={22} className="md:w-[18px] md:h-[18px]" />
              {kb.actions?.print || 'Print'}
            </button>
            <button
              onClick={copyShareUrl}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 md:px-5 md:py-3 bg-[--color-bg-tertiary] text-[--color-text-primary] font-semibold text-base md:text-sm md:font-medium rounded-2xl md:rounded-xl hover:bg-[--color-bg-secondary] active:bg-[--color-bg-secondary] transition-all duration-200 active:scale-[0.98] touch-manipulation"
            >
              <Icon name="share" size={22} className="md:w-[18px] md:h-[18px]" />
              {kb.actions?.share || 'Share'}
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex md:flex-shrink-0">
            <button
              onClick={resetChecklist}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 md:px-4 md:py-3 text-[--color-text-muted] hover:text-rose-400 active:text-rose-400 transition-colors rounded-2xl md:rounded-xl bg-[--color-bg-secondary] md:bg-transparent active:scale-[0.98] touch-manipulation"
              title={kb.actions?.reset || 'Reset'}
            >
              <Icon name="refresh" size={22} className="md:w-[18px] md:h-[18px]" />
              <span>{kb.actions?.reset || 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Auto-save indicator */}
        <div className="mt-4 pt-4 border-t border-[--color-border] flex items-center justify-center md:justify-start gap-2 text-sm text-[--color-text-muted]">
          <Icon name="save" size={16} className="md:w-3.5 md:h-3.5" />
          <span>{kb.autoSave || 'Your progress is saved automatically'}</span>
        </div>
      </div>

      {/* Print-only header and QR code section */}
      <div className="hidden print:block">
        <div className="border-t-2 border-black pt-4 mt-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm">
                <strong>{kb.print?.siteName || 'Kit-72.com'}</strong> - {kb.print?.tagline || 'Emergency preparedness'}
              </p>
              <p className="text-xs text-gray-600">
                {kb.print?.generated || 'Generated:'} {new Date().toLocaleDateString(locale === 'nl' ? 'nl-NL' : locale === 'de' ? 'de-DE' : 'es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-xs text-gray-600">
                {kb.print?.scenario || 'Scenario:'} {scenarios[scenario]?.label}
                {hasBabies && ` • ${kb.print?.withBabies || 'With babies'}`}
                {hasPets && ` • ${kb.print?.withPets || 'With pets'}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 mb-1">{kb.print?.scanQr || 'Scan for online version:'}</p>
              {/* Simple text QR placeholder - actual QR would need a library */}
              <div className="inline-block border border-gray-300 p-2 text-xs">
                {kb.print?.url || 'kit-72.com'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations and Mobile Utilities */}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) rotate(720deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            transform: translate(-50%, 20px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        .animate-confetti {
          animation: confetti 1.5s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }

        /* Safe area for notched devices (iPhone X+) */
        .safe-area-inset-top {
          padding-top: env(safe-area-inset-top, 0px);
        }

        /* Improve touch feedback on mobile */
        @media (hover: none) and (pointer: coarse) {
          .touch-manipulation {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}

export default withErrorBoundary(KitBuilder);
