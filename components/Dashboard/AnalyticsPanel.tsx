'use client';

import { motion } from 'framer-motion';
import type { DASHBOARD } from '@/constants/site-data';

type AnalyticsData = typeof DASHBOARD.analytics;

function BarChart({ data, label }: { data: readonly { label: string; value: number }[]; label: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="card-glass rounded-2xl p-5 flex flex-col gap-4">
      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</h3>
      <div className="flex items-end gap-1.5 h-36">
        {data.map((d, i) => {
          const heightPct = (d.value / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="relative w-full flex items-end" style={{ height: '120px' }}>
                <motion.div
                  className="w-full rounded-t-md relative"
                  style={{ background: 'var(--gradient-accent)' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.7, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Tooltip on hover */}
                  <div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 mono text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    style={{ background: 'var(--bg-elevated)', color: 'var(--accent-glow)', border: '1px solid var(--border-color)' }}
                  >
                    {d.value}
                  </div>
                </motion.div>
              </div>
              <span className="mono text-[9px] rotate-45 origin-left" style={{ color: 'var(--text-subtle)' }}>
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HorizontalBar({ data, label }: { data: readonly { label: string; value: number }[]; label: string }) {
  const max = Math.max(...data.map((d) => d.value));
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="card-glass rounded-2xl p-5 flex flex-col gap-4">
      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</h3>
      <div className="flex flex-col gap-3">
        {data.map((d, i) => {
          const pct = Math.round((d.value / max) * 100);
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="mono text-xs w-16 flex-shrink-0 text-right" style={{ color: 'var(--text-muted)' }}>{d.label}</span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-accent-2)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              <span className="mono text-xs w-8 flex-shrink-0" style={{ color: 'var(--accent-glow)' }}>
                {Math.round((d.value / total) * 100)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AnalyticsPanel({ data }: { data: AnalyticsData }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{data.subheading}</p>
      <BarChart data={data.dailyData} label={data.heading} />
      <HorizontalBar data={data.universityData} label="Registrations by University" />
    </div>
  );
}
