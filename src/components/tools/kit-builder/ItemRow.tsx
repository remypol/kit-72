/**
 * ItemRow - Individual checklist item
 */

import { Icon } from '../../ui/Icon';
import type { KitItem } from './types';

interface ItemRowProps {
  item: KitItem;
  isChecked: boolean;
  onToggle: () => void;
  index: number;
  translations: {
    critical: string;
    buy: string;
  };
}

const priorityStyles = {
  critical: {
    bg: 'bg-rose-500',
    ring: 'ring-rose-500/30',
    badge: 'bg-rose-500/20 text-rose-400',
    border: 'border-l-rose-500'
  },
  recommended: {
    bg: 'bg-amber-500',
    ring: 'ring-amber-500/30',
    badge: 'bg-amber-500/20 text-amber-400',
    border: 'border-l-amber-500'
  },
  optional: {
    bg: 'bg-blue-500',
    ring: 'ring-blue-500/30',
    badge: 'bg-blue-500/20 text-blue-400',
    border: 'border-l-blue-500'
  },
};

export function ItemRow({
  item,
  isChecked,
  onToggle,
  index,
  translations,
}: ItemRowProps) {
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
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {/* Main tap area */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 md:px-6 md:py-4 text-left touch-manipulation"
        aria-label={`${isChecked ? 'Uncheck' : 'Check'} ${item.name}`}
      >
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

          {/* Content area */}
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

            {/* Notes */}
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

      {/* Affiliate link */}
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
