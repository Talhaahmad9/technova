'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import type { DASHBOARD } from '@/constants/site-data';

type TeamData = typeof DASHBOARD.teamPanel;

const taskStatusConfig = {
  Done:        { icon: CheckCircle2, color: '#4ade80', label: 'Done'        },
  'In Progress': { icon: Clock,       color: 'var(--accent-glow)', label: 'In Progress' },
  Pending:     { icon: Circle,       color: 'var(--text-subtle)', label: 'Pending'     },
};

export function TeamPanel({ data }: { data: TeamData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{data.subheading ?? ''}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {data.tasks.map((task, i) => {
          const cfg = taskStatusConfig[task.taskStatus] ?? taskStatusConfig.Pending;
          const StatusIcon = cfg.icon;
          const seed = task.memberName.split(' ')[0];
          return (
            <motion.div
              key={task.memberId}
              className="card-glass rounded-2xl p-4 flex items-start gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -2 }}
            >
              {/* Avatar */}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border-color)' }}>
                <Image
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`}
                  alt={task.memberName}
                  fill className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{task.memberName}</div>
                    <div className="mono text-xs" style={{ color: 'var(--accent-primary)' }}>{task.role}</div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <StatusIcon size={13} style={{ color: cfg.color }} />
                    <span className="mono text-xs" style={{ color: cfg.color }}>{cfg.label}</span>
                  </div>
                </div>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {task.task}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
