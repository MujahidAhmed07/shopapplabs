import React from 'react';

export const metadata = {
  title: 'Username Checker — Check 100+ Social Media Handles & Domains Instantly',
  description: 'Check username and handle availability across 100+ social networks, developer platforms, gaming services, and domain TLDs in real-time. Free instant handle search tool.',
  keywords: [
    'username checker',
    'social media handle search',
    'check username availability',
    'instagram handle search',
    'tiktok username checker',
    'youtube handle availability',
    'twitter username check',
    'github username availability',
    'live domain search',
    'brand name checker'
  ],
  alternates: {
    canonical: 'https://shopapplabs.com/checker'
  },
  openGraph: {
    title: 'Username Checker — Check 100+ Social Media Handles & Domains Instantly',
    description: 'Instant multi-platform handle and domain availability search engine. Free, real-time, and supports 100+ networks.',
    url: 'https://shopapplabs.com/checker',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShopApp Labs Username Checker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Username Checker — Check 100+ Social Media Handles & Domains Instantly',
    description: 'Instant multi-platform handle and domain availability search engine. Free, real-time, and supports 100+ networks.',
    images: ['/og-image.png']
  }
};

export default function CheckerLayout({ children }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://shopapplabs.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Username Checker',
        item: 'https://shopapplabs.com/checker'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
