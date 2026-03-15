'use client';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}

export function FormField({ label, error, required, children, hint }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-medium"
        style={{ color: 'var(--text-primary)' }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: 'var(--accent-primary)' }}>*</span>
        )}
      </label>

      {children}

      {hint && !error && (
        <p className="text-xs mono" style={{ color: 'var(--text-subtle)' }}>{hint}</p>
      )}
      {error && (
        <p className="text-xs font-medium" style={{ color: '#f87171' }}>{error}</p>
      )}
    </div>
  );
}

// ── Shared input styles ───────────────────────────────────────────────────────

export const inputClass = `
  w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200
  bg-transparent
`;

export const inputStyle = {
  background:   'var(--bg-elevated)',
  border:       '1px solid var(--border-color)',
  color:        'var(--text-primary)',
};

export const inputFocusStyle = {
  borderColor:  'var(--accent-primary)',
  boxShadow:    '0 0 0 3px rgba(64,101,240,0.12)',
};

export const inputErrorStyle = {
  borderColor:  '#f87171',
  boxShadow:    '0 0 0 3px rgba(248,113,113,0.12)',
};
