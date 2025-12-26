/**
 * AddToKitButton Component
 *
 * Button that adds a specific item to the user's Kit Builder checklist.
 * Integrates with localStorage to update the saved kit state.
 */

import { useState, useEffect } from 'react';

interface AddToKitButtonProps {
  /** The item ID to add (must match a kitItems id) */
  itemId: string;
  /** Optional custom label */
  label?: string;
  /** Optional size variant */
  size?: 'sm' | 'md';
}

// Storage key matching KitBuilder
const STORAGE_KEY = 'kit72_builder';

export default function AddToKitButton({
  itemId,
  label = 'Añadir a mi kit',
  size = 'md',
}: AddToKitButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Check if item is already in kit on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const state = JSON.parse(stored);
        if (state.checkedItems?.includes(itemId)) {
          setIsAdded(true);
        }
      }
    } catch {
      // Invalid stored data
    }
  }, [itemId]);

  const handleClick = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const state = stored ? JSON.parse(stored) : {
        scenario: 'general',
        hasBabies: false,
        hasPets: false,
        checkedItems: [],
        expandedCategories: ['Agua', 'Alimentación'],
        lastUpdated: new Date().toISOString(),
      };

      // Add item if not already present
      if (!state.checkedItems.includes(itemId)) {
        state.checkedItems.push(itemId);
        state.lastUpdated = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

        // Also update global progress
        const globalProgress = JSON.parse(localStorage.getItem('kit72_progress') || '{}');
        globalProgress.kitBuilder = {
          scenario: state.scenario,
          done: state.checkedItems.length,
          lastUpdated: state.lastUpdated,
        };
        localStorage.setItem('kit72_progress', JSON.stringify(globalProgress));
      }

      setIsAdded(true);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    } catch {
      // Storage error - just show feedback anyway
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  const sizeClasses = size === 'sm'
    ? 'px-3 py-1.5 text-xs gap-1.5'
    : 'px-4 py-2 text-sm gap-2';

  if (isAdded) {
    return (
      <span
        className={`inline-flex items-center ${sizeClasses} rounded-lg bg-emerald-500/20 text-emerald-400 font-medium`}
      >
        <svg
          width={size === 'sm' ? 14 : 16}
          height={size === 'sm' ? 14 : 16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        En tu kit
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center ${sizeClasses}
        rounded-lg font-medium transition-all duration-200
        bg-[--color-accent-primary]/10 text-[--color-accent-primary]
        hover:bg-[--color-accent-primary] hover:text-[--color-bg-primary]
        active:scale-95
        ${showFeedback ? 'bg-emerald-500 text-white' : ''}
      `}
    >
      <svg
        width={size === 'sm' ? 14 : 16}
        height={size === 'sm' ? 14 : 16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {showFeedback ? (
          <path d="M20 6 9 17l-5-5" />
        ) : (
          <>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </>
        )}
      </svg>
      {showFeedback ? '¡Añadido!' : label}
    </button>
  );
}
