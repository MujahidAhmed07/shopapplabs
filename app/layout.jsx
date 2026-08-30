import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  metadataBase: new URL('https://shopapplabs.com'),
  title: {
    default: 'Username Checker — Check Social Media & Domain Availability Free | ShopApp Labs',
    template: '%s | ShopApp Labs'
  },
  description: 'Free real-time username checker and social media handle search engine. Instantly check username availability across 100+ networks including Instagram, TikTok, YouTube, X (Twitter), GitHub, Discord, and domain extensions (.com, .io, .dev).',
  keywords: [
    'username checker',
    'social media username checker',
    'handle checker',
    'check username availability',
    'instagram username checker',
    'tiktok username checker',
    'youtube handle checker',
    'twitter username check',
    'x handle search',
    'github username availability',
    'discord username checker',
    'domain name availability lookup',
    'brand handle search engine',
    'free username search tool'
  ],
  authors: [{ name: 'ShopApp Labs', url: 'https://shopapplabs.com' }],
  creator: 'ShopApp Labs',
  publisher: 'ShopApp Labs',
  alternates: {
    canonical: 'https://shopapplabs.com'
  },
  verification: {
    google: 'google-site-verification-placeholder',
    yandex: 'yandex-verification-placeholder',
    other: {
      'msvalidate.01': 'bing-verification-placeholder'
    }
  },
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
    title: 'Username Checker — Check Social Media & Domain Availability Free',
    description: 'Instant real-time username checker across 100+ social media networks, tech hubs, and domain extensions (.com, .io, .dev).',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShopApp Labs Username Checker Search Engine'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Username Checker — Check Social Media & Domain Availability Free',
    description: 'Instant real-time username checker across 100+ social media networks, tech hubs, and domain extensions (.com, .io, .dev).',
    images: ['/og-image.png']
  }
};

export default function RootLayout({ children }) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ShopApp Labs Username Checker',
      url: 'https://shopapplabs.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://shopapplabs.com/checker?username={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ShopApp Labs Username Checker',
      url: 'https://shopapplabs.com/checker',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and HTML5 support',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1280',
        bestRating: '5'
      },
      description: 'Free real-time multi-platform username and domain availability search engine covering 100+ networks including Instagram, TikTok, X, YouTube, GitHub, and Discord.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ShopApp Labs',
      url: 'https://shopapplabs.com',
      logo: 'https://shopapplabs.com/icon.png',
      sameAs: [
        'https://github.com/MujahidAhmed07/shopapplabs'
      ]
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isChunkError(msg) {
                  return (
                    msg.indexOf('ChunkLoadError') !== -1 ||
                    msg.indexOf('Loading chunk') !== -1 ||
                    msg.indexOf('Failed to fetch dynamically imported module') !== -1 ||
                    msg.indexOf('Importing a module script failed') !== -1 ||
                    msg.indexOf('Loading CSS chunk') !== -1 ||
                    msg.indexOf('Cannot read properties of undefined') !== -1
                  );
                }

                function tryReload(reason) {
                  try {
                    var now = Date.now();
                    var key = 'chunk_reload_at';
                    var lastReload = parseInt(sessionStorage.getItem(key) || '0', 10);
                    // Only reload if we haven't reloaded in the last 20s (anti-loop)
                    if (now - lastReload > 20000) {
                      sessionStorage.setItem(key, String(now));
                      // Cache-bust the URL to force fresh HTML from server
                      var url = window.location.href.split('?')[0].split('#')[0];
                      var sep = url.indexOf('?') === -1 ? '?' : '&';
                      window.location.replace(url + sep + '__r=' + now);
                    }
                  } catch(e) {}
                }

                function handleError(e) {
                  var err = e && (e.error || e.reason || e);
                  var msg = '';
                  try { msg = (err && (err.message || err.name || String(err))) || (e && e.message) || ''; } catch(x) {}
                  if (isChunkError(msg)) tryReload('error-event');
                }

                window.addEventListener('error', handleError, true);
                window.addEventListener('unhandledrejection', handleError, true);

                // Also watch for failed <script src> tags via MutationObserver
                if (typeof MutationObserver !== 'undefined') {
                  var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(m) {
                      m.addedNodes.forEach(function(node) {
                        if (node.tagName === 'SCRIPT' && node.src && node.src.indexOf('/_next/static/chunks/') !== -1) {
                          node.addEventListener('error', function() {
                            tryReload('script-load-failure');
                          });
                        }
                      });
                    });
                  });
                  observer.observe(document.documentElement, { childList: true, subtree: true });
                }
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
