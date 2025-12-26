/**
 * ProgressBar Component
 * Animated progress bar with customizable colors
 */

import { useState, useEffect } from 'react';

interface ProgressBarProps {
  percentage: number;
  color?: string;
  delay?: number;
  height?: string;
  className?: string;
}

export function ProgressBar({
  percentage,
  color = 'bg-[--color-accent-primary]',
  delay = 0,
  height = 'h-2',
  className = '',
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(Math.min(percentage, 100)), delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className={`${height} bg-[--color-bg-tertiary] rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default ProgressBar;
