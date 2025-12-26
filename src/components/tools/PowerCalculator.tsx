import { useState, useMemo, useEffect, useRef } from 'react';
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

// Animated number component
function AnimatedNumber({ value, suffix = '', decimals = 1, className = '' }: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
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
      const current = start + (end - start) * easeOut;
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValue.current = end;
      }
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <span className={className}>{displayValue.toFixed(decimals)}{suffix}</span>;
}

// Animated progress bar
function PowerBar({ percentage, color, delay = 0 }: { percentage: number; color: string; delay?: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(Math.min(percentage, 100)), delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="h-2 bg-[--color-bg-tertiary] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// Device card with toggle
function DeviceCard({
  device,
  count,
  onChange,
  maxPower,
  days,
  perDayLabel,
  everyLabel,
  daysLabel
}: {
  device: Device;
  count: number;
  onChange: (count: number) => void;
  maxPower: number;
  days: number;
  perDayLabel: string;
  everyLabel: string;
  daysLabel: string;
}) {
  const devicePower = device.batteryMah * device.chargesPerDay * days * count;
  const percentage = maxPower > 0 ? (devicePower / maxPower) * 100 : 0;
  const isActive = count > 0;

  const categoryColors: Record<string, { bg: string; text: string; bar: string }> = {
    communication: { bg: 'from-blue-500/20 to-blue-600/10', text: 'text-blue-400', bar: 'bg-gradient-to-r from-blue-400 to-blue-500' },
    lighting: { bg: 'from-amber-500/20 to-amber-600/10', text: 'text-amber-400', bar: 'bg-gradient-to-r from-amber-400 to-amber-500' },
    medical: { bg: 'from-rose-500/20 to-rose-600/10', text: 'text-rose-400', bar: 'bg-gradient-to-r from-rose-400 to-rose-500' },
    other: { bg: 'from-slate-500/20 to-slate-600/10', text: 'text-slate-400', bar: 'bg-gradient-to-r from-slate-400 to-slate-500' },
  };

  const colors = categoryColors[device.category] || categoryColors.other;

  return (
    <div
      className={`
        relative p-4 rounded-xl border transition-all duration-300
        ${isActive
          ? `bg-gradient-to-br ${colors.bg} border-[--color-border] shadow-lg`
          : 'bg-[--color-bg-tertiary] border-transparent opacity-60 hover:opacity-80'
        }
      `}
    >
      {/* Device info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium truncate ${isActive ? 'text-[--color-text-primary]' : 'text-[--color-text-muted]'}`}>
            {device.name}
          </h4>
          <p className="text-xs text-[--color-text-muted] mt-0.5">
            {device.batteryMah.toLocaleString()} mAh · {device.chargesPerDay < 1 ? `${everyLabel} ${Math.round(1/device.chargesPerDay)} ${daysLabel}` : `${device.chargesPerDay}${perDayLabel}`}
          </p>
        </div>

        {/* Power consumption badge */}
        {isActive && (
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${colors.text} bg-[--color-bg-secondary]`}>
            {(devicePower / 1000).toFixed(1)}K
          </div>
        )}
      </div>

      {/* Power bar (only when active) */}
      {isActive && (
        <div className="mb-3">
          <PowerBar percentage={percentage} color={colors.bar} />
        </div>
      )}

      {/* Quantity controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, count - 1))}
          disabled={count === 0}
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
            ${count === 0
              ? 'bg-[--color-bg-secondary] text-[--color-text-muted] cursor-not-allowed'
              : 'bg-[--color-bg-secondary] text-[--color-text-primary] hover:bg-[--color-accent-primary] hover:text-[--color-bg-primary] active:scale-95'
            }
          `}
        >
          <Icon name="minus" size={18} />
        </button>

        <span className={`
          w-12 text-center text-2xl font-bold tabular-nums
          ${isActive ? colors.text : 'text-[--color-text-muted]'}
        `}>
          {count}
        </span>

        <button
          onClick={() => onChange(count + 1)}
          className="w-10 h-10 rounded-xl bg-[--color-bg-secondary] text-[--color-text-primary] hover:bg-[--color-accent-primary] hover:text-[--color-bg-primary] transition-all duration-200 active:scale-95 flex items-center justify-center"
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
    </div>
  );
}

// Duration selector with visual scale
function DurationSelector({ days, onChange, presets }: {
  days: number;
  onChange: (days: number) => void;
  presets: { value: number; label: string; desc: string }[];
}) {

  return (
    <div className="space-y-4">
      {/* Preset buttons */}
      <div className="grid grid-cols-4 gap-2">
        {presets.map(preset => (
          <button
            key={preset.value}
            onClick={() => onChange(preset.value)}
            className={`
              p-3 rounded-xl text-center transition-all duration-200
              ${days === preset.value
                ? 'bg-gradient-to-br from-[--color-accent-primary] to-[--color-accent-secondary] text-[--color-bg-primary] shadow-lg shadow-[--color-accent-primary]/20'
                : 'bg-[--color-bg-tertiary] text-[--color-text-secondary] hover:bg-[--color-bg-secondary]'
              }
            `}
          >
            <span className="text-lg font-bold block">{preset.label}</span>
            <span className="text-xs opacity-75">{preset.desc}</span>
          </button>
        ))}
      </div>

      {/* Fine-tune slider */}
      <div className="flex items-center gap-4 p-4 bg-[--color-bg-tertiary] rounded-xl">
        <Icon name="clock" size={20} className="text-[--color-accent-primary] flex-shrink-0" />
        <input
          type="range"
          min="1"
          max="14"
          value={days}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="flex-1 accent-[--color-accent-primary] h-2 rounded-full"
        />
        <span className="text-xl font-bold text-[--color-accent-primary] w-16 text-right tabular-nums">
          {days}d
        </span>
      </div>
    </div>
  );
}

// Safety margin selector
function SafetySelector({ margin, onChange, options }: {
  margin: number;
  onChange: (margin: number) => void;
  options: { value: number; label: string; desc: string; icon: keyof typeof iconPaths }[];
}) {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            p-3 rounded-xl text-center transition-all duration-200 relative
            ${margin === opt.value
              ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/50 border text-emerald-400'
              : 'bg-[--color-bg-tertiary] text-[--color-text-secondary] hover:bg-[--color-bg-secondary] border border-transparent'
            }
          `}
        >
          <Icon name={opt.icon} size={18} className="mx-auto mb-1" />
          <span className="text-sm font-medium block">{opt.label}</span>
          <span className="text-xs opacity-75">{opt.desc}</span>
        </button>
      ))}
    </div>
  );
}

// Powerbank recommendation card
function PowerbankCard({
  name,
  count,
  capacity,
  price,
  isBest = false,
  recommendedLabel = 'Recomendado'
}: {
  name: string;
  count: number;
  capacity: number;
  price: number;
  isBest?: boolean;
  recommendedLabel?: string;
}) {
  return (
    <div className={`
      p-4 rounded-xl border transition-all duration-300
      ${isBest
        ? 'bg-gradient-to-br from-[--color-accent-primary]/20 to-[--color-accent-secondary]/10 border-[--color-accent-primary]/50 shadow-lg'
        : 'bg-[--color-bg-tertiary] border-[--color-border]'
      }
    `}>
      {isBest && (
        <div className="flex items-center gap-1 text-xs text-[--color-accent-primary] font-medium mb-2">
          <Icon name="check" size={14} />
          {recommendedLabel}
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          ${isBest ? 'bg-[--color-accent-primary] text-[--color-bg-primary]' : 'bg-[--color-bg-secondary] text-[--color-text-muted]'}
        `}>
          <Icon name="batteryFull" size={24} />
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${isBest ? 'text-[--color-accent-primary]' : 'text-[--color-text-primary]'}`}>
            {count}× {name}
          </h4>
          <p className="text-xs text-[--color-text-muted]">
            Total: {(capacity * count / 1000).toFixed(0)}K mAh
          </p>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold ${isBest ? 'text-[--color-accent-primary]' : 'text-[--color-text-primary]'}`}>
            ~{price}€
          </span>
        </div>
      </div>
    </div>
  );
}

interface Device {
  id: string;
  name: string;
  batteryMah: number;
  chargesPerDay: number;
  category: 'communication' | 'lighting' | 'medical' | 'other';
}

// Device IDs for translation lookup
type DeviceId = 'smartphone' | 'tablet' | 'smartwatch' | 'headlamp' | 'lantern' | 'radio' | 'cpap' | 'nebulizer';

interface DeviceSpec {
  id: DeviceId;
  batteryMah: number;
  chargesPerDay: number;
  category: 'communication' | 'lighting' | 'medical' | 'other';
}

const deviceSpecs: DeviceSpec[] = [
  { id: 'smartphone', batteryMah: 4000, chargesPerDay: 1, category: 'communication' },
  { id: 'tablet', batteryMah: 7500, chargesPerDay: 0.5, category: 'communication' },
  { id: 'smartwatch', batteryMah: 300, chargesPerDay: 0.33, category: 'communication' },
  { id: 'headlamp', batteryMah: 1500, chargesPerDay: 0.5, category: 'lighting' },
  { id: 'lantern', batteryMah: 2000, chargesPerDay: 0.33, category: 'lighting' },
  { id: 'radio', batteryMah: 2000, chargesPerDay: 0.25, category: 'communication' },
  { id: 'cpap', batteryMah: 10000, chargesPerDay: 1, category: 'medical' },
  { id: 'nebulizer', batteryMah: 3000, chargesPerDay: 0.5, category: 'medical' },
];

// Helper to get localized devices
function getLocalizedDevices(t: typeof esTranslations.calculators.power): Device[] {
  return deviceSpecs.map(spec => ({
    ...spec,
    name: t.devices.items[spec.id] || spec.id,
  }));
}

const powerbankOptions = [
  { name: 'Compacto 5K', capacity: 5000, price: 15 },
  { name: 'Estándar 10K', capacity: 10000, price: 25 },
  { name: 'Medio 15K', capacity: 15000, price: 35 },
  { name: 'Grande 20K', capacity: 20000, price: 45 },
  { name: 'Extra 26.8K', capacity: 26800, price: 60 },
];

// Recommended products per locale
interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  capacity: number;
  price: string;
  features: string[];
  url: string;
  bestFor: string;
}

const productRecommendationsByLocale: Record<Locale, ProductRecommendation[]> = {
  es: [
    {
      id: 'anker-10k',
      name: 'Anker PowerCore 10000',
      brand: 'Anker',
      capacity: 10000,
      price: '~25€',
      features: ['Ultracompacto', 'USB-A', 'PowerIQ'],
      url: 'https://www.amazon.es/s?k=anker+powercore+10000',
      bestFor: '1 persona, uso básico',
    },
    {
      id: 'anker-20k',
      name: 'Anker PowerCore Essential 20000',
      brand: 'Anker',
      capacity: 20000,
      price: '~35€',
      features: ['2 puertos USB', 'USB-C entrada', 'PowerIQ'],
      url: 'https://www.amazon.es/s?k=anker+powercore+20000',
      bestFor: '2 personas o varios dispositivos',
    },
    {
      id: 'anker-26k',
      name: 'Anker PowerCore III Elite 25600',
      brand: 'Anker',
      capacity: 25600,
      price: '~60€',
      features: ['USB-C PD 60W', 'Carga rápida', '2 USB-A + 1 USB-C'],
      url: 'https://www.amazon.es/s?k=anker+powercore+25600',
      bestFor: 'Familia o dispositivos exigentes',
    },
    {
      id: 'baseus-20k',
      name: 'Baseus Power Bank 20000mAh',
      brand: 'Baseus',
      capacity: 20000,
      price: '~30€',
      features: ['22.5W carga rápida', 'Pantalla LED', 'Compacto'],
      url: 'https://www.amazon.es/s?k=baseus+power+bank+20000',
      bestFor: 'Buena relación calidad-precio',
    },
    {
      id: 'iniu-10k',
      name: 'INIU Power Bank 10000mAh',
      brand: 'INIU',
      capacity: 10000,
      price: '~18€',
      features: ['USB-C PD 20W', 'Muy compacto', 'Linterna LED'],
      url: 'https://www.amazon.es/s?k=iniu+power+bank+10000',
      bestFor: 'Presupuesto ajustado',
    },
    {
      id: 'solar-26k',
      name: 'Power Bank Solar 26800mAh',
      brand: 'Varios',
      capacity: 26800,
      price: '~35€',
      features: ['Panel solar', 'Linterna', 'Resistente agua'],
      url: 'https://www.amazon.es/s?k=power+bank+solar+26800',
      bestFor: 'Emergencias largas / outdoor',
    },
  ],
  nl: [
    {
      id: 'anker-10k',
      name: 'Anker PowerCore 10000',
      brand: 'Anker',
      capacity: 10000,
      price: '~28€',
      features: ['Ultracompact', 'USB-A', 'PowerIQ'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=anker+powercore+10000',
      bestFor: '1 persoon, basisgebruik',
    },
    {
      id: 'anker-20k',
      name: 'Anker PowerCore Essential 20000',
      brand: 'Anker',
      capacity: 20000,
      price: '~38€',
      features: ['2 USB-poorten', 'USB-C ingang', 'PowerIQ'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=anker+powercore+20000',
      bestFor: '2 personen of meerdere apparaten',
    },
    {
      id: 'anker-26k',
      name: 'Anker PowerCore III Elite 25600',
      brand: 'Anker',
      capacity: 25600,
      price: '~65€',
      features: ['USB-C PD 60W', 'Snelladen', '2 USB-A + 1 USB-C'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=anker+powercore+25600',
      bestFor: 'Gezin of veeleisende apparaten',
    },
    {
      id: 'baseus-20k',
      name: 'Baseus Power Bank 20000mAh',
      brand: 'Baseus',
      capacity: 20000,
      price: '~32€',
      features: ['22.5W snelladen', 'LED-display', 'Compact'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=baseus+power+bank+20000',
      bestFor: 'Goede prijs-kwaliteit',
    },
    {
      id: 'iniu-10k',
      name: 'INIU Power Bank 10000mAh',
      brand: 'INIU',
      capacity: 10000,
      price: '~20€',
      features: ['USB-C PD 20W', 'Zeer compact', 'LED-zaklamp'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=iniu+power+bank+10000',
      bestFor: 'Krap budget',
    },
    {
      id: 'solar-26k',
      name: 'Solar Power Bank 26800mAh',
      brand: 'Diverse',
      capacity: 26800,
      price: '~38€',
      features: ['Zonnepaneel', 'Zaklamp', 'Waterbestendig'],
      url: 'https://www.bol.com/nl/nl/s/?searchtext=solar+power+bank+26800',
      bestFor: 'Langere noodsituaties / outdoor',
    },
  ],
  de: [
    {
      id: 'anker-10k',
      name: 'Anker PowerCore 10000',
      brand: 'Anker',
      capacity: 10000,
      price: '~25€',
      features: ['Ultrakompakt', 'USB-A', 'PowerIQ'],
      url: 'https://www.amazon.de/s?k=anker+powercore+10000',
      bestFor: '1 Person, Grundnutzung',
    },
    {
      id: 'anker-20k',
      name: 'Anker PowerCore Essential 20000',
      brand: 'Anker',
      capacity: 20000,
      price: '~35€',
      features: ['2 USB-Anschlüsse', 'USB-C Eingang', 'PowerIQ'],
      url: 'https://www.amazon.de/s?k=anker+powercore+20000',
      bestFor: '2 Personen oder mehrere Geräte',
    },
    {
      id: 'anker-26k',
      name: 'Anker PowerCore III Elite 25600',
      brand: 'Anker',
      capacity: 25600,
      price: '~60€',
      features: ['USB-C PD 60W', 'Schnellladen', '2 USB-A + 1 USB-C'],
      url: 'https://www.amazon.de/s?k=anker+powercore+25600',
      bestFor: 'Familie oder anspruchsvolle Geräte',
    },
    {
      id: 'baseus-20k',
      name: 'Baseus Power Bank 20000mAh',
      brand: 'Baseus',
      capacity: 20000,
      price: '~30€',
      features: ['22.5W Schnellladen', 'LED-Display', 'Kompakt'],
      url: 'https://www.amazon.de/s?k=baseus+power+bank+20000',
      bestFor: 'Gutes Preis-Leistung',
    },
    {
      id: 'iniu-10k',
      name: 'INIU Power Bank 10000mAh',
      brand: 'INIU',
      capacity: 10000,
      price: '~18€',
      features: ['USB-C PD 20W', 'Sehr kompakt', 'LED-Taschenlampe'],
      url: 'https://www.amazon.de/s?k=iniu+power+bank+10000',
      bestFor: 'Kleines Budget',
    },
    {
      id: 'solar-26k',
      name: 'Solar Power Bank 26800mAh',
      brand: 'Verschiedene',
      capacity: 26800,
      price: '~35€',
      features: ['Solarpanel', 'Taschenlampe', 'Wasserfest'],
      url: 'https://www.amazon.de/s?k=solar+power+bank+26800',
      bestFor: 'Längere Notfälle / Outdoor',
    },
  ],
};

// Product card component
function ProductCard({ product, isRecommended = false, viewAtLabel = 'Ver en Amazon', idealForYouLabel = 'Ideal para ti' }: { product: ProductRecommendation; isRecommended?: boolean; viewAtLabel?: string; idealForYouLabel?: string }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        block p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
        ${isRecommended
          ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/30'
          : 'bg-[--color-bg-tertiary] border-[--color-border] hover:border-[--color-accent-primary]/50'
        }
      `}
    >
      {isRecommended && (
        <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium mb-2">
          <Icon name="star" size={12} />
          {idealForYouLabel}
        </div>
      )}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h5 className="font-medium text-[--color-text-primary] text-sm">{product.name}</h5>
          <p className="text-xs text-[--color-text-muted]">{product.brand} · {product.capacity.toLocaleString()} mAh</p>
        </div>
        <span className="text-sm font-bold text-[--color-accent-primary] whitespace-nowrap">{product.price}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {product.features.map((feature, i) => (
          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[--color-bg-secondary] text-[--color-text-muted]">
            {feature}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[--color-text-muted]">{product.bestFor}</span>
        <span className="text-xs text-[--color-accent-primary] flex items-center gap-1">
          {viewAtLabel} <Icon name="externalLink" size={12} />
        </span>
      </div>
    </a>
  );
}

interface PowerCalculatorProps {
  locale?: Locale;
}

function PowerCalculator({ locale = 'es' }: PowerCalculatorProps) {
  const t = translations[locale].calculators.power;
  const productRecommendations = productRecommendationsByLocale[locale];
  const defaultDevices = useMemo(() => getLocalizedDevices(t), [t]);

  const [days, setDays] = useState(3);
  const [selectedDevices, setSelectedDevices] = useState<Record<string, number>>({
    smartphone: 2,
    tablet: 0,
    smartwatch: 0,
    headlamp: 1,
    lantern: 1,
    radio: 1,
    cpap: 0,
    nebulizer: 0,
  });
  const [safetyMargin, setSafetyMargin] = useState(1.3);
  const [customDevices, setCustomDevices] = useState<Device[]>([]);
  const [newDevice, setNewDevice] = useState({ name: '', batteryMah: 3000, chargesPerDay: 1 });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const allDevices = [...defaultDevices, ...customDevices];

  const calculations = useMemo(() => {
    const deviceBreakdown: { name: string; count: number; totalMah: number; category: string }[] = [];
    let totalRawMah = 0;

    allDevices.forEach(device => {
      const count = selectedDevices[device.id] || 0;
      if (count > 0) {
        const deviceTotalMah = device.batteryMah * device.chargesPerDay * days * count;
        totalRawMah += deviceTotalMah;
        deviceBreakdown.push({
          name: device.name,
          count,
          totalMah: deviceTotalMah,
          category: device.category,
        });
      }
    });

    const efficiencyFactor = 0.7;
    const totalNeededMah = Math.ceil(totalRawMah / efficiencyFactor);
    const totalWithMargin = Math.ceil(totalNeededMah * safetyMargin);

    // Simple recommendation with 20K powerbanks
    const simple20k = Math.ceil(totalWithMargin / 20000);
    const simpleRecommendation = {
      count: simple20k,
      capacity: 20000,
      name: 'Powerbank 20K',
      price: simple20k * 45,
    };

    // Alternative with smaller units
    const compact10k = Math.ceil(totalWithMargin / 10000);
    const compactRecommendation = {
      count: compact10k,
      capacity: 10000,
      name: 'Powerbank 10K',
      price: compact10k * 25,
    };

    return {
      deviceBreakdown,
      totalRawMah,
      totalNeededMah,
      totalWithMargin,
      simpleRecommendation,
      compactRecommendation,
    };
  }, [selectedDevices, days, safetyMargin, allDevices]);

  // Calculate max power for relative bar sizing
  const maxDevicePower = useMemo(() => {
    let max = 0;
    allDevices.forEach(device => {
      const count = selectedDevices[device.id] || 0;
      if (count > 0) {
        const power = device.batteryMah * device.chargesPerDay * days * count;
        if (power > max) max = power;
      }
    });
    return max;
  }, [selectedDevices, days, allDevices]);

  // Trigger calculation animation
  useEffect(() => {
    if (calculations.totalRawMah > 0) {
      setIsCalculating(true);
      const timer = setTimeout(() => {
        setIsCalculating(false);
        setShowResults(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setShowResults(false);
    }
  }, [calculations.totalRawMah]);

  const handleDeviceChange = (deviceId: string, count: number) => {
    setSelectedDevices(prev => ({
      ...prev,
      [deviceId]: Math.max(0, count),
    }));
  };

  const addCustomDevice = () => {
    if (newDevice.name.trim()) {
      const id = `custom-${Date.now()}`;
      setCustomDevices(prev => [...prev, {
        id,
        name: newDevice.name,
        batteryMah: newDevice.batteryMah,
        chargesPerDay: newDevice.chargesPerDay,
        category: 'other',
      }]);
      setSelectedDevices(prev => ({ ...prev, [id]: 1 }));
      setNewDevice({ name: '', batteryMah: 3000, chargesPerDay: 1 });
    }
  };

  const categoryLabels: Record<string, { label: string; icon: keyof typeof iconPaths }> = {
    communication: { label: t.devices.categories.communication, icon: 'smartphone' },
    lighting: { label: t.devices.categories.lighting, icon: 'flashlight' },
    medical: { label: t.devices.categories.medical, icon: 'heart' },
    other: { label: t.devices.categories.other, icon: 'package' },
  };

  // Duration presets for selector
  const durationPresets = [
    { value: 1, label: t.duration['24h'], desc: t.duration.shortEmergency },
    { value: 3, label: t.duration['72h'], desc: t.duration.standardKit },
    { value: 7, label: t.duration['1week'], desc: t.duration.extendedEmergency },
    { value: 14, label: t.duration['2weeks'], desc: t.duration.maxPreparation },
  ];

  // Safety options for selector
  const safetyOptions = [
    { value: 1.0, label: t.safety.tight, desc: t.safety.noBuffer, icon: 'info' as const },
    { value: 1.2, label: t.safety.minimum, desc: t.safety.buffer20, icon: 'shield' as const },
    { value: 1.3, label: t.safety.recommended, desc: t.safety.buffer30, icon: 'check' as const },
    { value: 1.5, label: t.safety.conservative, desc: t.safety.buffer50, icon: 'thermometer' as const },
  ];

  const groupedDevices = allDevices.reduce((acc, device) => {
    if (!acc[device.category]) acc[device.category] = [];
    acc[device.category].push(device);
    return acc;
  }, {} as Record<string, Device[]>);

  const activeDeviceCount = Object.values(selectedDevices).filter(c => c > 0).length;

  return (
    <div className="space-y-6">
      {/* Duration Section */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--color-accent-primary]/20 to-[--color-accent-secondary]/10 flex items-center justify-center">
            <Icon name="clock" size={20} className="text-[--color-accent-primary]" />
          </div>
          <div>
            <h3 className="font-semibold text-[--color-text-primary]">{t.duration.title}</h3>
            <p className="text-sm text-[--color-text-muted]">{t.duration.subtitle}</p>
          </div>
        </div>
        <DurationSelector days={days} onChange={setDays} presets={durationPresets} />
      </section>

      {/* Device Selection */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
              <Icon name="zap" size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-[--color-text-primary]">{t.devices.title}</h3>
              <p className="text-sm text-[--color-text-muted]">{t.devices.subtitle}</p>
            </div>
          </div>
          {activeDeviceCount > 0 && (
            <div className="px-3 py-1 rounded-full bg-[--color-accent-primary]/20 text-[--color-accent-primary] text-sm font-medium">
              {activeDeviceCount} {activeDeviceCount !== 1 ? t.devices.actives : t.devices.active}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {Object.entries(groupedDevices).map(([category, devices]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-[--color-text-muted] mb-3 flex items-center gap-2">
                <Icon name={categoryLabels[category].icon} size={16} />
                {categoryLabels[category].label}
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {devices.map(device => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    count={selectedDevices[device.id] || 0}
                    onChange={(count) => handleDeviceChange(device.id, count)}
                    maxPower={maxDevicePower}
                    days={days}
                    perDayLabel={t.devices.perDay}
                    everyLabel={t.devices.every}
                    daysLabel={t.devices.daysInterval}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add custom device */}
        <div className="mt-6 pt-6 border-t border-[--color-border]">
          <h4 className="text-sm font-medium text-[--color-text-muted] mb-3 flex items-center gap-2">
            <Icon name="plus" size={16} className="text-[--color-accent-primary]" />
            {t.devices.addCustom}
          </h4>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder={t.devices.deviceName}
              value={newDevice.name}
              onChange={(e) => setNewDevice(prev => ({ ...prev, name: e.target.value }))}
              className="flex-1 min-w-[150px] px-4 py-3 bg-[--color-bg-tertiary] border border-[--color-border] rounded-xl text-[--color-text-primary] placeholder:text-[--color-text-muted] focus:outline-none focus:border-[--color-accent-primary] transition-colors"
            />
            <input
              type="number"
              placeholder="mAh"
              value={newDevice.batteryMah}
              onChange={(e) => setNewDevice(prev => ({ ...prev, batteryMah: parseInt(e.target.value) || 0 }))}
              className="w-28 px-4 py-3 bg-[--color-bg-tertiary] border border-[--color-border] rounded-xl text-[--color-text-primary] focus:outline-none focus:border-[--color-accent-primary] transition-colors"
            />
            <button
              onClick={addCustomDevice}
              disabled={!newDevice.name.trim()}
              className="px-6 py-3 bg-[--color-accent-primary] text-[--color-bg-primary] rounded-xl hover:bg-[--color-accent-secondary] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {t.devices.add}
            </button>
          </div>
        </div>
      </section>

      {/* Safety Margin */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
            <Icon name="shield" size={20} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[--color-text-primary]">{t.safety.title}</h3>
            <p className="text-sm text-[--color-text-muted]">{t.safety.subtitle}</p>
          </div>
        </div>
        <SafetySelector margin={safetyMargin} onChange={setSafetyMargin} options={safetyOptions} />
      </section>

      {/* Results */}
      {isCalculating && (
        <div className="card p-12 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[--color-accent-primary]/30 border-t-[--color-accent-primary] rounded-full animate-spin mb-4" />
          <p className="text-[--color-text-muted]">{t.calculating}</p>
        </div>
      )}

      {showResults && calculations.totalRawMah > 0 && !isCalculating && (
        <section
          className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(180, 83, 9, 0.05) 100%)',
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[--color-accent-primary]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[--color-accent-secondary]/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[--color-accent-primary] flex items-center justify-center shadow-lg shadow-[--color-accent-primary]/30">
                <Icon name="zap" size={24} className="text-[--color-bg-primary]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[--color-text-primary]">{t.result.title}</h3>
                <p className="text-sm text-[--color-text-muted]">{days} {t.result.days} · {activeDeviceCount} {t.result.devices}</p>
              </div>
            </div>

            {/* Main result */}
            <div className="bg-[--color-bg-primary]/50 backdrop-blur rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-sm text-[--color-text-muted] mb-1">{t.result.totalCapacity}</p>
                <div className="text-5xl sm:text-6xl font-bold text-[--color-accent-primary]">
                  <AnimatedNumber value={calculations.totalWithMargin / 1000} suffix="K" />
                  <span className="text-2xl font-normal text-[--color-text-muted] ml-2">mAh</span>
                </div>
              </div>

              {/* Breakdown badges */}
              <div className="flex flex-wrap justify-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-[--color-bg-tertiary] text-sm">
                  <span className="text-[--color-text-muted]">{t.result.consumption}: </span>
                  <span className="text-[--color-text-primary] font-medium">{(calculations.totalRawMah / 1000).toFixed(1)}K</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[--color-bg-tertiary] text-sm">
                  <span className="text-[--color-text-muted]">{t.result.losses}: </span>
                  <span className="text-[--color-text-primary] font-medium">{(calculations.totalNeededMah / 1000).toFixed(1)}K</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[--color-accent-primary]/20 text-sm">
                  <span className="text-[--color-accent-primary]">+{Math.round((safetyMargin - 1) * 100)}% {t.result.margin}</span>
                </div>
              </div>
            </div>

            {/* Device breakdown */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-[--color-text-muted] mb-3">{t.result.breakdown}</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {calculations.deviceBreakdown.map((device, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-[--color-bg-primary]/30 rounded-lg"
                    style={{
                      opacity: 0,
                      animation: `fadeSlideIn 0.3s ease-out ${i * 0.05}s forwards`
                    }}
                  >
                    <span className="text-[--color-text-secondary] text-sm">
                      {device.name} × {device.count}
                    </span>
                    <span className="font-mono text-[--color-text-primary] text-sm font-medium">
                      {(device.totalMah / 1000).toFixed(1)}K mAh
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations Summary */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-medium text-[--color-text-muted]">{t.result.summary}</h4>
              <PowerbankCard
                name={calculations.simpleRecommendation.name}
                count={calculations.simpleRecommendation.count}
                capacity={calculations.simpleRecommendation.capacity}
                price={calculations.simpleRecommendation.price}
                isBest
                recommendedLabel={t.result.recommended}
              />
              <PowerbankCard
                name={calculations.compactRecommendation.name}
                count={calculations.compactRecommendation.count}
                capacity={calculations.compactRecommendation.capacity}
                price={calculations.compactRecommendation.price}
                recommendedLabel={t.result.recommended}
              />
            </div>

            {/* Product Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="shoppingCart" size={18} className="text-[--color-accent-primary]" />
                <h4 className="font-medium text-[--color-text-primary]">{t.products.title}</h4>
              </div>
              <p className="text-xs text-[--color-text-muted]">
                {t.products.subtitle}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {productRecommendations
                  .filter(p => {
                    // Show products that match the needed capacity
                    const needed = calculations.totalWithMargin;
                    if (needed <= 10000) return p.capacity <= 10000;
                    if (needed <= 20000) return p.capacity >= 10000 && p.capacity <= 20000;
                    return p.capacity >= 20000;
                  })
                  .slice(0, 4)
                  .map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isRecommended={i === 0}
                      viewAtLabel={t.products.viewAt}
                      idealForYouLabel={t.products.idealForYou}
                    />
                  ))}
              </div>
              <a
                href={locale === 'nl' ? 'https://www.bol.com/nl/nl/s/?searchtext=powerbank+20000mah' : locale === 'de' ? 'https://www.amazon.de/s?k=power+bank+20000mah' : 'https://www.amazon.es/s?k=power+bank+20000mah'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[--color-border] text-sm text-[--color-text-secondary] hover:border-[--color-accent-primary] hover:text-[--color-accent-primary] transition-colors"
              >
                <Icon name="externalLink" size={16} />
                {t.products.viewMore}
              </a>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-[--color-bg-primary]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Icon name="lightbulb" size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[--color-text-secondary] space-y-1">
                  <p>{t.tips.coldWeather}</p>
                  <p>{t.tips.solarPanel}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {!showResults && calculations.totalRawMah === 0 && !isCalculating && (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[--color-bg-tertiary] flex items-center justify-center mx-auto mb-4">
            <Icon name="battery" size={32} className="text-[--color-text-muted]" />
          </div>
          <h3 className="text-lg font-semibold text-[--color-text-primary] mb-2">{t.empty.title}</h3>
          <p className="text-[--color-text-muted]">
            {t.empty.subtitle}
          </p>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default withErrorBoundary(PowerCalculator);
