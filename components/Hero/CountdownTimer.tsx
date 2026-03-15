'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  target: string;
  label: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

interface TimeUnitProps {
  value: number | null;
  unit: string;
}

function TimeUnit({ value, unit }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      {/* px-2.5 sm:px-4 — tighter padding on mobile so 4 units fit in a row */}
      <div
        className="card-glass rounded-xl px-2.5 sm:px-4 py-2 sm:py-3"
        style={{ minWidth: 44, textAlign: 'center' }}
      >
        <span
          className="font-mono text-xl sm:text-3xl font-bold leading-none"
          style={{ color: 'var(--accent-glow)' }}
          suppressHydrationWarning
        >
          {value === null ? '00' : pad(value)}
        </span>
      </div>
      <span
        className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1.5"
        style={{ color: 'var(--text-subtle)' }}
      >
        {unit}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="font-mono text-base sm:text-2xl font-bold mt-2 sm:mt-3"
      style={{ color: 'var(--text-subtle)' }}
    >
      :
    </span>
  );
}

export function CountdownTimer({ target, label }: CountdownTimerProps) {
  // null on server — avoids SSR/client mismatch entirely
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // First paint: set real value immediately after mount
    setTimeLeft(getTimeLeft(target));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const expired =
    timeLeft !== null &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <p
        className="text-xs font-mono uppercase tracking-[0.2em]"
        style={{ color: 'var(--accent-primary)' }}
      >
        {label}
      </p>

      {expired ? (
        <p className="font-mono font-bold text-2xl" style={{ color: 'var(--accent-glow)' }}>
          Registration Closed
        </p>
      ) : (
        <div className="flex items-start gap-3">
          <TimeUnit value={timeLeft?.days    ?? null} unit="Days" />
          <Separator />
          <TimeUnit value={timeLeft?.hours   ?? null} unit="Hrs"  />
          <Separator />
          <TimeUnit value={timeLeft?.minutes ?? null} unit="Min"  />
          <Separator />
          <TimeUnit value={timeLeft?.seconds ?? null} unit="Sec"  />
        </div>
      )}
    </div>
  );
}
