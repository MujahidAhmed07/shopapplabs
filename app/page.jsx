import React from 'react';
import Link from 'next/link';
import { Search, Zap, Shield, Sparkles, ArrowRight, CheckCircle2, Globe, Layers, Cpu } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import SeoFaq from '@/components/common/SeoFaq';

export const metadata = {
  title: 'ShopApp Labs | Free Real-Time Social Media Username & Domain Checker',
  description: 'Instantly check username availability across 100+ social networks, developer hubs, and domain TLDs in real-time.'
};

export default function HomePage() {
  return (
    <div className="space-y-24 py-12 px-2 md:px-6 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          ShopApp Labs Digital Engine v2.0
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
          One Platform. <span className="text-gradient">Unlimited Possibilities</span> for Digital Creators.
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Verify handle availability across 100+ networks, audit your websites, and access high-speed digital tools built by ShopApp Labs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/checker"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
          >
            <Search className="w-5 h-5" />
            Launch Username Checker
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-base"
          >
            Explore Product Suite
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-indigo-400 font-bold text-2xl mb-1">100+</div>
            <div className="text-xs text-slate-400">Social Networks & TLDs</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-purple-400 font-bold text-2xl mb-1">&lt; 1 sec</div>
            <div className="text-xs text-slate-400">Real-time Check Speed</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-cyan-400 font-bold text-2xl mb-1">100%</div>
            <div className="text-xs text-slate-400">Free & Instant Results</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-emerald-400 font-bold text-2xl mb-1">REST API</div>
            <div className="text-xs text-slate-400">Modular Next.js Engine</div>
          </div>
        </div>
      </section>

      {/* Featured Tool Spotlight */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Flagship Tool Spotlight</h2>
            <p className="text-slate-400 text-sm mt-1">Instant handle lookup across social networks, developer hubs, and domain extensions.</p>
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
                Username & Domain Availability Engine
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Searching for your next brand handle or startup name? Check Instagram, X, TikTok, YouTube, GitHub, Twitch, and TLD domain extensions (.com, .io, .dev) simultaneously.
              </p>
              
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Parallel async verification streams
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct profile links for available handles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant namecheap domain registration links
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/checker"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
                >
                  Start Verification Search
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-3">
                <span className="flex items-center gap-2 font-mono"><Layers className="w-4 h-4 text-indigo-400" /> LIVE MONITOR</span>
                <span className="text-emerald-400 font-mono">100+ Endpoints Ready</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-slate-300">instagram.com/yourname</span>
                  <span className="text-emerald-400 font-bold">AVAILABLE</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-slate-300">github.com/yourname</span>
                  <span className="text-emerald-400 font-bold">AVAILABLE</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-slate-300">yourname.com</span>
                  <span className="text-emerald-400 font-bold">AVAILABLE</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* SEO FAQ Section */}
      <SeoFaq />

    </div>
  );
}
