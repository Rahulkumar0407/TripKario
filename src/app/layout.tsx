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
  metadataBase: new URL('https://tripkario.com'),
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
    description: 'Trips across India, planned around you. Handpicked itineraries to Kashmir, Ladakh, Rajasthan, Kerala, and Meghalaya.',
    url: 'https://tripkario.com',
    siteName: 'TripKario',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripKario — Curated Tours & Travel Planning',
    description: 'Trips across India, planned around you. Handpicked itineraries to Kashmir, Ladakh, Rajasthan, Kerala, and Meghalaya.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
