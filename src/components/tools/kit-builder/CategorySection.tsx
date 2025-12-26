/**
 * CategorySection - Collapsible category with items
 */

import { Icon } from '../../ui/Icon';
import { ItemRow } from './ItemRow';
import type { KitItem } from './types';

interface CategorySectionProps {
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
}

export function CategorySection({
  category,
  items,
  checkedItems,
  onToggle,
  isExpanded,
  onExpandToggle,
  translations,
}: CategorySectionProps) {
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
          <h3 className="font-semibold text-lg md:text-base text-[--color-text-primary] truncate">
            {category}
          </h3>
          {allChecked && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium flex-shrink-0">
              {translations.complete}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 ml-3">
          <div className="flex items-center gap-2">
            {/* Progress bar for mobile */}
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
            <Icon name="chevronDown" size={20} className="text-[--color-text-muted]" />
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
