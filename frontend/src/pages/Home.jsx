import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, Shield, Sparkles, ArrowRight, CheckCircle2, Globe, Layers, Cpu } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { PRODUCTS_CATALOG } from '../config/products';

export default function Home() {
  return (
    <div className="space-y-24 py-12 px-6 max-w-7xl mx-auto">
      
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
            to="/checker"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
          >
            <Search className="w-5 h-5" />
            Launch Username Checker
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            to="/products"
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
            <div className="text-xs text-slate-400">Modular Flask Backend</div>
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
          <Link to="/checker" className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center gap-1">
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

              <Link
                to="/checker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
              >
                Try Username Checker <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Visual Box */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs text-slate-400 font-mono">search: @shopapp</span>
                <span className="text-xs text-emerald-400 font-semibold">12 Available • 4 Taken</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="font-semibold text-white">Instagram (@shopapp)</span>
                  <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">TAKEN</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="font-semibold text-white">GitHub (shopapp)</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">AVAILABLE</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="font-semibold text-white">shopapp.dev</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">AVAILABLE</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Product Ecosystem Showcase */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-heading font-bold text-white">ShopApp Labs Product Suite</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">Explore upcoming SaaS apps, themes, and APIs ready for deployment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS_CATALOG.map((prod) => (
            <GlassCard key={prod.id} className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{prod.category}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-medium">{prod.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{prod.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{prod.description}</p>
              </div>
              
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{prod.price}</span>
                <Link to={prod.link} className="text-xs text-indigo-400 font-semibold hover:text-indigo-300 flex items-center gap-1">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

    </div>
  );
}
