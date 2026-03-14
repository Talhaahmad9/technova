interface BadgeProps {
  label: string;
  variant?: 'accent' | 'muted' | 'outline';
  className?: string;
}

export function Badge({ label, variant = 'accent', className = '' }: BadgeProps) {
  const variantClass =
    variant === 'accent'
      ? 'bg-[var(--accent-primary)] bg-opacity-20 text-[var(--accent-glow)] border-[var(--accent-primary)] border-opacity-30'
      : variant === 'muted'
      ? 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-color)]'
      : 'border border-[var(--border-color)] text-[var(--text-muted)]';

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full
        text-xs font-mono font-medium border
        ${variantClass} ${className}
      `}
    >
      {label}
    </span>
  );
}
