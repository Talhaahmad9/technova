import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { META, DEFAULT_THEME } from '@/constants/site-data';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: `${META.siteName} — ${META.university}`,
  description: META.description,
  keywords: ['hackathon', 'KIET', 'university', 'coding', 'competition', 'Pakistan', 'tech'],
  openGraph: {
    title: `${META.siteName} — ${META.tagline}`,
    description: META.description,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme={DEFAULT_THEME}>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme={DEFAULT_THEME}
          themes={['fusion-dark', 'plasma-rift', 'solar-flare', 'obsidian-pearl', 'arctic-signal']}
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
