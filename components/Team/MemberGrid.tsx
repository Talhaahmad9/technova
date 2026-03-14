import { MemberCard } from './MemberCard';
import type { TeamMember } from '@/constants/site-data';

interface MemberGridProps {
  members: readonly TeamMember[];
  heading: string;
  variant: 'faculty' | 'student';
}

export function MemberGrid({ members, heading, variant }: MemberGridProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Sub-heading with accent line */}
      <div className="flex items-center gap-4">
        <h3
          className="font-semibold text-lg whitespace-nowrap"
          style={{ color: 'var(--text-primary)' }}
        >
          {heading}
        </h3>
        <div
          className="flex-1 h-px"
          style={{ background: 'var(--border-color)' }}
        />
        <span
          className="mono text-xs font-medium"
          style={{ color: 'var(--text-subtle)' }}
        >
          {members.length} members
        </span>
      </div>

      {/* Grid — faculty gets 3 cols, students get 3-4 cols */}
      <div
        className={
          variant === 'faculty'
            ? 'grid grid-cols-2 sm:grid-cols-3 gap-4'
            : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'
        }
      >
        {members.map((member, i) => (
          <MemberCard
            key={member.id}
            member={member}
            index={i}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
