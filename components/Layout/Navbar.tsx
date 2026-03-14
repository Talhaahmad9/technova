'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { GlowButton } from '@/components/ui/GlowButton';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import type { NavLink, Theme } from '@/constants/site-data';

interface NavbarProps {
  links: readonly NavLink[];
  cta: NavLink;
  siteName: string;
  logoPath: string;
  themes: Theme[];
  defaultTheme: string;
}

export function Navbar({ links, cta, siteName, logoPath, themes }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'var(--bg-overlay)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.button
            className="flex items-center gap-2.5 group flex-shrink-0 bg-transparent border-0 p-0 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollTo('#hero')}
            aria-label="Go to top"
          >
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src={logoPath}
                alt={`${siteName} logo`}
                fill
                className="object-contain"
                style={{ mixBlendMode: 'screen' }}
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {siteName}
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--accent-primary)' }}>
                IoBM Hackathon
              </span>
            </div>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium transition-colors duration-200 hover:text-[var(--accent-glow)] cursor-pointer bg-transparent border-0"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle themes={themes} />
            <GlowButton label={cta.label} href={cta.href} size="sm" />
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle themes={themes} />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 bg-transparent border-0"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-16"
            style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col p-6 gap-2"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {links.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xl font-semibold text-left py-3 border-b cursor-pointer bg-transparent"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div className="pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <GlowButton
                  label={cta.label}
                  href={cta.href}
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
