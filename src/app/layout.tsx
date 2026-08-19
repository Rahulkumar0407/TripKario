import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import SmoothScroll from '@/components/SmoothScroll';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TripKario — Curated Tours & Holiday Experiences | Find Your Journey',
  description: 'Curated journeys across India and beyond, planned around the way you want to travel. Discover handpicked itineraries to Kashmir, Rajasthan, Kerala, Meghalaya, and Ladakh with dedicated expert human assistance.',
  keywords: [
    'TripKario',
    'Curated Tours India',
    'Kashmir Tour Packages',
    'Himachal Holiday Packages',
    'Kerala Backwaters Houseboat',
    'Rajasthan Heritage Tours',
    'Meghalaya Living Root Bridges',
    'Custom Travel Planner India',
  ],
  authors: [{ name: 'TripKario' }],
  openGraph: {
    title: 'TripKario — Curated Tours & Travel Planning',
    description: 'Curated journeys across India and beyond, planned around the way you want to travel.',
    url: 'https://tripkario.com',
    siteName: 'TripKario',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'TripKario Curated Journeys',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripKario — Curated Tours & Travel Planning',
    description: 'Curated journeys across India and beyond, planned around the way you want to travel.',
    images: ['https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1200&auto=format&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable}`} suppressHydrationWarning>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased min-h-screen">
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
