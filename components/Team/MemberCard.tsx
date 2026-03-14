'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Github } from 'lucide-react';
import type { TeamMember } from '@/constants/site-data';

interface MemberCardProps {
  member: TeamMember;
  index: number;
  variant?: 'faculty' | 'student';
}

export function MemberCard({ member, index, variant = 'student' }: MemberCardProps) {
  return (
    <motion.div
      className="card-glass rounded-2xl p-6 flex flex-col items-center text-center gap-4 group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
    >
      {/* Avatar */}
      <div className="relative">
        <div
          className="w-20 h-20 rounded-2xl overflow-hidden"
          style={{
            border: '2px solid var(--border-color)',
            boxShadow: 'var(--glow-card)',
          }}
        >
          <Image
            src={member.avatarUrl}
            alt={member.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
            unoptimized /* DiceBear SVGs don't need Next optimization */
          />
        </div>

        {/* Faculty badge indicator */}
        {variant === 'faculty' && (
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'var(--gradient-accent)' }}
          >
            <span className="text-white text-[8px] font-bold">F</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3
          className="font-semibold text-sm leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {member.name}
        </h3>
        <p
          className="mono text-xs font-medium"
          style={{ color: 'var(--accent-primary)' }}
        >
          {member.role}
        </p>
        {member.department && (
          <p
            className="text-xs"
            style={{ color: 'var(--text-subtle)' }}
          >
            {member.department}
          </p>
        )}
      </div>

      {/* Social links */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
            style={{
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-glow)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-color)';
            }}
          >
            <Linkedin size={12} />
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} GitHub`}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
            style={{
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-glow)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-color)';
            }}
          >
            <Github size={12} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
