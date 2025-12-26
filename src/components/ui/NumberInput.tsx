/**
 * NumberInput Component (React)
 *
 * A mobile-friendly number input with +/- buttons for easy touch interaction.
 * Designed for calculator tools and forms where users need to adjust numeric values.
 *
 * @example
 * <NumberInput
 *   value={count}
 *   onChange={setCount}
 *   min={1}
 *   max={10}
 *   label="Personas"
 * />
 */

import { useState, useCallback, useEffect } from 'react';

interface NumberInputProps {
  /** Current value */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Unit text to display after the number (e.g., "L", "kg", "días") */
  unit?: string;
}

export default function NumberInput({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  label,
  helperText,
  disabled = false,
  className = '',
  unit,
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(String(value));

  // Sync internal value when prop changes
  useEffect(() => {
    setInternalValue(String(value));
  }, [value]);

  const clamp = useCallback(
    (val: number) => Math.min(Math.max(val, min), max),
    [min, max]
  );

  const increment = useCallback(() => {
    const newValue = clamp(value + step);
    onChange(newValue);
  }, [value, step, clamp, onChange]);

  const decrement = useCallback(() => {
    const newValue = clamp(value - step);
    onChange(newValue);
  }, [value, step, clamp, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInternalValue(inputValue);

    // Parse and validate on change
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      onChange(clamp(parsed));
    }
  };

  const handleBlur = () => {
    // On blur, ensure we have a valid value
    const parsed = parseFloat(internalValue);
    if (isNaN(parsed)) {
      setInternalValue(String(value));
    } else {
      const clamped = clamp(parsed);
      setInternalValue(String(clamped));
      if (clamped !== value) {
        onChange(clamped);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      increment();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      decrement();
    }
  };

  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <div className={`number-input ${className}`}>
      {label && (
        <label className="number-input-label block text-sm font-medium text-secondary mb-2">
          {label}
        </label>
      )}

      <div className="input-number-wrapper">
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || !canDecrement}
          aria-label="Disminuir"
          className="number-input-btn"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
          </svg>
        </button>

        <input
          type="text"
          inputMode="decimal"
          value={internalValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="input"
          aria-label={label}
        />

        {unit && (
          <span className="number-input-unit absolute right-14 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
            {unit}
          </span>
        )}

        <button
          type="button"
          onClick={increment}
          disabled={disabled || !canIncrement}
          aria-label="Aumentar"
          className="number-input-btn"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>

      {helperText && (
        <p className="number-input-helper text-xs text-tertiary mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
