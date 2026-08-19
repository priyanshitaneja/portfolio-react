import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import Header from '@/components/Header';
import SkillsList from '@/components/SkillsList';
import MainLoader from '@/components/MainLoader';
import { ThemeProvider } from '@/theme/ThemeContext';
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
  themeColor: '#E3DADB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * data-theme is server-rendered rather than set by a pre-paint script.
     * In CRA, index.html was a fixed template and React never owned <html>, so
     * an inline script was the only option. Here the attribute is baked into
     * the prerendered HTML: no flash, no hydration mismatch, and it survives
     * with JavaScript disabled.
     *
     * The script comes back — and is genuinely load-bearing — only once theme
     * persistence lands, since the prerendered HTML is theme-agnostic and only
     * the browser knows the stored value.
     */
    <html lang="en" data-theme="poetcore" className={fontVariables}>
      <head>
        {/*
          Icons still load from a third-party origin. The inlined SVG icons
          land in their own commit, so this stays a like-for-like port.
        */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="app-content-enter">
            <Header />
            {children}
            <SkillsList />
          </div>
          {/*
            Rendered in the layout, not a page, so it plays once per hard load
            instead of replaying on every client-side navigation.
          */}
          <MainLoader />
        </ThemeProvider>

        {/*
          Like-for-like port of the gtag snippet that lived in index.html.
          It still misses pageviews on client-side navigation, exactly as the
          original did; @next/third-parties fixes that in its own commit.
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-05E6B86LJ9"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-05E6B86LJ9');`}
        </Script>
      </body>
    </html>
  );
}
