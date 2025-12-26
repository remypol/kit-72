/**
 * KitBuilder - Emergency Kit Builder Tool
 *
 * A customizable checklist builder for emergency preparedness kits.
 * Supports multiple locales (ES, NL, DE) with scenario-specific items.
 *
 * @see ./kit-builder/ for sub-components
 */

import { Icon } from '../ui/Icon';
import { withErrorBoundary } from '../ui/withErrorBoundary';
import {
  useKitBuilder,
  ProgressRing,
  Confetti,
  ScenarioCard,
  CategorySection,
  MilestoneAlert,
  StickyProgressBar,
  type Locale,
  type QuickPreset,
} from './kit-builder';

interface KitBuilderProps {
  locale?: Locale;
  initialScenario?: string;
  showPresets?: boolean;
}

function KitBuilder({ locale = 'es', initialScenario, showPresets = true }: KitBuilderProps) {
  const {
    // Data
    scenarios,
    scenarioIds,
    quickPresets,
    filteredItems,
    categories,
    criticalItems,
    kb,

    // State
    scenario,
    hasBabies,
    hasPets,
    checkedItems,
    expandedCategories,
    milestone,
    showConfetti,
    hasStoredProgress,
    selectedPreset,
    showStickyProgress,
    progress,
    criticalChecked,
    progressSectionRef,

    // Actions
    setScenario,
    setHasBabies,
    setHasPets,
    toggleItem,
    toggleCategory,
    applyPreset,
    printChecklist,
    resetChecklist,
    copyShareUrl,
    setMilestone,
    getCategoryName,
  } = useKitBuilder({ locale, initialScenario });

  // Get preset icon based on preset ID
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

  return (
    <div className="space-y-6 md:space-y-6 relative">
      {/* Sticky Progress Bar - Mobile only */}
      <StickyProgressBar
        show={showStickyProgress}
        progress={progress}
        checkedCount={checkedItems.size}
        totalItems={filteredItems.length}
        criticalChecked={criticalChecked}
        criticalTotal={criticalItems.length}
        onPrint={printChecklist}
        onShare={copyShareUrl}
        kb={kb}
      />

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
                <span className="font-medium text-[--color-text-primary]">
                  {kb.resumeBanner?.title || 'Progress saved'}
                </span>
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

      {/* Quick Presets */}
      {showPresets && !hasStoredProgress && quickPresets.length > 0 && (
        <section className="card p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="sparkles" size={24} className="text-[--color-accent-primary] md:w-5 md:h-5" />
            <h3 className="text-xl md:text-lg font-semibold text-[--color-text-primary]">
              {kb.quickPresets?.title || 'Quick start'}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-3">
            {quickPresets.map((preset: QuickPreset) => {
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
                    <Icon
                      name={getPresetIcon(preset.id)}
                      size={24}
                      className={`md:w-5 md:h-5 ${isSelected ? 'text-[--color-bg-primary]' : 'text-[--color-text-secondary]'}`}
                    />
                  </div>
                  <h4 className={`font-semibold text-base md:text-sm ${isSelected ? 'text-[--color-accent-primary]' : 'text-[--color-text-primary]'}`}>
                    {preset.label}
                  </h4>
                  <p className="text-sm md:text-xs text-[--color-text-muted] mt-1 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Scenario Selection */}
      <section className="card p-5 md:p-6">
        <h3 className="text-xl md:text-lg font-semibold mb-4 text-[--color-text-primary]">
          {kb.scenariosSection?.title || 'Choose your scenario'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-3">
          {scenarioIds.map((s) => {
            const config = scenarios[s];
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

      {/* Family Options */}
      <section className="card p-5 md:p-6">
        <h3 className="text-xl md:text-lg font-semibold mb-4 text-[--color-text-primary]">
          {kb.familySection?.title || 'Your household'}
        </h3>
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
              <span className="text-sm md:text-xs text-[--color-text-muted] mt-1 block">
                {kb.familySection?.babies?.description || 'Adds diapers, bottles, etc.'}
              </span>
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
              <span className="text-sm md:text-xs text-[--color-text-muted] mt-1 block">
                {kb.familySection?.pets?.description || 'Adds food, carrier, etc.'}
              </span>
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

      {/* Priority Legend */}
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

      {/* Actions */}
      <div className="card p-5 md:p-6 print:hidden">
        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
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

        <div className="mt-4 pt-4 border-t border-[--color-border] flex items-center justify-center md:justify-start gap-2 text-sm text-[--color-text-muted]">
          <Icon name="save" size={16} className="md:w-3.5 md:h-3.5" />
          <span>{kb.autoSave || 'Your progress is saved automatically'}</span>
        </div>
      </div>

      {/* Print-only section */}
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
              <div className="inline-block border border-gray-300 p-2 text-xs">
                {kb.print?.url || 'kit-72.com'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
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

        .safe-area-inset-top {
          padding-top: env(safe-area-inset-top, 0px);
        }

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
