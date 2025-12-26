import { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';
import { withErrorBoundary } from '../ui/withErrorBoundary';

// Import translations
import esTranslations from '../../../src/i18n/es.json';
import nlTranslations from '../../../src/i18n/nl.json';
import deTranslations from '../../../src/i18n/de.json';

type Locale = 'es' | 'nl' | 'de';

const translations: Record<Locale, typeof esTranslations> = {
  es: esTranslations,
  nl: nlTranslations,
  de: deTranslations,
};

// Water storage product recommendations
interface WaterProduct {
  id: string;
  name: string;
  capacity: string;
  price: string;
  features: string[];
  url: string;
  bestFor: string;
}

// Products per locale
const waterProductsByLocale: Record<Locale, WaterProduct[]> = {
  es: [
    {
      id: 'garrafa-5l',
      name: 'Pack Garrafas Agua 5L (x4)',
      capacity: '20L total',
      price: '~8€',
      features: ['Agua mineral', 'Sellado', 'Larga duración'],
      url: 'https://www.amazon.es/s?k=garrafa+agua+5+litros',
      bestFor: 'Agua para beber',
    },
    {
      id: 'bidon-20l',
      name: 'Bidón Alimentario 20L con Grifo',
      capacity: '20L',
      price: '~15€',
      features: ['Grifo integrado', 'Apilable', 'Reutilizable'],
      url: 'https://www.amazon.es/s?k=bidon+agua+20+litros+alimentario+grifo',
      bestFor: 'Almacenamiento general',
    },
    {
      id: 'bidon-10l',
      name: 'Bidón Plegable 10L',
      capacity: '10L',
      price: '~10€',
      features: ['Plegable', 'Portátil', 'Con asa'],
      url: 'https://www.amazon.es/s?k=bidon+agua+plegable+10+litros',
      bestFor: 'Fácil transporte',
    },
    {
      id: 'pastillas',
      name: 'Pastillas Potabilizadoras (50u)',
      capacity: '50 pastillas',
      price: '~12€',
      features: ['1 pastilla = 1L', 'Emergencia', 'Compacto'],
      url: 'https://www.amazon.es/s?k=pastillas+potabilizadoras+agua',
      bestFor: 'Backup emergencia',
    },
    {
      id: 'filtro',
      name: 'Filtro Agua LifeStraw',
      capacity: '4000L capacidad',
      price: '~25€',
      features: ['Sin químicos', 'Portátil', 'Duradero'],
      url: 'https://www.amazon.es/s?k=lifestraw+filtro+agua',
      bestFor: 'Agua de fuentes naturales',
    },
  ],
  nl: [
    {
      id: 'jerrycan-5l',
      name: 'Drinkwater Jerrycan 5L (x4)',
      capacity: '20L totaal',
      price: '~10€',
      features: ['Voedselkwaliteit', 'Herbruikbaar', 'Met kraan'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=jerrycan+water+5+liter',
      bestFor: 'Drinkwater opslag',
    },
    {
      id: 'jerrycan-20l',
      name: 'Jerrycan 20L met Kraan',
      capacity: '20L',
      price: '~18€',
      features: ['Met kraan', 'Stapelbaar', 'BPA-vrij'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=jerrycan+20+liter+kraan',
      bestFor: 'Algemene opslag',
    },
    {
      id: 'opvouwbaar-10l',
      name: 'Opvouwbare Watercontainer 10L',
      capacity: '10L',
      price: '~12€',
      features: ['Opvouwbaar', 'Draagbaar', 'Met handvat'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=opvouwbare+watercontainer',
      bestFor: 'Makkelijk vervoer',
    },
    {
      id: 'tabletten',
      name: 'Waterzuiveringstabletten (50st)',
      capacity: '50 tabletten',
      price: '~15€',
      features: ['1 tablet = 1L', 'Noodgeval', 'Compact'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=waterzuiveringstabletten',
      bestFor: 'Noodvoorraad backup',
    },
    {
      id: 'filter',
      name: 'LifeStraw Waterfilter',
      capacity: '4000L capaciteit',
      price: '~30€',
      features: ['Zonder chemicaliën', 'Draagbaar', 'Duurzaam'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=lifestraw+waterfilter',
      bestFor: 'Natuurlijke waterbronnen',
    },
  ],
  de: [
    {
      id: 'kanister-5l',
      name: 'Wasserkanister 5L (x4)',
      capacity: '20L gesamt',
      price: '~10€',
      features: ['Lebensmittelecht', 'Stapelbar', 'Mit Hahn'],
      url: 'https://www.amazon.de/s?k=wasserkanister+5+liter',
      bestFor: 'Trinkwasser',
    },
    {
      id: 'kanister-20l',
      name: 'Wasserkanister 20L mit Hahn',
      capacity: '20L',
      price: '~18€',
      features: ['Mit Hahn', 'Stapelbar', 'BPA-frei'],
      url: 'https://www.amazon.de/s?k=wasserkanister+20+liter+hahn',
      bestFor: 'Allgemeine Lagerung',
    },
    {
      id: 'faltbar-10l',
      name: 'Faltbarer Wasserbehälter 10L',
      capacity: '10L',
      price: '~12€',
      features: ['Faltbar', 'Tragbar', 'Mit Griff'],
      url: 'https://www.amazon.de/s?k=faltbarer+wasserbeh%C3%A4lter',
      bestFor: 'Einfacher Transport',
    },
    {
      id: 'tabletten',
      name: 'Wasserentkeimungstabletten (50St)',
      capacity: '50 Tabletten',
      price: '~15€',
      features: ['1 Tablette = 1L', 'Notfall', 'Kompakt'],
      url: 'https://www.amazon.de/s?k=wasserentkeimungstabletten',
      bestFor: 'Notfall-Backup',
    },
    {
      id: 'filter',
      name: 'LifeStraw Wasserfilter',
      capacity: '4000L Kapazität',
      price: '~30€',
      features: ['Ohne Chemikalien', 'Tragbar', 'Langlebig'],
      url: 'https://www.amazon.de/s?k=lifestraw+wasserfilter',
      bestFor: 'Natürliche Wasserquellen',
    },
  ],
};

// Animated number component
function AnimatedNumber({ value, suffix = '', className = '' }: { value: number; suffix?: string; className?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeOut);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValue.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span className={className}>{displayValue}{suffix}</span>;
}

// Number stepper component with modern styling
function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  label,
  icon,
  color = 'accent'
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label: string;
  icon?: keyof typeof icons;
  color?: 'accent' | 'blue' | 'green';
}) {
  const colorClasses = {
    accent: 'bg-[--color-accent-primary]/10 text-[--color-accent-primary]',
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[--color-bg-secondary] border border-[--color-border] hover:border-[--color-border-accent] transition-all group">
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]} transition-transform group-hover:scale-110`}>
            <Icon name={icon} size={20} />
          </div>
        )}
        <span className="font-medium text-[--color-text-primary]">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-11 h-11 rounded-lg bg-[--color-bg-tertiary] hover:bg-[--color-accent-primary]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center"
          aria-label="Decrease"
        >
          <Icon name="minus" size={18} />
        </button>
        <div className="w-14 h-11 flex items-center justify-center font-mono text-xl font-bold text-[--color-text-primary]">
          {value}
        </div>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-11 h-11 rounded-lg bg-[--color-bg-tertiary] hover:bg-[--color-accent-primary]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center"
          aria-label="Increase"
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
    </div>
  );
}

// Segmented control component
function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label
}: {
  options: { value: T; label: string; description?: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[--color-text-secondary]">{label}</label>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              value === option.value
                ? 'bg-[--color-accent-primary] text-[--color-bg-primary] shadow-lg shadow-[--color-accent-primary]/25'
                : 'bg-[--color-bg-tertiary] text-[--color-text-secondary] hover:bg-[--color-bg-elevated] hover:text-[--color-text-primary]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Preset buttons
function PresetButton({
  label,
  sublabel,
  onClick,
  icon
}: {
  label: string;
  sublabel: string;
  onClick: () => void;
  icon: keyof typeof icons;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-xl bg-[--color-bg-secondary] border border-[--color-border] hover:border-[--color-accent-primary] hover:bg-[--color-accent-primary]/5 transition-all group text-left"
    >
      <div className="w-10 h-10 rounded-lg bg-[--color-accent-primary]/10 flex items-center justify-center group-hover:bg-[--color-accent-primary]/20 transition-colors">
        <Icon name={icon} size={20} className="text-[--color-accent-primary]" />
      </div>
      <div>
        <div className="font-medium text-[--color-text-primary]">{label}</div>
        <div className="text-xs text-[--color-text-muted]">{sublabel}</div>
      </div>
    </button>
  );
}

// Water category breakdown card
function WaterCategoryCard({
  icon,
  label,
  value,
  color,
  delay = 0,
  isVisible
}: {
  icon: keyof typeof icons;
  label: string;
  value: number;
  color: string;
  delay?: number;
  isVisible: boolean;
}) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400',
    orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/30 text-orange-400',
    cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400',
    green: 'from-green-500/20 to-green-600/5 border-green-500/30 text-green-400',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colorMap[color]} border p-4 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon name={icon} size={20} className={colorMap[color].split(' ').pop()} />
        <span className="text-sm font-medium text-[--color-text-secondary]">{label}</span>
      </div>
      <div className="text-2xl font-bold text-[--color-text-primary]">
        <AnimatedNumber value={value} suffix="L" />
      </div>
    </div>
  );
}

interface WaterResult {
  drinking: number;
  cooking: number;
  hygiene: number;
  sanitation: number;
  pets: number;
  total: number;
  perDay: number;
}

interface WaterCalculatorProps {
  locale?: Locale;
}

function WaterCalculator({ locale = 'es' }: WaterCalculatorProps) {
  const t = translations[locale].calculators.water;
  const waterProducts = waterProductsByLocale[locale];

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [days, setDays] = useState(3);
  const [dogs, setDogs] = useState(0);
  const [cats, setCats] = useState(0);
  const [climate, setClimate] = useState<'normal' | 'hot'>('normal');
  const [comfort, setComfort] = useState<'minimal' | 'standard' | 'comfortable'>('standard');
  const [result, setResult] = useState<WaterResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: t.presets.solo.label, sublabel: t.presets.solo.sublabel, icon: 'users' as const, action: () => { setAdults(1); setChildren(0); setBabies(0); setDogs(0); setCats(0); setDays(3); } },
    { label: t.presets.couple.label, sublabel: t.presets.couple.sublabel, icon: 'users' as const, action: () => { setAdults(2); setChildren(0); setBabies(0); setDogs(0); setCats(0); setDays(3); } },
    { label: t.presets.family.label, sublabel: t.presets.family.sublabel, icon: 'users' as const, action: () => { setAdults(2); setChildren(2); setBabies(0); setDogs(0); setCats(0); setDays(3); } },
    { label: t.presets.withPet.label, sublabel: t.presets.withPet.sublabel, icon: 'dog' as const, action: () => { setAdults(2); setChildren(0); setBabies(0); setDogs(1); setCats(0); setDays(3); } },
  ];

  const calculateWater = () => {
    setIsCalculating(true);
    setShowResults(false);

    // Simulate calculation time for better UX
    setTimeout(() => {
      const adultDrinking = climate === 'hot' ? 3.5 : 2.5;
      const childDrinking = climate === 'hot' ? 2 : 1.5;
      const babyDrinking = 1;

      const comfortMultiplier = { minimal: 0.5, standard: 1, comfortable: 1.5 };
      const mult = comfortMultiplier[comfort];

      const drinking = (adults * adultDrinking + children * childDrinking + babies * babyDrinking) * days;
      const cooking = (adults + children) * 0.5 * days * mult;
      const hygiene = (adults * 2 + children * 1.5 + babies * 1) * days * mult;
      const sanitation = (adults + children) * 3 * days * mult;
      const dogWater = dogs * (climate === 'hot' ? 1.5 : 1) * days;
      const catWater = cats * 0.3 * days;
      const petTotal = dogWater + catWater;
      const total = drinking + cooking + hygiene + sanitation + petTotal;
      const perDay = total / days;

      setResult({
        drinking: Math.ceil(drinking),
        cooking: Math.ceil(cooking),
        hygiene: Math.ceil(hygiene),
        sanitation: Math.ceil(sanitation),
        pets: Math.ceil(petTotal),
        total: Math.ceil(total),
        perDay: Math.ceil(perDay),
      });

      setIsCalculating(false);
      setTimeout(() => {
        setShowResults(true);
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 400);
  };

  const totalPeople = adults + children + babies;
  const hasPets = dogs > 0 || cats > 0;

  return (
    <div className="space-y-8">
      {/* Quick Presets */}
      <div>
        <h3 className="text-sm font-medium text-[--color-text-muted] uppercase tracking-wider mb-4">
          {t.quickSetup}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {presets.map((preset, i) => (
            <PresetButton key={i} {...preset} onClick={preset.action} />
          ))}
        </div>
      </div>

      {/* Main Configuration */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* People Section */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[--color-accent-primary]/10 flex items-center justify-center">
              <Icon name="users" size={18} className="text-[--color-accent-primary]" />
            </div>
            <h3 className="font-semibold text-[--color-text-primary]">{t.people.title}</h3>
            {totalPeople > 0 && (
              <span className="ml-auto text-sm font-mono bg-[--color-accent-primary]/10 text-[--color-accent-primary] px-2 py-0.5 rounded">
                {totalPeople} {t.people.total}
              </span>
            )}
          </div>

          <NumberStepper value={adults} onChange={setAdults} label={t.people.adults} icon="users" color="accent" />
          <NumberStepper value={children} onChange={setChildren} label={t.people.children} icon="users" color="blue" />
          <NumberStepper value={babies} onChange={setBabies} label={t.people.babies} icon="users" color="green" />
        </div>

        {/* Pets Section */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Icon name="pawPrint" size={18} className="text-green-400" />
            </div>
            <h3 className="font-semibold text-[--color-text-primary]">{t.pets.title}</h3>
            {hasPets && (
              <span className="ml-auto text-sm font-mono bg-green-500/10 text-green-400 px-2 py-0.5 rounded">
                {dogs + cats} {t.pets.total}
              </span>
            )}
          </div>

          <NumberStepper value={dogs} onChange={setDogs} label={t.pets.dogs} icon="dog" color="green" />
          <NumberStepper value={cats} onChange={setCats} label={t.pets.cats} icon="pawPrint" color="green" />
        </div>
      </div>

      {/* Duration & Options */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Duration */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Icon name="calendar" size={18} className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-[--color-text-primary]">{t.duration.title}</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[--color-text-muted]">{t.duration.daysLabel}</span>
              <span className="text-2xl font-bold text-[--color-accent-primary] font-mono">{days}</span>
            </div>

            <input
              type="range"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[--color-bg-tertiary] accent-[--color-accent-primary]"
            />

            <div className="flex justify-between text-xs text-[--color-text-muted]">
              <span>1 {t.duration.day}</span>
              <span className="text-[--color-accent-primary] font-medium">{t.duration.recommended}</span>
              <span>14 {t.duration.days}</span>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="card p-6 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Icon name="sun" size={18} className="text-orange-400" />
            </div>
            <h3 className="font-semibold text-[--color-text-primary]">{t.conditions.title}</h3>
          </div>

          <SegmentedControl
            label={t.conditions.climate}
            options={[
              { value: 'normal', label: t.conditions.normal },
              { value: 'hot', label: t.conditions.hot },
            ]}
            value={climate}
            onChange={setClimate}
          />

          <SegmentedControl
            label={t.conditions.comfort}
            options={[
              { value: 'minimal', label: t.conditions.minimal },
              { value: 'standard', label: t.conditions.standard },
              { value: 'comfortable', label: t.conditions.comfortable },
            ]}
            value={comfort}
            onChange={setComfort}
          />
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center">
        <button
          onClick={calculateWater}
          disabled={isCalculating || totalPeople === 0}
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[--color-accent-primary] to-[--color-accent-hover] text-[--color-bg-primary] font-bold rounded-2xl hover:shadow-lg hover:shadow-[--color-accent-primary]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg active:scale-[0.98]"
        >
          {isCalculating ? (
            <>
              <div className="w-5 h-5 border-2 border-[--color-bg-primary]/30 border-t-[--color-bg-primary] rounded-full animate-spin" />
              {t.calculating}
            </>
          ) : (
            <>
              <Icon name="calculator" size={22} />
              {t.calculate}
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div ref={resultRef} className={`transition-all duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero Result Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[--color-accent-primary]/20 via-[--color-bg-tertiary] to-[--color-bg-secondary] border-2 border-[--color-accent-primary]/30 p-8 mb-6">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[--color-accent-primary]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Icon name="droplet" size={32} className="text-[--color-accent-primary]" />
                <h3 className="text-xl font-semibold text-[--color-text-secondary]">{t.result.title}</h3>
              </div>

              <div className="text-center mb-6">
                <div className="text-7xl md:text-8xl font-bold text-[--color-text-primary] mb-2 tracking-tight">
                  <AnimatedNumber value={result.total} suffix="L" />
                </div>
                <p className="text-lg text-[--color-text-secondary]">
                  {t.result.forDays.replace('{days}', String(days))} · <span className="text-[--color-accent-primary] font-semibold">{result.perDay}L{t.result.perDay}</span>
                </p>
              </div>

              {/* Quick summary badges */}
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[--color-bg-primary]/50 text-sm text-[--color-text-secondary]">
                  {totalPeople} {totalPeople === 1 ? t.result.person : t.result.people}
                </span>
                {hasPets && (
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-sm text-green-400">
                    {dogs + cats} {dogs + cats === 1 ? t.result.pet : t.result.pets}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-sm text-blue-400">
                  {climate === 'hot' ? t.result.hotClimate : t.result.normalClimate}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-sm text-purple-400">
                  {t.result.comfortLevel} {comfort === 'minimal' ? t.conditions.minimal : comfort === 'standard' ? t.conditions.standard : t.conditions.comfortable}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <WaterCategoryCard icon="droplet" label={t.breakdown.drinking} value={result.drinking} color="blue" delay={0} isVisible={showResults} />
            <WaterCategoryCard icon="utensils" label={t.breakdown.cooking} value={result.cooking} color="orange" delay={100} isVisible={showResults} />
            <WaterCategoryCard icon="sparkles" label={t.breakdown.hygiene} value={result.hygiene} color="cyan" delay={200} isVisible={showResults} />
            <WaterCategoryCard icon="toilet" label={t.breakdown.sanitation} value={result.sanitation} color="purple" delay={300} isVisible={showResults} />
            {result.pets > 0 && (
              <WaterCategoryCard icon="pawPrint" label={t.breakdown.pets} value={result.pets} color="green" delay={400} isVisible={showResults} />
            )}
          </div>

          {/* Storage Suggestions */}
          <div
            className={`card p-6 bg-[--color-bg-tertiary] transition-all duration-500 delay-500 ${
              showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[--color-accent-primary]/10 flex items-center justify-center">
                <Icon name="lightbulb" size={20} className="text-[--color-accent-primary]" />
              </div>
              <div>
                <h4 className="font-semibold text-[--color-text-primary]">{t.storage.title}</h4>
                <p className="text-sm text-[--color-text-muted]">{t.storage.subtitle}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[--color-bg-secondary] border border-[--color-border]">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {Math.ceil(result.drinking / 5)}
                </div>
                <div className="text-sm text-[--color-text-secondary]">
                  <span className="font-medium">{t.storage.bottles5L}</span>
                  <br />
                  <span className="text-[--color-text-muted]">{t.storage.drinkingOnly}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[--color-bg-secondary] border border-[--color-border]">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  {Math.ceil((result.total - result.drinking) / 20)}
                </div>
                <div className="text-sm text-[--color-text-secondary]">
                  <span className="font-medium">{t.storage.containers20L}</span>
                  <br />
                  <span className="text-[--color-text-muted]">{t.storage.generalUse}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[--color-bg-secondary] border border-[--color-border]">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {Math.ceil(result.total / 8)}
                </div>
                <div className="text-sm text-[--color-text-secondary]">
                  <span className="font-medium">{t.storage.alternative}</span>
                  <br />
                  <span className="text-[--color-text-muted]">{t.storage.easierToMove}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Recommendations */}
          <div
            className={`card p-6 transition-all duration-500 delay-700 ${
              showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Icon name="shoppingCart" size={20} className="text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-[--color-text-primary]">{t.products.title}</h4>
                <p className="text-sm text-[--color-text-muted]">{t.products.subtitle}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {waterProducts.slice(0, 3).map((product, i) => (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    block p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                    ${i === 0
                      ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30'
                      : 'bg-[--color-bg-tertiary] border-[--color-border] hover:border-blue-500/50'
                    }
                  `}
                >
                  {i === 0 && (
                    <div className="flex items-center gap-1 text-xs text-blue-400 font-medium mb-2">
                      <Icon name="star" size={12} />
                      {t.products.bestSeller}
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h5 className="font-medium text-[--color-text-primary] text-sm">{product.name}</h5>
                      <p className="text-xs text-[--color-text-muted]">{product.capacity}</p>
                    </div>
                    <span className="text-sm font-bold text-blue-400 whitespace-nowrap">{product.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.features.map((feature, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-[--color-bg-secondary] text-[--color-text-muted]">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[--color-text-muted]">{product.bestFor}</span>
                    <span className="text-xs text-blue-400 flex items-center gap-1">
                      {t.products.viewAt} <Icon name="externalLink" size={12} />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional products row */}
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {waterProducts.slice(3).map((product) => (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[--color-bg-tertiary] border border-[--color-border] hover:border-blue-500/50 transition-all"
                >
                  <div className="flex-1">
                    <h5 className="font-medium text-[--color-text-primary] text-sm">{product.name}</h5>
                    <p className="text-xs text-[--color-text-muted]">{product.bestFor}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-400">{product.price}</span>
                  <Icon name="externalLink" size={14} className="text-[--color-text-muted]" />
                </a>
              ))}
            </div>

            <a
              href={locale === 'nl' ? 'https://www.bol.com/nl/nl/s/?searchtext=wateropslag+noodvoorraad' : locale === 'de' ? 'https://www.amazon.de/s?k=wasserspeicher+notfall' : 'https://www.amazon.es/s?k=almacenamiento+agua+emergencia'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[--color-border] text-sm text-[--color-text-secondary] hover:border-blue-500 hover:text-blue-400 transition-colors"
            >
              <Icon name="externalLink" size={16} />
              {t.products.viewMore}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default withErrorBoundary(WaterCalculator);
