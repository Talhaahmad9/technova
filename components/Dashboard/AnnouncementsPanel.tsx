'use client';

import { motion } from 'framer-motion';
import { Send, FileText, Clock } from 'lucide-react';
import type { DASHBOARD } from '@/constants/site-data';

type AnnData = typeof DASHBOARD.announcements;

const statusConfig = {
  Sent:      { icon: Send,     color: '#4ade80', bg: 'rgba(74,222,128,0.1)',   border: 'rgba(74,222,128,0.3)'  },
  Scheduled: { icon: Clock,    color: 'var(--accent-glow)', bg: 'rgba(64,101,240,0.1)', border: 'rgba(64,101,240,0.3)' },
  Draft:     { icon: FileText, color: 'var(--text-muted)',  bg: 'var(--bg-elevated)',   border: 'var(--border-color)'  },
};

const audienceColor: Record<string, string> = {
  All:          'var(--accent-primary)',
  Participants: '#a78bfa',
  Faculty:      '#34d399',
  Sponsors:     '#fb923c',
};

export function AnnouncementsPanel({ data }: { data: AnnData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{data.subheading}</p>
      <div className="flex flex-col gap-3">
        {data.entries.map((ann, i) => {
          const cfg = statusConfig[ann.status] ?? statusConfig.Draft;
          const StatusIcon = cfg.icon;
          return (
            <motion.div
              key={ann.id}
              className="card-glass rounded-2xl p-5 flex flex-col gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{ann.title}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className="mono text-xs px-2 py-0.5 rounded-full"
                      style={{ color: audienceColor[ann.audience], background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}
                    >
                      → {ann.audience}
                    </span>
                    {ann.sentAt && (
                      <span className="mono text-xs" style={{ color: 'var(--text-subtle)' }}>{ann.sentAt}</span>
                    )}
                  </div>
                </div>
                <span
                  className="flex items-center gap-1.5 mono text-xs px-2.5 py-1 rounded-full border flex-shrink-0"
                  style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
                >
                  <StatusIcon size={10} />
                  {ann.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{ann.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
