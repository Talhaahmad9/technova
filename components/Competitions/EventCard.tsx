'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { CompetitionEvent } from '@/constants/site-data';

interface EventCardProps {
  event: CompetitionEvent;
  index: number;
}

const difficultyColor: Record<string, string> = {
  Beginner: 'accent',
  Intermediate: 'muted',
  Advanced: 'outline',
};

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      className="card-glass rounded-2xl p-6 flex flex-col gap-4 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <h3
          className="font-bold text-lg leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {event.title}
        </h3>
        <Badge
          label={event.difficulty}
          variant={(difficultyColor[event.difficulty] ?? 'muted') as 'accent' | 'muted' | 'outline'}
        />
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        {event.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Users size={14} style={{ color: 'var(--accent-primary)' }} />
          <span
            className="mono text-xs font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            {event.teamSize}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Trophy size={14} style={{ color: 'var(--accent-primary)' }} />
          <span
            className="mono text-xs font-semibold"
            style={{ color: 'var(--accent-glow)' }}
          >
            {event.prizePool}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="mono text-xs px-2 py-0.5 rounded"
            style={{
              color: 'var(--text-subtle)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA hint */}
      <div
        className="flex items-center gap-1 text-xs font-mono font-semibold mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: 'var(--accent-primary)' }}
      >
        View details <ChevronRight size={14} />
      </div>
    </motion.div>
  );
}
