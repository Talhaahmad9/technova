'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import type { Theme } from '@/constants/site-data';

interface ThemeToggleProps {
  themes: Theme[];
}

export function ThemeToggle({ themes }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-lg transition-all duration-200 hover:text-[var(--accent-glow)]"
        style={{
          color: 'var(--text-muted)',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-elevated)',
        }}
        aria-label="Switch theme"
      >
        <Palette size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute right-0 top-full mt-2 z-50 min-w-[180px] rounded-xl overflow-hidden"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-elevated)',
              }}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <p
                className="px-3 pt-3 pb-1 text-xs font-mono uppercase tracking-widest"
                style={{ color: 'var(--text-subtle)' }}
              >
                Theme
              </p>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[var(--bg-surface)]"
                >
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {t.label}
                    </p>
                    <p
                      className="text-xs font-mono"
                      style={{ color: 'var(--text-subtle)' }}
                    >
                      {t.description}
                    </p>
                  </div>
                  {theme === t.id && (
                    <Check size={14} style={{ color: 'var(--accent-primary)' }} />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
