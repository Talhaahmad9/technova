'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  LayoutDashboard, Users, Trophy, Megaphone,
  Handshake, BarChart2, Menu, X, Zap, ExternalLink,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { THEMES, META } from '@/constants/site-data';

const NAV_ITEMS = [
  { id: 'overview',      label: 'Overview',       icon: LayoutDashboard },
  { id: 'registrations', label: 'Registrations',  icon: Users           },
  { id: 'competitions',  label: 'Competitions',   icon: Trophy          },
  { id: 'analytics',     label: 'Analytics',      icon: BarChart2       },
  { id: 'sponsors',      label: 'Sponsors',       icon: Handshake       },
  { id: 'team',          label: 'Team',           icon: Users           },
  { id: 'announcements', label: 'Announcements',  icon: Megaphone       },
];

interface DashboardShellProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (id: string) => void;
}

export function DashboardShell({ children, activeSection, onSectionChange }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>

      {/* ── Sidebar ── */}
      <aside
        className="hidden md:flex flex-col w-60 flex-shrink-0 border-r"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b flex-shrink-0" style={{ borderColor: 'var(--border-color)' }}>
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image src={META.logoPath} alt="logo" fill className="object-contain" style={{ mixBlendMode: 'screen' }} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{META.siteName}</span>
            <span className="mono text-[9px] uppercase tracking-widest" style={{ color: 'var(--accent-primary)' }}>Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left cursor-pointer"
                style={{
                  background: isActive ? 'var(--gradient-accent-2)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  boxShadow: isActive ? 'var(--glow-card)' : 'none',
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-colors duration-200"
            style={{ color: 'var(--text-subtle)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-glow)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-subtle)'; }}
          >
            <ExternalLink size={12} /> View Public Site
          </a>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-64 h-full flex flex-col border-r"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="h-16 flex items-center justify-between px-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{META.siteName}</span>
                <button onClick={() => setSidebarOpen(false)} style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
              </div>
              <nav className="flex flex-col gap-1 p-3">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onSectionChange(item.id); setSidebarOpen(false); }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left cursor-pointer"
                      style={{
                        background: isActive ? 'var(--gradient-accent-2)' : 'transparent',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                      }}
                    >
                      <Icon size={16} />{item.label}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} style={{ background: 'rgba(0,0,0,0.5)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="h-16 flex items-center justify-between px-6 border-b flex-shrink-0 sticky top-0 z-40"
          style={{ background: 'var(--bg-overlay)', borderColor: 'var(--border-color)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2" onClick={() => setSidebarOpen(true)} style={{ color: 'var(--text-muted)' }}>
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-semibold text-sm capitalize" style={{ color: 'var(--text-primary)' }}>
                {NAV_ITEMS.find(n => n.id === activeSection)?.label ?? 'Dashboard'}
              </h1>
              <p className="mono text-xs" style={{ color: 'var(--text-subtle)' }}>TechNova Admin</p>
            </div>
          </div>
          <ThemeToggle themes={THEMES} />
        </header>

        {/* Content — animation handled by DashboardClient */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
