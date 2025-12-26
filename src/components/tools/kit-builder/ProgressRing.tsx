/**
 * ProgressRing - Animated circular progress indicator
 */

import { useState, useEffect } from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  completedLabel: string;
}

export function ProgressRing({
  progress,
  size = 140,
  strokeWidth = 10,
  completedLabel
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const getColor = () => {
    if (progress >= 100) return 'text-emerald-400';
    if (progress >= 75) return 'text-[--color-accent-primary]';
    if (progress >= 50) return 'text-amber-400';
    return 'text-[--color-text-muted]';
  };

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(animatedProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${completedLabel}: ${Math.round(animatedProgress)}%`}
    >
      <svg className="transform -rotate-90" width={size} height={size} aria-hidden="true">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-[--color-bg-tertiary]"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${getColor()} transition-all duration-700 ease-out`}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <span className={`text-4xl md:text-3xl font-bold ${getColor()}`}>
          {Math.round(animatedProgress)}%
        </span>
        <span className="text-sm md:text-xs text-[--color-text-muted] font-medium">
          {completedLabel}
        </span>
      </div>
    </div>
  );
}
