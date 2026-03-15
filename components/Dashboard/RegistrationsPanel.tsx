'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { DASHBOARD } from '@/constants/site-data';

type RegData = typeof DASHBOARD.registrations;

const statusColor: Record<string, string> = {
  Confirmed:  'color: #4ade80; background: rgba(74,222,128,0.1); border-color: rgba(74,222,128,0.3)',
  Pending:    'color: var(--accent-glow); background: rgba(64,101,240,0.1); border-color: rgba(64,101,240,0.3)',
  Waitlisted: 'color: var(--text-muted); background: var(--bg-elevated); border-color: var(--border-color)',
};

export function RegistrationsPanel({ data }: { data: RegData }) {
  const [search, setSearch] = useState('');

  const filtered = data.entries.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.competition.toLowerCase().includes(search.toLowerCase()) ||
    r.team.toLowerCase().includes(search.toLowerCase())
  );

  const pct = Math.round((data.total / data.capacity) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Capacity bar */}
      <div className="card-glass rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            Capacity — {data.total} / {data.capacity}
          </span>
          <span className="mono text-sm font-bold" style={{ color: 'var(--accent-glow)' }}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-accent)' }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card-glass rounded-2xl overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: 'var(--border-color)' }}>
          <Search size={14} style={{ color: 'var(--text-subtle)' }} />
          <input
            type="text"
            placeholder="Search by name, team or competition…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--text-primary)' }}
          />
          <span className="mono text-xs" style={{ color: 'var(--text-subtle)' }}>{filtered.length} results</span>
        </div>

        {/* Header */}
        <div
          className="grid grid-cols-5 px-4 py-2 mono text-xs uppercase tracking-widest"
          style={{ color: 'var(--text-subtle)', background: 'var(--bg-elevated)' }}
        >
          <span>Name</span><span>Team</span><span className="hidden md:block">Competition</span>
          <span className="hidden md:block">Date</span><span>Status</span>
        </div>

        {/* Rows */}
        {filtered.map((r, i) => (
          <motion.div
            key={r.id}
            className="grid grid-cols-5 px-4 py-3 border-t text-sm items-center"
            style={{ borderColor: 'var(--border-color)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
          >
            <div>
              <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{r.name}</div>
              <div className="mono text-xs" style={{ color: 'var(--text-subtle)' }}>{r.email}</div>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>{r.team}</span>
            <span className="hidden md:block text-xs" style={{ color: 'var(--text-muted)' }}>{r.competition}</span>
            <span className="hidden md:block mono text-xs" style={{ color: 'var(--text-subtle)' }}>{r.registeredAt}</span>
            <span>
              <span
                className="mono text-xs px-2 py-1 rounded-full border"
                style={Object.fromEntries(
                  statusColor[r.status]?.split(';').map((s) => {
                    const [k, v] = s.split(':').map((x) => x.trim());
                    return [k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()), v];
                  }) ?? []
                )}
              >
                {r.status}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
