import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  metadataBase: new URL('https://shopapplabs.com'),
  title: {
    default: 'ShopApp Labs | Free Social Media Username & Domain Checker',
    template: '%s | ShopApp Labs'
  },
  description: 'Instant handle & username search engine across 100+ social media platforms (Instagram, TikTok, YouTube, X, GitHub, Discord) and top-level domain extensions (.com, .io, .dev).',
  keywords: [
    'username checker',
    'social media handle search',
    'instagram username availability',
    'tiktok username checker',
    'youtube handle search',
    'twitter username check',
    'github account checker',
    'domain name lookup',
    'brand name availability'
  ],
  authors: [{ name: 'ShopApp Labs' }],
  creator: 'ShopApp Labs',
  publisher: 'ShopApp Labs',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: '/icon.png'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shopapplabs.com',
    siteName: 'ShopApp Labs Username Checker',
    title: 'ShopApp Labs | Free Real-Time Social Media Username & Domain Checker',
    description: 'Instant real-time handle & username search engine across 100+ social media platforms and domain extensions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShopApp Labs Username Search Engine'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopApp Labs | Free Real-Time Social Media Username & Domain Checker',
    description: 'Instant real-time handle & username search engine across 100+ social media platforms and domain extensions.',
    images: ['/og-image.png']
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ShopApp Labs Username Search Engine',
    url: 'https://shopapplabs.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://shopapplabs.com/checker?username={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.addEventListener('error', function(e) {
                  var msg = e && (e.message || (e.error && e.error.message) || '');
                  if (msg && (msg.indexOf('ChunkLoadError') !== -1 || msg.indexOf('Loading chunk') !== -1)) {
                    if (!window.sessionStorage.getItem('chunk_reload_attempt')) {
                      window.sessionStorage.setItem('chunk_reload_attempt', 'true');
                      window.location.reload(true);
                    }
                  }
                }, true);
              })();
            `
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#090D16] text-slate-100 antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
