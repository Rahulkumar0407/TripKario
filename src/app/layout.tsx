import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tripkario — Curated Tours & Holiday Experiences | Find Your Journey',
  description: 'Curated trips across India and beyond, planned around the way you want to travel. Discover handpicked journeys to Kashmir, Rajasthan, Himachal, Kerala, Goa, and beyond with dedicated expert human assistance.',
  keywords: [
    'Tripkario',
    'Tripkario.com',
    'Curated Tours India',
    'Kashmir Tour Packages',
    'Himachal Holiday Packages',
    'Kerala Backwaters Houseboat',
    'Rajasthan Heritage Tours',
    'Custom Travel Planner India',
    'Weekend Getaways India',
  ],
  authors: [{ name: 'Tripkario' }],
  openGraph: {
    title: 'Tripkario — Curated Tours & Travel Planning',
    description: 'Curated trips across India and beyond, planned around the way you want to travel.',
    url: 'https://tripkario.com',
    siteName: 'Tripkario',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Tripkario Curated Journeys',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tripkario — Curated Tours & Travel Planning',
    description: 'Curated trips across India and beyond, planned around the way you want to travel.',
    images: ['https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1200&auto=format&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
