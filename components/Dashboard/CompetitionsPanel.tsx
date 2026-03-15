'use client';

import { motion } from 'framer-motion';
import { Code2, Zap, Palette, TrendingUp, Globe } from 'lucide-react';
import type { DASHBOARD } from '@/constants/site-data';

type CompData = typeof DASHBOARD.competitionStats;

const iconMap: Record<string, React.ElementType> = { Code2, Zap, Palette, TrendingUp, Globe, Figma: Zap };

export function CompetitionsPanel({ data }: { data: CompData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{data.subheading}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {data.entries.map((entry, i) => {
          const Icon = iconMap[entry.icon] ?? Code2;
          const pct = Math.round((entry.registered / entry.capacity) * 100);
          const isNearFull = pct >= 80;
          return (
            <motion.div
              key={entry.id}
              className="card-glass rounded-2xl p-5 flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--gradient-accent-2)' }}
                >
                  <Icon size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{entry.category}</div>
                  <div className="mono text-xs" style={{ color: 'var(--text-subtle)' }}>{entry.registered} / {entry.capacity} registered</div>
                </div>
                <span
                  className="mono text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                  style={{
                    color: isNearFull ? '#f87171' : 'var(--accent-glow)',
                    background: isNearFull ? 'rgba(248,113,113,0.1)' : 'rgba(64,101,240,0.1)',
                  }}
                >
                  {pct}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: isNearFull ? 'linear-gradient(90deg,#f87171,#fb923c)' : 'var(--gradient-accent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
