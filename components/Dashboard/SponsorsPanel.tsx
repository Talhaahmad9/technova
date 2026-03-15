'use client';

import { motion } from 'framer-motion';
import type { DASHBOARD } from '@/constants/site-data';

type SponsorData = typeof DASHBOARD.sponsorManagement;

const statusStyle: Record<string, { color: string; bg: string; border: string }> = {
  'Confirmed':       { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.3)'  },
  'In Discussion':   { color: 'var(--accent-glow)', bg: 'rgba(64,101,240,0.1)', border: 'rgba(64,101,240,0.3)' },
  'Pending Invoice': { color: '#fb923c', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.3)'  },
};

export function SponsorsPanel({ data }: { data: SponsorData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{data.subheading}</p>
      <div className="card-glass rounded-2xl overflow-hidden">
        {/* Header */}
        <div
          className="grid grid-cols-4 px-5 py-3 mono text-xs uppercase tracking-widest"
          style={{ color: 'var(--text-subtle)', background: 'var(--bg-elevated)' }}
        >
          <span>Company</span><span className="hidden md:block">Contact</span>
          <span>Status</span><span className="text-right">Amount</span>
        </div>

        {data.entries.map((entry, i) => {
          const s = statusStyle[entry.status] ?? statusStyle['In Discussion'];
          return (
            <motion.div
              key={entry.id}
              className="grid grid-cols-4 px-5 py-4 border-t items-center text-sm"
              style={{ borderColor: 'var(--border-color)' }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{entry.name}</div>
              </div>
              <div className="hidden md:block">
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{entry.contactName}</div>
                <div className="mono text-xs" style={{ color: 'var(--text-subtle)' }}>{entry.contactEmail}</div>
              </div>
              <div>
                <span
                  className="mono text-xs px-2.5 py-1 rounded-full border"
                  style={{ color: s.color, background: s.bg, borderColor: s.border }}
                >
                  {entry.status}
                </span>
              </div>
              <div className="text-right mono font-semibold text-sm" style={{ color: 'var(--accent-glow)' }}>
                {entry.amount}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
