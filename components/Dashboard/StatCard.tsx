'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, Handshake, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Users, Trophy, Handshake, Calendar, TrendingUp };

interface DashStatCardProps {
  value: string;
  label: string;
  trend: string;
  trendUp: boolean;
  icon: string;
  index: number;
}

export function DashStatCard({ value, label, trend, trendUp, icon, index }: DashStatCardProps) {
  const Icon = iconMap[icon] ?? Users;
  return (
    <motion.div
      className="card-glass rounded-2xl p-5 flex flex-col gap-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--gradient-accent-2)' }}
        >
          <Icon size={16} className="text-white" />
        </div>
        <div
          className="flex items-center gap-1 mono text-xs font-medium px-2 py-1 rounded-full"
          style={{
            color: trendUp ? 'var(--accent-glow)' : 'var(--text-muted)',
            background: trendUp ? 'rgba(64,101,240,0.1)' : 'var(--bg-elevated)',
          }}
        >
          {trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {trend}
        </div>
      </div>
      <div>
        <div className="mono font-bold text-3xl" style={{ color: 'var(--accent-glow)' }}>{value}</div>
        <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</div>
      </div>
    </motion.div>
  );
}
