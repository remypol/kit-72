/**
 * MilestoneAlert - Celebration popup for progress milestones
 */

import { Icon } from '../../ui/Icon';

interface MilestoneAlertProps {
  milestone: string;
  onDismiss: () => void;
}

export function MilestoneAlert({ milestone, onDismiss }: MilestoneAlertProps) {
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
