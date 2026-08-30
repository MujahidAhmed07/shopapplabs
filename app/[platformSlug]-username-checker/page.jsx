import React from 'react';
import SinglePlatformClient from './SinglePlatformClient';
import { PLATFORMS_CONFIG } from '@/lib/config/platforms';

const DEDICATED_PLATFORM_DETAILS = {
  instagram: {
    title: "Instagram Username & Handle Availability Checker",
    subtitle: "Check if an Instagram handle is taken, inspect owner profile data, and verify handle rules in real time.",
    guidelines: [
      "Must be between 1 and 30 characters long",
      "Only letters, numbers, periods (.), and underscores (_) allowed",
      "Cannot contain consecutive periods or start/end with a period",
      "No spaces or special symbols permitted"
    ]
  },
  tiktok: {
    title: "TikTok Username & @unique_id Availability Checker",
    subtitle: "Verify TikTok username availability in real-time before starting your creator channel.",
    guidelines: [
      "Must be between 2 and 24 characters long",
      "Only letters, numbers, underscores, and periods allowed",
      "Changing username is allowed once every 30 days on TikTok"
    ]
  },
  youtube: {
    title: "YouTube Handle (@name) Availability Search Tool",
    subtitle: "Reserve your official YouTube channel handle before someone else claims your brand.",
    guidelines: [
      "Must be between 3 and 30 characters long",
      "Must follow YouTube Community Guidelines",
      "Only alphanumeric characters, underscores, hyphens, and dots allowed"
    ]
  },
  twitter: {
    title: "X (Twitter) Handle Availability Checker",
    subtitle: "Search X (Twitter) handles live to ensure consistent brand identity across social media.",
    guidelines: [
      "Must be between 4 and 15 characters",
      "Only letters, numbers, and underscores allowed (no dots or dashes)",
      "Cannot contain 'Twitter' or 'Admin' in the handle"
    ]
  },
  github: {
    title: "GitHub Username & Organization Name Checker",
    subtitle: "Verify software developer account and organization username availability on GitHub.",
    guidelines: [
      "Must be between 1 and 39 characters",
      "Cannot contain consecutive hyphens or start/end with a hyphen",
      "Only alphanumeric characters and single hyphens allowed"
    ]
  },
  discord: {
    title: "Discord Unique Username Availability Checker",
    subtitle: "Check new global unique Discord @usernames without discriminator tags.",
    guidelines: [
      "Must be between 2 and 32 characters long",
      "Only lowercase letters, numbers, periods, and underscores allowed",
      "Cannot contain consecutive periods"
    ]
  },
  twitch: {
    title: "Twitch Username & Streamer Channel Name Checker",
    subtitle: "Check live channel name availability for Twitch streaming creators.",
    guidelines: [
      "Must be between 4 and 25 characters long",
      "Only alphanumeric characters and underscores permitted",
      "Cannot start or end with an underscore"
    ]
  },
  reddit: {
    title: "Reddit Username Availability Search Tool",
    subtitle: "Verify if a Reddit u/ username is available or claimed.",
    guidelines: [
      "Must be between 3 and 20 characters long",
      "Only letters, numbers, hyphens, and underscores permitted",
      "Usernames cannot be changed once created on Reddit"
    ]
  },
  bluesky: {
    title: "Bluesky Handle (.bsky.social) Availability Checker",
    subtitle: "Check AT Protocol handle availability on Bluesky social network.",
    guidelines: [
      "Must follow standard domain-compatible naming rules",
      "Only alphanumeric characters and hyphens allowed (no underscores)",
      "Resolves dynamically on the AT Protocol decentralized network"
    ]
  },
  domain: {
    title: "Domain Name (.COM, .IO, .DEV) DNS Availability Search",
    subtitle: "Perform live DNS lookup across top-level domain extensions with 1-click registration.",
    guidelines: [
      "Supports .com, .io, .dev, .org, .net, .co, .ai domain extensions",
      "Domains can only contain letters, numbers, and hyphens (underscores are never allowed in domain names)",
      "Instant Cloudflare DNS A and NS record resolution",
      "Direct registration link to Namecheap when domain is available"
    ]
  }
};

export async function generateMetadata({ params }) {
  const { platformSlug } = await params;
  const key = platformSlug ? platformSlug.replace(/-username-checker|-availability-checker/g, '') : 'instagram';
  const platformId = key === 'domain' ? 'domain_com' : key;
  const platformMeta = PLATFORMS_CONFIG.find((p) => p.id === platformId) || { name: key.charAt(0).toUpperCase() + key.slice(1) };

  const details = DEDICATED_PLATFORM_DETAILS[key] || {
    title: `${platformMeta.name} Username Availability Checker`,
    subtitle: `Real-time availability verification tool for ${platformMeta.name} handles.`
  };

  const canonicalUrl = `https://shopapplabs.com/${platformSlug}-username-checker`;

  return {
    title: `${details.title} — Free Real-Time Search`,
    description: details.subtitle,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${details.title} — Free Real-Time Search`,
      description: details.subtitle,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: details.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${details.title} — Free Real-Time Search`,
      description: details.subtitle,
      images: ['/og-image.png']
    }
  };
}

export default async function SinglePlatformPage({ params }) {
  const { platformSlug } = await params;
  const key = platformSlug ? platformSlug.replace(/-username-checker|-availability-checker/g, '') : 'instagram';
  const platformId = key === 'domain' ? 'domain_com' : key;
  const platformMeta = PLATFORMS_CONFIG.find((p) => p.id === platformId) || {
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    category: 'social'
  };

  const details = DEDICATED_PLATFORM_DETAILS[key] || {
    title: `${platformMeta.name} Username Availability Checker`,
    subtitle: `Real-time availability verification tool for ${platformMeta.name}.`,
    guidelines: [
      `Check real-time availability for ${platformMeta.name} handles`,
      "Instant profile link resolution and status verification",
      "100% Free with unlimited handle checks"
    ]
  };

  const structuredSchemas = [
    {
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
          name: 'Supported Platforms',
          item: 'https://shopapplabs.com/platforms'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${platformMeta.name} Checker`,
          item: `https://shopapplabs.com/${platformSlug}-username-checker`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${platformMeta.name} Username Checker`,
      url: `https://shopapplabs.com/${platformSlug}-username-checker`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description: details.subtitle
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How do I check if a ${platformMeta.name} username is available?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Enter your desired handle into the search box and click Check ${platformMeta.name}. Our engine queries official ${platformMeta.name} endpoints in real time to verify availability.`
          }
        },
        {
          '@type': 'Question',
          name: `What are the username requirements for ${platformMeta.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: details.guidelines ? details.guidelines.join('. ') : `Must adhere to ${platformMeta.name} terms of service and community guidelines.`
          }
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchemas) }}
      />
      <SinglePlatformClient
        key={key}
        platformKey={key}
        platformId={platformId}
        platformMeta={platformMeta}
        details={details}
        platformSlug={platformSlug}
      />
    </>
  );
}

