import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, ExternalLink, Search, CheckCircle2, Shield } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { PLATFORMS_CONFIG, CATEGORIES } from '../config/platforms';

export default function PlatformDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          Supported Networks & Platforms
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
          Dedicated <span className="text-gradient">Username & Domain</span> Checkers
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Select any platform below to access dedicated availability lookup tools, handle guidelines, and instant registration links.
        </p>
      </div>

      {/* Featured Platform Hub Cards (Instagram, TikTok, YouTube, X, GitHub, Domains) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Instagram */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between border-pink-500/20 hover:border-pink-500/40">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-[10px] font-bold uppercase tracking-wider">
              Social Media
            </span>
            <h2 className="text-xl font-bold text-white font-heading">Instagram Username Checker</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Verify Instagram handle availability, check existing account owner names, follower counts, and reserve your @handle.
            </p>
          </div>
          <Link
            to="/instagram-username-checker"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold hover:opacity-90 transition-all"
          >
            <span>Check Instagram Handle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        {/* TikTok */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between border-cyan-500/20 hover:border-cyan-500/40">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
              Short Video
            </span>
            <h2 className="text-xl font-bold text-white font-heading">TikTok Username Checker</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Check if a TikTok @unique_id username is taken or available. Inspect public profiles and follower stats in real time.
            </p>
          </div>
          <Link
            to="/tiktok-username-checker"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold hover:opacity-90 transition-all"
          >
            <span>Check TikTok Handle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        {/* YouTube */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between border-rose-500/20 hover:border-rose-500/40">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
              Video & Streaming
            </span>
            <h2 className="text-xl font-bold text-white font-heading">YouTube Handle Checker</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Search YouTube @handle availability for your channel before launching content or registering a brand.
            </p>
          </div>
          <Link
            to="/youtube-username-checker"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-bold hover:opacity-90 transition-all"
          >
            <span>Check YouTube Handle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        {/* X / Twitter */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between border-slate-500/20 hover:border-slate-500/40">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
              News & Community
            </span>
            <h2 className="text-xl font-bold text-white font-heading">X (Twitter) Username Checker</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Instantly check X (Twitter) username availability and secure your brand handle across community networks.
            </p>
          </div>
          <Link
            to="/twitter-username-checker"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
          >
            <span>Check X Handle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        {/* GitHub */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between border-purple-500/20 hover:border-purple-500/40">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
              Developer Hub
            </span>
            <h2 className="text-xl font-bold text-white font-heading">GitHub Username Checker</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Check GitHub account and organization username availability for developers and open-source software teams.
            </p>
          </div>
          <Link
            to="/github-username-checker"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:opacity-90 transition-all"
          >
            <span>Check GitHub Handle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        {/* Domains */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between border-emerald-500/20 hover:border-emerald-500/40">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              Domain TLDs
            </span>
            <h2 className="text-xl font-bold text-white font-heading">Domain Name Availability Checker</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Instant DNS A & NS lookup for .com, .io, .dev, .org, .net, .co domain names with Namecheap registration links.
            </p>
          </div>
          <Link
            to="/domain-availability-checker"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:opacity-90 transition-all"
          >
            <span>Check Domain Availability</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

      </div>

      {/* Full 100+ Platform Master List Grid */}
      <div className="space-y-6 pt-8 border-t border-white/10">
        <h2 className="text-2xl font-bold text-white font-heading text-center">
          All 100+ Supported Platforms & Domain TLDs
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {PLATFORMS_CONFIG.map((plat) => (
            <Link
              key={plat.id}
              to={`/checker?u=shopapp&cat=${plat.category}`}
              className="p-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/30 text-slate-300 hover:text-white transition-all flex items-center justify-between text-xs"
            >
              <span className="font-semibold truncate">{plat.name}</span>
              <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400" />
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
