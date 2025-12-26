/**
 * AnimatedNumber Component
 * Smoothly animates between number values with easing
 */

import { useState, useEffect, useRef } from 'react';
import { animateValue } from '../../lib/calculator-utils';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  decimals = 1,
  className = '',
  duration = 600,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const cleanup = animateValue(
      prevValue.current,
      value,
      duration,
      setDisplayValue,
      () => { prevValue.current = value; }
    );
    return cleanup;
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </span>
  );
}

export default AnimatedNumber;
