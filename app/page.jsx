import React from 'react';
import Link from 'next/link';
import { Search, Zap, Shield, Sparkles, ArrowRight, CheckCircle2, Globe, Layers, Check, HelpCircle, ShieldCheck, Terminal, Cpu, Info } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import SeoFaq from '@/components/common/SeoFaq';

export const metadata = {
  title: 'Username Checker — Free Social Media & Domain Availability Search',
  description: 'Instantly check username availability across 100+ social media networks, tech hubs, and domain TLDs. Fast, free real-time handle search for Instagram, TikTok, YouTube, X, GitHub, Discord.',
  alternates: {
    canonical: 'https://shopapplabs.com'
  }
};

const PLATFORM_RULES_TABLE = [
  { platform: 'Instagram', length: '1 – 30 chars', allowed: 'Letters, numbers, periods (.), underscores (_)', disallowed: 'Consecutive periods, start/end period, spaces' },
  { platform: 'TikTok', length: '2 – 24 chars', allowed: 'Letters, numbers, underscores, periods', disallowed: 'Special symbols, spaces, hyphens' },
  { platform: 'X (Twitter)', length: '4 – 15 chars', allowed: 'Letters, numbers, underscores', disallowed: 'Dots, dashes, words like "Twitter" or "Admin"' },
  { platform: 'YouTube', length: '3 – 30 chars', allowed: 'Alphanumeric, underscores, hyphens, periods', disallowed: 'Violations of community guidelines' },
  { platform: 'GitHub', length: '1 – 39 chars', allowed: 'Alphanumeric, single hyphens', disallowed: 'Consecutive hyphens, start/end with hyphen' },
  { platform: 'Discord', length: '2 – 32 chars', allowed: 'Lowercase letters, numbers, underscores, dots', disallowed: 'Uppercase letters, consecutive dots' },
  { platform: 'Twitch', length: '4 – 25 chars', allowed: 'Alphanumeric, underscores', disallowed: 'Special characters, leading underscores' },
  { platform: 'Reddit', length: '3 – 20 chars', allowed: 'Letters, numbers, dashes, underscores', disallowed: 'Spaces, symbols' },
  { platform: 'Domain TLDs (.com, .io, .dev)', length: '1 – 63 chars', allowed: 'Letters, numbers, hyphens (-)', disallowed: 'Underscores (_), spaces, symbols, start/end hyphen' }
];

export default function HomePage() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check Username Availability Across 100+ Platforms in Real Time',
    description: 'A step-by-step guide to verifying and claiming your brand handle across major social media networks and domain extensions.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Step 1: Enter Your Desired Handle',
        text: 'Type your preferred brand name or creator handle into the search input box without any @ symbols or special characters.',
        url: 'https://shopapplabs.com/checker'
      },
      {
        '@type': 'HowToStep',
        name: 'Step 2: Run Real-Time Verification',
        text: 'Click the Search button. Our engine queries official API endpoints, public resolvers, and DNS-over-HTTPS servers concurrently.',
        url: 'https://shopapplabs.com/checker'
      },
      {
        '@type': 'HowToStep',
        name: 'Step 3: Review Results and Claim Available Handles',
        text: 'Review available status badges and click direct profile or registration links to secure your username before someone else does.',
        url: 'https://shopapplabs.com/checker'
      }
    ]
  };

  return (
    <div className="space-y-24 py-8 px-2 md:px-6 max-w-7xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      {/* Hero Section */}
      <section className="text-center space-y-8 py-8 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          Real-Time Multi-Platform Search Engine v2.0
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
          Free Social Media <span className="text-gradient">Username Checker</span> & Domain Availability Search
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
          Instantly verify handle availability across 100+ social media networks, tech hubs, gaming portals, and top-level domain extensions (.com, .io, .dev) in under 1 second.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/checker"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
          >
            <Search className="w-5 h-5" />
            Launch Live Username Checker
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="/platforms"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-base"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            Explore Supported Platforms
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-left">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all">
            <div className="text-indigo-400 font-bold text-2xl mb-1 font-heading">100+</div>
            <div className="text-xs text-slate-400 font-medium">Social Networks & TLDs</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all">
            <div className="text-purple-400 font-bold text-2xl mb-1 font-heading">&lt; 800ms</div>
            <div className="text-xs text-slate-400 font-medium">Parallel Check Speed</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="text-cyan-400 font-bold text-2xl mb-1 font-heading">100% Free</div>
            <div className="text-xs text-slate-400 font-medium">Unlimited Instant Lookups</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
            <div className="text-emerald-400 font-bold text-2xl mb-1 font-heading">AI Variations</div>
            <div className="text-xs text-slate-400 font-medium">Verified Alternative Handles</div>
          </div>
        </div>
      </section>

      {/* Featured Tool Spotlight */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Live Availability Verification Engine</h2>
            <p className="text-slate-400 text-sm mt-1">Check username handles across all major categories with asynchronous status reporting.</p>
          </div>
          <Link href="/checker" className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center gap-1">
            Open Full Checker App <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <GlassCard className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase">
                Active & Live
              </span>
              <h3 className="text-3xl font-heading font-bold text-white">
                Multi-Platform Brand Name & Domain Search
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Building a new brand, startup, or personal channel? Ensure consistent identity before investing time and marketing. Check Instagram, TikTok, X (Twitter), YouTube, GitHub, Twitch, and TLD domain extensions (.com, .io, .dev) in one click.
              </p>
              
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Asynchronous Parallel Checking:</strong> All network queries execute simultaneously.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Live Cloudflare DNS-over-HTTPS:</strong> Instant .com, .io, .dev, and .ai domain resolution.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Verified Smart Suggestions:</strong> Automatic alternatives checked for real-time availability.</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/checker"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25"
                >
                  <Search className="w-4 h-4" />
                  Start Handle Verification Search
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-3">
                <span className="flex items-center gap-2 font-mono"><Layers className="w-4 h-4 text-indigo-400" /> LIVE ENDPOINTS</span>
                <span className="text-emerald-400 font-mono">100+ Networks Monitored</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="text-slate-300">instagram.com/yourhandle</span>
                  <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">AVAILABLE</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="text-slate-300">tiktok.com/@yourhandle</span>
                  <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">AVAILABLE</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="text-slate-300">github.com/yourhandle</span>
                  <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">AVAILABLE</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="text-slate-300">yourhandle.com</span>
                  <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">AVAILABLE</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* How to Check Guide Section */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white">
            How to Check & Secure Your <span className="text-gradient">Username in 3 Steps</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Follow this simple process to claim your brand name across every online network before anyone else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold font-mono text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Enter Handle or Brand Name</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Type your desired username without special prefix characters (like @). Our tool automatically cleans the input string and formats it for multi-network querying.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold font-mono text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Run Live Parallel Checks</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Our high-speed backend queries live endpoints across social media, developer portals, and domain registries simultaneously, delivering real-time status badges in seconds.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold font-mono text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Claim & Register Handles</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Click the direct registration link on available results to secure your profile and register your matching domain name before trademark or handle squatters claim it.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Platform Character Rules & Limits Matrix Table */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Social Media Username Rules & Character Limits</h2>
            <p className="text-slate-400 text-sm mt-1">Official platform requirements for handles, allowed characters, and restrictions.</p>
          </div>
          <Link href="/platforms" className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs flex items-center gap-1">
            View All 100+ Platform Guidelines <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 uppercase text-[11px] font-bold text-slate-400 tracking-wider border-b border-white/10">
              <tr>
                <th className="py-4 px-6">Platform</th>
                <th className="py-4 px-6">Character Length</th>
                <th className="py-4 px-6">Allowed Characters</th>
                <th className="py-4 px-6">Restrictions</th>
                <th className="py-4 px-6 text-right">Dedicated Tool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PLATFORM_RULES_TABLE.map((row) => (
                <tr key={row.platform} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{row.platform}</td>
                  <td className="py-4 px-6 font-mono text-indigo-300">{row.length}</td>
                  <td className="py-4 px-6">{row.allowed}</td>
                  <td className="py-4 px-6 text-slate-400">{row.disallowed}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/${row.platform.toLowerCase().replace(/[^a-z0-9]/g, '')}-username-checker`}
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      Check <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Why Handle Consistency Matters for SEO & Knowledge Graph */}
      <section className="space-y-8">
        <GlassCard className="p-8 md:p-10 space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
            Why Consistent Social Media Usernames Boost Google SEO & Knowledge Graph
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300 text-xs leading-relaxed">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Brand Entity Recognition
              </h3>
              <p>
                When your exact handle is claimed on Instagram, X, TikTok, YouTube, and your domain name (.com), Google connects them into a unified entity for Knowledge Panel cards.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> Dominate First-Page SERPs
              </h3>
              <p>
                Having matching accounts across multiple high-authority domains allows your brand to own all top 10 search results on Google when users search your company name.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> Prevent Brand Impersonation
              </h3>
              <p>
                Securing your handle proactively prevents copycats, scammers, and cybersquatters from claiming your brand identity and confusing your customers.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* SEO FAQ Section */}
      <SeoFaq />

    </div>
  );
}

