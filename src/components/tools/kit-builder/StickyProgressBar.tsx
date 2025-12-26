/**
 * StickyProgressBar - Fixed progress bar for mobile when scrolling
 */

import { Icon } from '../../ui/Icon';
import type { KitBuilderTranslations } from './types';

interface StickyProgressBarProps {
  show: boolean;
  progress: number;
  checkedCount: number;
  totalItems: number;
  criticalChecked: number;
  criticalTotal: number;
  onPrint: () => void;
  onShare: () => void;
  kb: KitBuilderTranslations;
}

export function StickyProgressBar({
  show,
  progress,
  checkedCount,
  totalItems,
  criticalChecked,
  criticalTotal,
  onPrint,
  onShare,
  kb,
}: StickyProgressBarProps) {
  if (!show) return null;

  return (
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
              {checkedCount}/{totalItems} {kb.progress?.items || 'items'}
            </div>
            <div className={`text-xs ${criticalChecked === criticalTotal ? 'text-emerald-400' : 'text-rose-400'}`}>
              {criticalChecked}/{criticalTotal} {kb.progressSection?.criticalLabel || 'critical'}
            </div>
          </div>
        </div>
        {/* Quick actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onPrint}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[--color-accent-primary] text-[--color-bg-primary] active:scale-95 transition-transform touch-manipulation"
            aria-label={kb.actions?.print || 'Print'}
          >
            <Icon name="printer" size={18} />
          </button>
          <button
            onClick={onShare}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[--color-bg-tertiary] text-[--color-text-primary] active:scale-95 transition-transform touch-manipulation"
            aria-label={kb.actions?.share || 'Share'}
          >
            <Icon name="share" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
