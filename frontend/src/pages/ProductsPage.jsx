import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { PRODUCTS_CATALOG } from '../config/products';

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5" />
          ShopApp Labs Store
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
          Digital Products & <span className="text-gradient-purple">SaaS Solutions</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Unlock premium tools, automation scripts, theme templates, and API access designed to grow your digital business.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCTS_CATALOG.map((prod) => (
          <GlassCard key={prod.id} className="flex flex-col justify-between p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{prod.category}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {prod.badge}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white font-heading">{prod.name}</h2>
              <p className="text-indigo-200/80 font-medium text-xs">{prod.tagline}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{prod.description}</p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white">{prod.price}</span>
                <span className="text-xs text-slate-500">Lifetime updates</span>
              </div>

              <Link
                to={prod.link}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Guarantee Banner */}
      <GlassCard hoverGlow={false} className="p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-indigo-900/30 via-slate-900 to-purple-900/30">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <Shield className="w-5 h-5 text-emerald-400" /> Need Custom Software or API Integrations?
          </h3>
          <p className="text-slate-400 text-xs max-w-xl">
            Our team builds custom web scrapers, REST APIs, WordPress plugins, and high-performance React frontends tailored for your business.
          </p>
        </div>
        <Link
          to="/checker"
          className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all whitespace-nowrap"
        >
          Launch Checker Tool
        </Link>
      </GlassCard>

    </div>
  );
}
