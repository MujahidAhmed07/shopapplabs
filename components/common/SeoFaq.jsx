'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import GlassCard from './GlassCard';

/* ─── Generic FAQ (used on Home & Checker pages only) ─────────────────── */
export const GENERIC_FAQS = [
  {
    question: "How does the ShopApp Labs Username Checker work?",
    answer: "Our engine queries public profile endpoints and official API resolvers across 100+ social media platforms, domain TLD registers, developer portals, and gaming networks simultaneously in real-time. Results are returned asynchronously as each check finishes."
  },
  {
    question: "Why should I secure my brand name across all social media platforms?",
    answer: "Consistency is critical for brand recognition and search engine optimization (SEO). Securing your brand handle on Instagram, X (Twitter), TikTok, YouTube, GitHub, and major domain TLDs prevents impersonation, builds trust, and makes it easy for customers to find you."
  },
  {
    question: "Is this username search tool free to use?",
    answer: "Yes! The ShopApp Labs Username Checker is 100% free with no registration required. You can check unlimited usernames, handles, and domain names."
  },
  {
    question: "Which social networks and domain extensions are supported?",
    answer: "We support over 100+ networks including Instagram, TikTok, Facebook, X (Twitter), YouTube, Twitch, Snapchat, Reddit, Discord, Pinterest, GitHub, GitLab, DEV.to, Docker Hub, Medium, Substack, Steam, Minecraft, and major domain TLDs (.com, .io, .dev, .org, .net, .co, .ai)."
  },
  {
    question: "What should I do if my desired username is already taken?",
    answer: "If your exact handle is taken, try adding a relevant keyword or suffix (e.g., @getshopapp, @shopapphq, @shopappofficial), or check alternative top-level domain extensions like .io or .dev."
  }
];

/* ─── Platform-Specific FAQs ──────────────────────────────────────────── */
export const PLATFORM_FAQS = {
  instagram: [
    {
      question: "How do I check if an Instagram username is available?",
      answer: "Type the handle into the search box above (without the @ symbol) and click 'Check Instagram'. Our tool queries Instagram's public API in real time and returns availability status within seconds."
    },
    {
      question: "What are Instagram's username rules?",
      answer: "Instagram usernames must be 1–30 characters long and can only contain letters, numbers, periods (.), and underscores (_). Consecutive periods and usernames starting or ending with a period are not allowed. No spaces or special characters."
    },
    {
      question: "Can I reserve an Instagram username before creating an account?",
      answer: "Instagram does not offer username reservation. The only way to secure a handle is to create an account immediately after confirming it's available using our checker."
    },
    {
      question: "Why does my Instagram username check show UNKNOWN?",
      answer: "UNKNOWN means Instagram's servers did not return a conclusive response (this can happen with rate limiting). Wait a few seconds and try again — our tool will re-query the endpoint."
    },
    {
      question: "Can businesses use the same username on Instagram and TikTok?",
      answer: "Yes, and it's strongly recommended. Brand handle consistency across Instagram and TikTok boosts Google's Knowledge Graph recognition, improves organic search rankings, and increases trust with potential customers."
    }
  ],
  tiktok: [
    {
      question: "How can I check TikTok username availability?",
      answer: "Enter the TikTok @unique_id in the field above and press 'Check TikTok'. Our tool performs a live lookup against TikTok's public profile API and returns the current availability status instantly."
    },
    {
      question: "What are TikTok's username rules and character limits?",
      answer: "TikTok usernames (@unique_id) must be 2–24 characters and can include letters, numbers, underscores, and periods. No spaces, hyphens, or special characters. You can only change your username once every 30 days."
    },
    {
      question: "Can I change my TikTok username if it's taken?",
      answer: "TikTok allows one username change every 30 days. If your desired handle is taken, consider variants like adding your niche keyword, country code, or suffix (e.g., @yourbrand_official)."
    },
    {
      question: "Does TikTok username availability affect SEO?",
      answer: "Indirectly yes. Consistent handles across TikTok, Instagram, and your domain name strengthen your brand entity signals on Google, which can improve search rankings and local business discovery."
    },
    {
      question: "What happens if someone squats my TikTok username?",
      answer: "You can report username squatting to TikTok's Trust & Safety team if the account impersonates your brand. Always secure your handle on TikTok immediately after confirming it's available."
    }
  ],
  youtube: [
    {
      question: "How do I check if a YouTube channel handle (@name) is available?",
      answer: "Type the handle (without @) in the search box and click 'Check YouTube'. Our tool checks YouTube's public handle resolution system and tells you if the @handle is free or already claimed."
    },
    {
      question: "What are YouTube handle rules?",
      answer: "YouTube handles must be 3–30 characters and can include letters, numbers, underscores, hyphens, and dots. They must follow YouTube Community Guidelines and must be unique across all YouTube channels."
    },
    {
      question: "When did YouTube introduce @handles?",
      answer: "YouTube launched its @handle system in late 2022 to give all channels a unique, shareable identity. Handles are separate from channel names and appear in search results and Shorts."
    },
    {
      question: "Does having a matching YouTube handle and domain name improve SEO?",
      answer: "Yes. When your YouTube channel handle (@yourbrand), domain (yourbrand.com), and social profiles all match, Google's Knowledge Graph can more confidently link them as a single entity — boosting your branded search rankings."
    },
    {
      question: "Can I claim a YouTube handle if my channel is new?",
      answer: "Yes, all YouTube channels (including new ones) can claim a @handle. Go to YouTube Studio → Customization → Basic info to set or change your handle."
    }
  ],
  twitter: [
    {
      question: "How do I check if an X (Twitter) handle is available?",
      answer: "Enter the Twitter/X username (without @) in the field above and click 'Check X'. Our tool queries X's public profile resolver to determine real-time handle availability."
    },
    {
      question: "What are X (Twitter) username rules?",
      answer: "X usernames must be 15 characters or fewer and can only contain letters, numbers, and underscores. Dots and hyphens are NOT allowed. Usernames containing 'Twitter' or 'admin' are reserved."
    },
    {
      question: "What happens to inactive or deactivated X (Twitter) usernames?",
      answer: "X deactivates accounts after 30 days of inactivity and may reclaim usernames after extended inactivity periods. Usernames from deactivated accounts can become available again."
    },
    {
      question: "Why is X (Twitter) handle consistency important for brands?",
      answer: "Having @yourbrand as your X handle, combined with matching Instagram and TikTok handles, creates a unified brand footprint that search engines use for entity recognition — directly impacting your knowledge panel and branded search results."
    },
    {
      question: "Can I buy or transfer X (Twitter) usernames?",
      answer: "X's Terms of Service prohibit buying or selling usernames. However, if a brand name is being squatted, you can report it to X's support for username release review."
    }
  ],
  github: [
    {
      question: "How do I check GitHub username availability?",
      answer: "Enter the GitHub username or organization name above and click 'Check GitHub'. Our tool performs a live GitHub API lookup and returns whether the account is active, available, or unknown."
    },
    {
      question: "What are GitHub username rules?",
      answer: "GitHub usernames can be up to 39 characters and may contain alphanumeric characters and single hyphens. They cannot start or end with a hyphen or contain consecutive hyphens."
    },
    {
      question: "How do I claim a GitHub organization username for my company?",
      answer: "Create a GitHub account, go to github.com/organizations/new, and claim your organization name. Organization names follow the same rules as personal usernames and must be unique across all GitHub."
    },
    {
      question: "What if my GitHub username is already taken?",
      answer: "If the account appears inactive (no contributions, repos, or activity in years), you can contact GitHub support to request a username release. GitHub has a Username Policy for inactive accounts."
    },
    {
      question: "Does GitHub username match my dev brand SEO?",
      answer: "Absolutely. For developers and software companies, having @yourbrand on GitHub, Twitter/X, and a matching .io or .dev domain creates a coherent developer brand entity that ranks strongly in Google and GitHub searches."
    }
  ],
  domain: [
    {
      question: "How does the domain name availability checker work?",
      answer: "Our tool performs live DNS A and NS record lookups using Cloudflare's DNS resolver (1.1.1.1) across multiple TLDs simultaneously. If no DNS records are found, the domain is likely available for registration."
    },
    {
      question: "Which domain extensions (.TLDs) do you check?",
      answer: "We check .com, .io, .dev, .org, .net, .co, and .ai simultaneously. These are the most popular TLDs for startups, SaaS companies, developer tools, and personal brands."
    },
    {
      question: "Where can I register a domain if it's available?",
      answer: "When a domain shows as AVAILABLE, we provide a direct link to Namecheap's registration page where you can purchase and secure the domain instantly."
    },
    {
      question: "Why should I check multiple domain extensions at once?",
      answer: "Securing your brand name across .com, .io, and .dev prevents cybersquatting, ensures brand consistency, and allows you to redirect all extensions to your primary domain for maximum SEO authority."
    },
    {
      question: "What does it mean if a domain shows TAKEN but the website is empty?",
      answer: "The domain is registered but may be parked or unused. DNS records exist even for parked/forwarded domains. You can contact the registrant via WHOIS lookup to inquire about purchasing it."
    }
  ]
};

/* ─── Accordion Component ─────────────────────────────────────────────── */
function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`glass-panel overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-indigo-500/30 shadow-lg shadow-indigo-500/8' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFaq(idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm md:text-base group"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                    isOpen
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/40'
                      : 'bg-indigo-500/15 text-indigo-400'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={`transition-colors duration-200 ${isOpen ? 'text-indigo-300' : 'group-hover:text-indigo-300'}`}>
                  {faq.question}
                </span>
              </span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isOpen ? 'rotate-180 text-indigo-400' : 'group-hover:text-slate-200'
                }`}
              />
            </button>

            <div className={`faq-body ${isOpen ? 'faq-open' : ''}`}>
              <div>
                <p className="px-5 pb-5 pt-3 text-slate-300 text-sm leading-relaxed border-t border-white/5">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── SEO Content Block (shared) ─────────────────────────────────────── */
function SeoContent({ platformName }) {
  if (platformName) {
    return (
      <GlassCard hoverGlow={false} className="p-8 max-w-4xl mx-auto space-y-4 bg-slate-900/60">
        <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Why Your {platformName} Handle Consistency Matters for Brand SEO
        </h3>
        <p className="text-slate-300 text-xs leading-relaxed">
          Securing a consistent <strong>@handle</strong> on {platformName} — matching your domain name and other social profiles — is a critical brand SEO signal. Search engines like Google use social entity cross-referencing via the Knowledge Graph to validate brand authenticity. When your {platformName} username, website URL, and other platform handles all match, your brand earns higher trust scores, stronger branded search rankings, and improved local business discovery.
        </p>
        <p className="text-slate-400 text-xs leading-relaxed">
          The <strong>ShopApp Labs Username Search Engine</strong> makes it easy to check availability across all major platforms simultaneously — so you can secure your brand name everywhere before someone else does.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard hoverGlow={false} className="p-8 max-w-4xl mx-auto space-y-4 bg-slate-900/60">
      <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        Why Handle Consistency &amp; Domain Matching Matters for SEO
      </h3>
      <p className="text-slate-300 text-xs leading-relaxed">
        When launching a business, startup, or personal brand, matching your social media usernames with your primary domain name (e.g. <strong>yourbrand.com</strong>) creates a unified digital footprint. Search engines like Google, Bing, and DuckDuckGo cross-verify social entities using Knowledge Graph algorithms. Having matching handles on Instagram, YouTube, X, and GitHub improves search rank indexing, organic traffic, and customer trust.
      </p>
      <p className="text-slate-400 text-xs leading-relaxed">
        The <strong>ShopApp Labs Username Search Engine</strong> provides instant real-time checks across major social networks, developer portals, and top-level domain extensions (.com, .io, .dev, .org, .net, .co) so you can reserve your brand name everywhere before someone else takes it.
      </p>
    </GlassCard>
  );
}

/* ─── Main Export: Generic FAQ (Home + CheckerPage) ──────────────────── */
export default function SeoFaq({ platformKey, platformName }) {
  const faqs = platformKey && PLATFORM_FAQS[platformKey]
    ? PLATFORM_FAQS[platformKey]
    : GENERIC_FAQS;

  return (
    <section className="space-y-8 pt-8 border-t border-white/10">

      {/* FAQ Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          Frequently Asked Questions
        </div>
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-white">
          {platformKey ? (
            <>{platformName} <span className="text-gradient">Username FAQ</span></>
          ) : (
            <>Everything You Need to Know About <span className="text-gradient">Username Checking</span></>
          )}
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          {platformKey
            ? `Common questions about checking ${platformName} handle availability, naming rules, and brand protection.`
            : 'Learn how to protect your digital identity, secure social handles, and build brand presence.'}
        </p>
      </div>

      {/* Accordion */}
      <FaqAccordion faqs={faqs} />

      {/* SEO Content Block */}
      <SeoContent platformName={platformName} />

    </section>
  );
}
