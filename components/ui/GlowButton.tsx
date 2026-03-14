'use client';

import { motion } from 'framer-motion';

interface GlowButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function GlowButton({
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: GlowButtonProps) {
  const baseClass = `
    inline-flex items-center gap-2 font-semibold rounded-lg
    transition-all duration-300 cursor-pointer select-none
    font-mono tracking-wide
    ${sizeClasses[size]}
    ${className}
  `;

  const variantClass =
    variant === 'primary'
      ? 'btn-glow text-white'
      : variant === 'outline'
      ? 'border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-glow)] hover:shadow-[var(--glow-card)]'
      : 'text-[var(--text-muted)] hover:text-[var(--accent-glow)]';

  const content = (
    <>
      {label}
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`group ${baseClass} ${variantClass}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`group ${baseClass} ${variantClass}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
