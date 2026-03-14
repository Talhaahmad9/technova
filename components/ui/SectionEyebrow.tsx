interface SectionEyebrowProps {
  text: string;
  className?: string;
}

export function SectionEyebrow({ text, className = '' }: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className="inline-block h-px w-8"
        style={{ background: 'var(--accent-primary)' }}
      />
      <span
        className="text-xs font-mono font-semibold uppercase tracking-[0.2em]"
        style={{ color: 'var(--accent-primary)' }}
      >
        {text}
      </span>
      <span
        className="inline-block h-px w-8"
        style={{ background: 'var(--accent-primary)' }}
      />
    </div>
  );
}
