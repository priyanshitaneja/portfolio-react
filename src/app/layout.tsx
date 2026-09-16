import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fontVariables } from './fonts';

import './globals.css';
import '@/components/Header/index.scss';

const SITE_URL = 'https://www.priyanshitaneja.com';

const DESCRIPTION =
  'AI Frontend Engineer building React and TypeScript interfaces for fintech and ' +
  'e-commerce, with a focus on web performance and accessibility.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Priyanshi Taneja — AI Frontend Engineer',
    template: '%s — Priyanshi Taneja',
  },
  description: DESCRIPTION,
  authors: [{ name: 'Priyanshi Taneja' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Priyanshi Taneja',
    locale: 'en_US',
    url: '/',
    title: 'Priyanshi Taneja — AI Frontend Engineer',
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Priyanshi Taneja — AI Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Priyanshi Taneja — AI Frontend Engineer',
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#F4EEE4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
   * There is one theme, so there is nothing for a pre-paint script to restore
   * and nothing for a provider to hold. That removes the inline
   * localStorage read from <head>, the data-theme attribute, the
   * suppressHydrationWarning it required, and a client context from the root
   * layout — the palette is now plain CSS on :root and works with JavaScript
   * disabled, which is what the old THEME_INIT comment was working to
   * approximate.
   */
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <div className="app-content-enter">
          <Header />
          {/*
            Every route's content goes inside one <main>. axe runs with no
            --tags, so its best-practice rules are live: `region` wants every
            node in a landmark and `landmark-one-main` wants exactly one
            <main>, and both were failing on all four routes because the
            document had no landmarks at all. Lighthouse never caught it —
            its gatherer runs only wcag2a/wcag2aa, which excludes `region`,
            and scores `landmark-one-main` at weight 0.
          */}
          <main>{children}</main>
          <Footer />
        </div>

        {/*
          Replaces the hand-rolled gtag snippet. Besides loading non-blocking,
          this tracks pageviews on client-side navigation — the inline snippet
          only ever fired on a full document load, so every route change after
          the first went unrecorded.
        */}
        <GoogleAnalytics gaId="G-05E6B86LJ9" />
      </body>
    </html>
  );
}
