/**
 * StickyActionBar Component
 *
 * A contextual sticky bar that appears after scrolling past the hero.
 * Shows the next recommended action based on the current page.
 *
 * Features:
 * - Appears after scrolling ~200px
 * - Contextual CTA based on page type
 * - Progress indicator (optional)
 * - Dismissible with localStorage memory
 * - Positioned above bottom nav on mobile
 */

import { useState, useEffect } from 'react';
import { Icon } from '../ui/Icon';

interface StickyActionBarProps {
  /** The label shown before the action */
  label?: string;
  /** The action button text */
  actionText: string;
  /** The action URL */
  actionUrl: string;
  /** Optional progress info (e.g., "3 de 15 items") */
  progress?: string;
  /** Unique key for dismiss memory */
  dismissKey?: string;
  /** Scroll threshold to show the bar (default 200) */
  scrollThreshold?: number;
  /** Locale for i18n */
  locale?: 'es' | 'nl' | 'de';
}

const closeLabels: Record<string, string> = {
  es: 'Cerrar',
  nl: 'Sluiten',
  de: 'Schließen',
};

export default function StickyActionBar({
  label,
  actionText,
  actionUrl,
  progress,
  dismissKey,
  scrollThreshold = 200,
  locale = 'es',
}: StickyActionBarProps) {
  const closeLabel = closeLabels[locale] || closeLabels.es;
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if previously dismissed
  useEffect(() => {
    if (dismissKey) {
      const dismissed = localStorage.getItem(`sticky_dismissed_${dismissKey}`);
      if (dismissed) {
        setIsDismissed(true);
      }
    }
  }, [dismissKey]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > scrollThreshold;
      setIsVisible(shouldShow);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (dismissKey) {
      localStorage.setItem(`sticky_dismissed_${dismissKey}`, 'true');
    }
  };

  // Don't render if dismissed
  if (isDismissed) return null;

  return (
    <div
      className={`
        sticky-action-bar
        ${isVisible ? 'sticky-action-bar--visible' : ''}
      `}
    >
      <div className="sticky-action-bar__content">
        <div className="sticky-action-bar__text">
          <span className="sticky-action-bar__label">{label}</span>
          {progress && (
            <span className="sticky-action-bar__progress">
              <Icon name="check" size={12} />
              {progress}
            </span>
          )}
        </div>
        <a href={actionUrl} className="sticky-action-bar__button">
          {actionText}
          <Icon name="arrowRight" size={16} />
        </a>
      </div>
      {dismissKey && (
        <button
          type="button"
          onClick={handleDismiss}
          className="sticky-action-bar__dismiss"
          aria-label={closeLabel}
        >
          <Icon name="x" size={16} />
        </button>
      )}

      <style>{`
        .sticky-action-bar {
          position: fixed;
          bottom: calc(var(--bottom-nav-height, 56px) + env(safe-area-inset-bottom, 0px) + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          z-index: 90;
          opacity: 0;
          pointer-events: none;
          transition: transform 0.3s ease, opacity 0.3s ease;
          max-width: calc(100% - 32px);
          width: 100%;
        }

        .sticky-action-bar--visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .sticky-action-bar__content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
        }

        .sticky-action-bar__text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
        }

        .sticky-action-bar__label {
          font-size: 12px;
          color: var(--color-text-muted);
        }

        .sticky-action-bar__progress {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--color-status-success);
        }

        .sticky-action-bar__button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: var(--color-accent-primary);
          color: var(--color-bg-primary);
          font-size: 13px;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s ease;
        }

        .sticky-action-bar__button:hover {
          background: var(--color-accent-hover);
        }

        .sticky-action-bar__dismiss {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          border-radius: 50%;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .sticky-action-bar__dismiss:hover {
          background: var(--color-bg-elevated);
          color: var(--color-text-primary);
        }

        /* Hide on desktop */
        @media (min-width: 768px) {
          .sticky-action-bar {
            max-width: 480px;
            bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}
