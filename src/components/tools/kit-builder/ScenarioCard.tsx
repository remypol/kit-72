/**
 * ScenarioCard - Selectable scenario option
 */

import { Icon } from '../../ui/Icon';
import { scenarioIconMap } from './types';

interface ScenarioCardProps {
  scenario: string;
  label: string;
  icon: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  color: string;
}

export function ScenarioCard({
  label,
  icon,
  description,
  isSelected,
  onClick,
  color
}: ScenarioCardProps) {
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
        <Icon
          name={iconName}
          size={28}
          className={`md:w-5 md:h-5 ${isSelected ? 'text-[--color-bg-primary]' : 'text-[--color-text-muted]'}`}
        />
      </div>
      <h4 className={`font-semibold text-base md:text-sm mb-1.5 ${isSelected ? 'text-[--color-text-primary]' : 'text-[--color-text-secondary]'}`}>
        {label}
      </h4>
      <p className="text-sm md:text-xs text-[--color-text-muted] leading-relaxed">
        {description}
      </p>
    </button>
  );
}
