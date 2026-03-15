import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { RegistrationForm } from '@/components/Register/RegistrationForm';
import { REGISTRATION, META } from '@/constants/site-data';

export const metadata: Metadata = {
  title: `Register — ${META.siteName}`,
  description: REGISTRATION.pageSubtitle,
};

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen section-grid-bg"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Grid bg overlay */}
      <div className="fixed inset-0 section-grid-bg opacity-30 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.06,
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-[var(--accent-glow)]"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={16} />
            Back to site
          </Link>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-10 h-10">
              <Image
                src={META.logoPath}
                alt={META.siteName}
                fill
                className="object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              {META.siteName}
            </span>
          </Link>
        </div>

        {/* ── Page header ── */}
        <div className="mb-10 flex flex-col gap-2">
          <p
            className="mono text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: 'var(--accent-primary)' }}
          >
            {META.universityFull}
          </p>
          <h1
            className="font-bold text-3xl sm:text-4xl tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {REGISTRATION.pageTitle}
          </h1>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            {REGISTRATION.pageSubtitle}
          </p>
        </div>

        {/* ── Form card ── */}
        <div
          className="card-glass rounded-3xl p-6 sm:p-10"
        >
          <RegistrationForm />
        </div>

        {/* ── Footer note ── */}
        <p
          className="mono text-xs text-center mt-6"
          style={{ color: 'var(--text-subtle)' }}
        >
          By registering you agree to abide by the TechNova Code of Conduct.
        </p>
      </div>
    </div>
  );
}
