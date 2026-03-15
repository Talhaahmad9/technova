'use client';

import Image from 'next/image';
import { Instagram, Linkedin, Twitter, Github } from 'lucide-react';
import { META } from '@/constants/site-data';
import type { FooterLink, SocialLink } from '@/constants/site-data';

interface FooterData {
  tagline: string;
  copyright: string;
  links: readonly FooterLink[];
  socials: readonly SocialLink[];
}

interface FooterProps {
  data: FooterData;
  siteName: string;
}

const iconMap: Record<string, React.ElementType> = {
  Instagram,
  Linkedin,
  Twitter,
  Github,
};

export function Footer({ data, siteName }: FooterProps) {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src={META.logoPath}
                  alt={siteName}
                  fill
                  className="object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                {siteName}
              </span>
            </div>
            <p className="text-sm font-mono" style={{ color: 'var(--text-subtle)' }}>
              {data.tagline}
            </p>
          </div>

          {/* Links — key on label, not href, to avoid duplicate '#' keys */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {data.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-glow)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials — key on platform, event handlers valid because 'use client' */}
          <div className="flex items-center gap-3">
            {data.socials.map((social) => {
              const Icon = iconMap[social.icon];
              return Icon ? (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-elevated)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--accent-primary)';
                    el.style.color = 'var(--accent-glow)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--border-color)';
                    el.style.color = 'var(--text-muted)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ) : null;
            })}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-6 text-center border-t text-sm font-mono"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-subtle)' }}
        >
          {data.copyright}
        </div>
      </div>
    </footer>
  );
}
