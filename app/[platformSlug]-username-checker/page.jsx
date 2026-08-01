import React from 'react';
import SinglePlatformClient from './SinglePlatformClient';
import { PLATFORMS_CONFIG } from '@/lib/config/platforms';

const DEDICATED_PLATFORM_DETAILS = {
  instagram: {
    title: "Instagram Username & Handle Availability Checker",
    subtitle: "Check if an Instagram handle is taken, inspect owner profile data, and verify handle rules.",
    guidelines: [
      "Must be between 1 and 30 characters long",
      "Only letters, numbers, periods (.), and underscores (_) allowed",
      "Cannot contain consecutive periods or start/end with a period",
      "No spaces or special characters permitted"
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
      "Must be 15 characters or fewer",
      "Only letters, numbers, and underscores allowed (no dots or dashes)",
      "Cannot contain 'Twitter' or 'Admin' in the handle"
    ]
  },
  github: {
    title: "GitHub Username & Organization Name Checker",
    subtitle: "Verify software developer account and organization username availability on GitHub.",
    guidelines: [
      "Must be 39 characters or fewer",
      "Cannot contain consecutive hyphens or start/end with a hyphen",
      "Only alphanumeric characters and single hyphens allowed"
    ]
  },
  domain: {
    title: "Domain Name (.COM, .IO, .DEV) DNS Availability Search",
    subtitle: "Perform live DNS lookup across top-level domain extensions with 1-click registration.",
    guidelines: [
      "Supports .com, .io, .dev, .org, .net, .co, .ai domain extensions",
      "Instant Cloudflare DNS A and NS record resolution",
      "Direct registration link to Namecheap when domain is available"
    ]
  }
};

export async function generateMetadata({ params }) {
  const { platformSlug } = await params;
  const key = platformSlug ? platformSlug.replace(/-username-checker|-availability-checker/g, '') : 'instagram';
  const platformId = key === 'domain' ? 'domain_com' : key;
  const platformMeta = PLATFORMS_CONFIG.find((p) => p.id === platformId) || { name: key };

  const details = DEDICATED_PLATFORM_DETAILS[key] || {
    title: `${platformMeta.name} Username Availability Checker`,
    subtitle: `Real-time availability verification tool for ${platformMeta.name}.`
  };

  const canonicalUrl = `https://shopapplabs.com/${platformSlug}-username-checker`;

  return {
    title: details.title,
    description: details.subtitle,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: details.title,
      description: details.subtitle,
      url: canonicalUrl,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: details.title,
      description: details.subtitle
    }
  };
}

export default async function SinglePlatformPage({ params }) {
  const { platformSlug } = await params;
  const key = platformSlug ? platformSlug.replace(/-username-checker|-availability-checker/g, '') : 'instagram';
  const platformId = key === 'domain' ? 'domain_com' : key;
  const platformMeta = PLATFORMS_CONFIG.find((p) => p.id === platformId) || {
    id: 'instagram',
    name: 'Instagram',
    category: 'social'
  };

  const details = DEDICATED_PLATFORM_DETAILS[key] || {
    title: `${platformMeta.name} Username Availability Checker`,
    subtitle: `Real-time availability verification tool for ${platformMeta.name}.`,
    guidelines: [
      `Check availability for ${platformMeta.name} handles`,
      "Instant profile link resolution",
      "Free and unlimited checks"
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I check if a ${platformMeta.name} username is available?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Enter the handle in our search box above and click Check ${platformMeta.name}. Our tool performs a live endpoint query to verify availability.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
