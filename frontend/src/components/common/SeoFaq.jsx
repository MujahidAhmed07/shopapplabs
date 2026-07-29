import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import GlassCard from './GlassCard';

export const FAQS_DATA = [
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

export default function SeoFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-8 pt-8 border-t border-white/10">
      
      {/* FAQ Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          Frequently Asked Questions
        </div>
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-white">
          Everything You Need to Know About <span className="text-gradient">Username Checking</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Learn how to protect your digital identity, secure social handles, and build brand presence.
        </p>
      </div>

      {/* Accordion FAQ Grid */}
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="glass-panel overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-base hover:text-indigo-400 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-mono">
                    0{idx + 1}
                  </span>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rich Keyword SEO Content Article Box for Google Indexing */}
      <GlassCard hoverGlow={false} className="p-8 max-w-4xl mx-auto space-y-4 bg-slate-900/60">
        <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Why Handle Consistency & Domain Matching Matters for SEO
        </h3>
        <p className="text-slate-300 text-xs leading-relaxed">
          When launching a business, startup, or personal brand, matching your social media usernames with your primary domain name (e.g. <strong>yourbrand.com</strong>) creates a unified digital footprint. Search engines like Google, Bing, and DuckDuckGo cross-verify social entities using Knowledge Graph algorithms. Having matching handles on Instagram, YouTube, X, and GitHub improves search rank indexing, organic traffic, and customer trust.
        </p>
        <p className="text-slate-400 text-xs leading-relaxed">
          The <strong>ShopApp Labs Username Search Engine</strong> provides instant real-time checks across major social networks, developer portals, and top-level domain extensions (.com, .io, .dev, .org, .net, .co) so you can reserve your brand name everywhere before someone else takes it.
        </p>
      </GlassCard>

    </section>
  );
}
