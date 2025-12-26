/**
 * InteractiveChecklist Component
 *
 * Category-grouped checklist with localStorage persistence.
 * Used on scenario pages for actionable item tracking.
 *
 * Features:
 * - Checkbox state saved to localStorage
 * - Progress indicator per category
 * - Visual priority indicators
 * - Collapsible categories
 */

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '../ui/Icon';
import { withErrorBoundary } from '../ui/withErrorBoundary';

interface ChecklistItem {
  id: string;
  name: string;
  quantity?: string;
  priority: 'critical' | 'recommended' | 'optional';
  notes?: string;
}

interface ChecklistCategory {
  id: string;
  name: string;
  icon: string;
  items: ChecklistItem[];
}

interface InteractiveChecklistProps {
  /** Unique key for localStorage persistence */
  storageKey: string;
  /** Categories with items */
  categories: ChecklistCategory[];
  /** Title shown above checklist */
  title?: string;
}

// Map category IDs to shared Icon names
const categoryIcons: Record<string, string> = {
  iluminacion: 'Flashlight',
  energia: 'Battery',
  comunicacion: 'Radio',
  alimentacion: 'Utensils',
  confort: 'Thermometer',
};

const priorityConfig = {
  critical: {
    color: 'var(--color-status-critical)',
    label: 'Crítico',
  },
  recommended: {
    color: 'var(--color-status-warning)',
    label: 'Recomendado',
  },
  optional: {
    color: 'var(--color-status-info)',
    label: 'Opcional',
  },
};

function InteractiveChecklist({
  storageKey,
  categories,
  title = 'Checklist',
}: InteractiveChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Load checked items from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`checklist_${storageKey}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCheckedItems(new Set(parsed));
      } catch {
        // Invalid data, ignore
      }
    }
    // Default: expand first category
    if (categories.length > 0) {
      setExpandedCategories(new Set([categories[0].id]));
    }
  }, [storageKey, categories]);

  // Save to localStorage
  const saveChecked = useCallback((items: Set<string>) => {
    localStorage.setItem(`checklist_${storageKey}`, JSON.stringify([...items]));

    // Also update global progress
    const progress = JSON.parse(localStorage.getItem('kit72_progress') || '{}');
    progress.checklist = progress.checklist || {};
    progress.checklist[storageKey] = {
      done: items.size,
      total: categories.reduce((acc, cat) => acc + cat.items.length, 0),
    };
    localStorage.setItem('kit72_progress', JSON.stringify(progress));
  }, [storageKey, categories]);

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      saveChecked(next);
      return next;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItems = checkedItems.size;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="interactive-checklist">
      {/* Header with progress */}
      <div className="checklist-header">
        <h3 className="checklist-title">{title}</h3>
        <div className="checklist-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="progress-text">
            {completedItems} de {totalItems}
          </span>
        </div>
      </div>

      {/* Priority legend */}
      <div className="priority-legend">
        {Object.entries(priorityConfig).map(([key, config]) => (
          <span key={key} className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: config.color }}
            />
            {config.label}
          </span>
        ))}
      </div>

      {/* Categories */}
      <div className="checklist-categories">
        {categories.map(category => {
          const categoryChecked = category.items.filter(item =>
            checkedItems.has(item.id)
          ).length;
          const isExpanded = expandedCategories.has(category.id);
          const iconName = categoryIcons[category.id] || 'Check';

          return (
            <div key={category.id} className="checklist-category">
              <button
                type="button"
                className="category-header"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isExpanded}
              >
                <div className="category-info">
                  <span className="category-icon">
                    <Icon name={iconName} size={20} />
                  </span>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">
                    {categoryChecked}/{category.items.length}
                  </span>
                </div>
                <span className={`category-chevron ${isExpanded ? 'expanded' : ''}`}>
                  <Icon name="ChevronDown" size={20} />
                </span>
              </button>

              {isExpanded && (
                <div className="category-items">
                  {category.items.map(item => {
                    const isChecked = checkedItems.has(item.id);
                    const priority = priorityConfig[item.priority];

                    return (
                      <label
                        key={item.id}
                        className={`checklist-item ${isChecked ? 'checked' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(item.id)}
                          className="item-checkbox"
                        />
                        <span
                          className="item-priority"
                          style={{ backgroundColor: priority.color }}
                          title={priority.label}
                        />
                        <div className="item-content">
                          <div className="item-main">
                            <span className="item-name">{item.name}</span>
                            {item.quantity && (
                              <span className="item-quantity">{item.quantity}</span>
                            )}
                          </div>
                          {item.notes && (
                            <span className="item-notes">{item.notes}</span>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .interactive-checklist {
          background: var(--color-bg-secondary);
          border-radius: 16px;
          overflow: hidden;
        }

        .checklist-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--color-border);
        }

        .checklist-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0 0 12px 0;
        }

        .checklist-progress {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .progress-bar {
          flex: 1;
          height: 6px;
          background: var(--color-bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-accent-primary);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 13px;
          color: var(--color-text-muted);
          white-space: nowrap;
        }

        .priority-legend {
          display: flex;
          gap: 16px;
          padding: 12px 20px;
          border-bottom: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--color-text-muted);
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .checklist-categories {
          /* No padding - full bleed */
        }

        .checklist-category {
          border-bottom: 1px solid var(--color-border);
        }

        .checklist-category:last-child {
          border-bottom: none;
        }

        .category-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .category-header:hover {
          background: var(--color-bg-tertiary);
        }

        .category-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .category-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-tertiary);
          color: var(--color-text-muted);
          border-radius: 10px;
        }

        .category-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .category-count {
          font-size: 13px;
          color: var(--color-text-muted);
        }

        .category-chevron {
          color: var(--color-text-muted);
          transition: transform 0.2s ease;
        }

        .category-chevron.expanded {
          transform: rotate(180deg);
        }

        .category-items {
          padding: 0 20px 12px;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 12px;
          margin: 0 0 4px 0;
          background: var(--color-bg-tertiary);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .checklist-item:hover {
          background: var(--color-bg-elevated);
        }

        .checklist-item.checked {
          opacity: 0.6;
        }

        .checklist-item.checked .item-name {
          text-decoration: line-through;
        }

        .item-checkbox {
          width: 20px;
          height: 20px;
          margin: 0;
          accent-color: var(--color-accent-primary);
          cursor: pointer;
          flex-shrink: 0;
        }

        .item-priority {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }

        .item-content {
          flex: 1;
          min-width: 0;
        }

        .item-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .item-name {
          font-size: 14px;
          color: var(--color-text-primary);
          transition: text-decoration 0.15s ease;
        }

        .item-quantity {
          font-size: 12px;
          color: var(--color-text-secondary);
          white-space: nowrap;
        }

        .item-notes {
          display: block;
          font-size: 12px;
          color: var(--color-text-muted);
          margin-top: 4px;
          line-height: 1.4;
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .priority-legend {
            gap: 12px;
            padding: 10px 16px;
          }

          .category-header {
            padding: 12px 16px;
          }

          .category-items {
            padding: 0 16px 10px;
          }

          .item-main {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }

          .item-quantity {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}

export default withErrorBoundary(InteractiveChecklist);
