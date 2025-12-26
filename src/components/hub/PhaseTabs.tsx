/**
 * PhaseTabs Component
 *
 * Sticky tabs for navigating scenario phases (Antes/Durante/Después).
 * Used on scenario pages to guide users through preparation phases.
 *
 * Features:
 * - 3 tabs with progress indicators
 * - Sticky when scrolling
 * - Visual progress states (completed, current, upcoming)
 * - Smooth scroll to section on click
 * - LocalStorage persistence for read state
 */

import { useState, useEffect, useCallback } from 'react';

interface Phase {
  id: string;
  label: string;
  icon: string;
}

interface PhaseLabels {
  before: string;
  during: string;
  after: string;
}

interface PhaseTabsProps {
  /** Unique key for progress persistence */
  scenarioKey: string;
  /** Locale for automatic label/ID resolution */
  locale?: 'es' | 'nl' | 'de';
  /** Custom phases (overrides locale and phaseLabels) */
  phases?: Phase[];
  /** Localized phase labels - use with phaseIds for custom labels */
  phaseLabels?: PhaseLabels;
  /** Phase IDs to use (overrides locale defaults) */
  phaseIds?: { before: string; during: string; after: string };
  /** Callback when phase changes */
  onPhaseChange?: (phaseId: string) => void;
}

// Locale-specific phase configurations
const phaseConfigPerLocale: Record<string, { labels: PhaseLabels; ids: { before: string; during: string; after: string } }> = {
  es: {
    labels: { before: 'Antes', during: 'Durante', after: 'Después' },
    ids: { before: 'antes', during: 'durante', after: 'despues' },
  },
  nl: {
    labels: { before: 'Vooraf', during: 'Tijdens', after: 'Daarna' },
    ids: { before: 'voor', during: 'tijdens', after: 'na' },
  },
  de: {
    labels: { before: 'Vorher', during: 'Während', after: 'Danach' },
    ids: { before: 'vorher', during: 'waehrend', after: 'danach' },
  },
};

const defaultPhasesES: Phase[] = [
  { id: 'antes', label: 'Antes', icon: 'shield' },
  { id: 'durante', label: 'Durante', icon: 'activity' },
  { id: 'despues', label: 'Después', icon: 'check-circle' },
];

function buildPhasesFromLabels(labels: PhaseLabels, ids?: { before: string; during: string; after: string }): Phase[] {
  const phaseIds = ids || { before: 'antes', during: 'durante', after: 'despues' };
  return [
    { id: phaseIds.before, label: labels.before, icon: 'shield' },
    { id: phaseIds.during, label: labels.during, icon: 'activity' },
    { id: phaseIds.after, label: labels.after, icon: 'check-circle' },
  ];
}

// Icon SVG paths
const icons: Record<string, string> = {
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

function Icon({ name, size = 18 }: { name: string; size?: number }) {
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

export default function PhaseTabs({
  scenarioKey,
  locale = 'es',
  phases,
  phaseLabels,
  phaseIds,
  onPhaseChange,
}: PhaseTabsProps) {
  // Determine which phases to use: explicit phases > built from labels > locale config > default ES
  const localeConfig = phaseConfigPerLocale[locale] || phaseConfigPerLocale.es;
  const resolvedPhases = phases || (phaseLabels
    ? buildPhasesFromLabels(phaseLabels, phaseIds)
    : buildPhasesFromLabels(localeConfig.labels, phaseIds || localeConfig.ids));
  const [activePhase, setActivePhase] = useState(resolvedPhases[0]?.id || '');
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());
  const [isSticky, setIsSticky] = useState(false);

  // Load completed phases from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`phases_${scenarioKey}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCompletedPhases(new Set(parsed));
      } catch {
        // Invalid data, ignore
      }
    }
  }, [scenarioKey]);

  // Track scroll position for active phase detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if tabs should be sticky
      const tabsElement = document.getElementById('phase-tabs');
      if (tabsElement) {
        const rect = tabsElement.getBoundingClientRect();
        setIsSticky(rect.top <= 64); // Header height
      }

      // Find which phase section is currently in view
      for (const phase of resolvedPhases) {
        const section = document.getElementById(phase.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActivePhase(phase.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [resolvedPhases]);

  // Mark phase as completed when scrolling past it
  useEffect(() => {
    const currentIndex = resolvedPhases.findIndex(p => p.id === activePhase);
    if (currentIndex > 0) {
      const newCompleted = new Set(completedPhases);
      for (let i = 0; i < currentIndex; i++) {
        newCompleted.add(resolvedPhases[i].id);
      }
      if (newCompleted.size !== completedPhases.size) {
        setCompletedPhases(newCompleted);
        localStorage.setItem(`phases_${scenarioKey}`, JSON.stringify([...newCompleted]));
      }
    }
  }, [activePhase, resolvedPhases, scenarioKey, completedPhases]);

  const handleTabClick = useCallback((phaseId: string) => {
    setActivePhase(phaseId);
    onPhaseChange?.(phaseId);

    // Smooth scroll to section
    const section = document.getElementById(phaseId);
    if (section) {
      const headerHeight = 64; // Header height
      const tabsHeight = 56; // Tabs height when sticky
      const y = section.getBoundingClientRect().top + window.scrollY - headerHeight - tabsHeight - 16;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [onPhaseChange]);

  const getPhaseState = (phaseId: string): 'completed' | 'active' | 'upcoming' => {
    if (completedPhases.has(phaseId)) return 'completed';
    if (phaseId === activePhase) return 'active';
    return 'upcoming';
  };

  return (
    <div
      id="phase-tabs"
      className={`phase-tabs ${isSticky ? 'phase-tabs--sticky' : ''}`}
    >
      <div className="phase-tabs__container">
        {resolvedPhases.map((phase, index) => {
          const state = getPhaseState(phase.id);
          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => handleTabClick(phase.id)}
              className={`phase-tab phase-tab--${state}`}
              aria-selected={state === 'active'}
              role="tab"
            >
              <span className="phase-tab__indicator">
                {state === 'completed' ? (
                  <Icon name="check" size={14} />
                ) : (
                  <span className="phase-tab__number">{index + 1}</span>
                )}
              </span>
              <span className="phase-tab__label">{phase.label}</span>
            </button>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="phase-tabs__progress">
        <div
          className="phase-tabs__progress-fill"
          style={{
            width: `${((resolvedPhases.findIndex(p => p.id === activePhase) + 1) / resolvedPhases.length) * 100}%`,
          }}
        />
      </div>

      <style>{`
        .phase-tabs {
          position: relative;
          background: var(--color-bg-primary);
          border-bottom: 1px solid var(--color-border);
          z-index: 50;
          transition: box-shadow 0.2s ease;
        }

        .phase-tabs--sticky {
          position: sticky;
          top: 64px; /* Header height */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .phase-tabs__container {
          display: flex;
          justify-content: center;
          gap: 4px;
          padding: 8px 16px;
        }

        .phase-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: none;
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
          max-width: 140px;
          justify-content: center;
        }

        .phase-tab:hover {
          background: var(--color-bg-secondary);
        }

        .phase-tab--active {
          background: var(--color-accent-subtle);
        }

        .phase-tab__indicator {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .phase-tab--upcoming .phase-tab__indicator {
          background: var(--color-bg-tertiary);
          color: var(--color-text-muted);
        }

        .phase-tab--active .phase-tab__indicator {
          background: var(--color-accent-primary);
          color: var(--color-bg-primary);
        }

        .phase-tab--completed .phase-tab__indicator {
          background: var(--color-status-success);
          color: white;
        }

        .phase-tab__label {
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .phase-tab--upcoming .phase-tab__label {
          color: var(--color-text-muted);
        }

        .phase-tab--active .phase-tab__label {
          color: var(--color-accent-primary);
        }

        .phase-tab--completed .phase-tab__label {
          color: var(--color-text-secondary);
        }

        .phase-tabs__progress {
          height: 3px;
          background: var(--color-border);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .phase-tabs__progress-fill {
          height: 100%;
          background: var(--color-accent-primary);
          transition: width 0.3s ease;
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .phase-tabs__container {
            gap: 2px;
            padding: 8px 8px;
          }

          .phase-tab {
            padding: 8px 12px;
            gap: 6px;
          }

          .phase-tab__label {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
