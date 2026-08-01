import React from 'react';
import Link from 'next/link';
import { Zap, Heart, Shield, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl mt-24 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Col */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-extrabold text-xl text-white">
              ShopApp <span className="text-gradient">Labs</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
            Building next-generation digital tools, high-speed web apps, ecommerce integrations, and SaaS products for creators & developers.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>SSL Secured • Privacy Guaranteed • Real-time API</span>
          </div>
        </div>

        {/* Dedicated Platform Checkers (SEO Indexing Links) */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Platform Checkers</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/instagram-username-checker" className="hover:text-indigo-400 transition-colors">Instagram Handle Checker</Link></li>
            <li><Link href="/tiktok-username-checker" className="hover:text-indigo-400 transition-colors">TikTok Username Checker</Link></li>
            <li><Link href="/youtube-username-checker" className="hover:text-indigo-400 transition-colors">YouTube Handle Search</Link></li>
            <li><Link href="/twitter-username-checker" className="hover:text-indigo-400 transition-colors">X (Twitter) Handle Check</Link></li>
            <li><Link href="/github-username-checker" className="hover:text-indigo-400 transition-colors">GitHub Account Checker</Link></li>
            <li><Link href="/domain-availability-checker" className="hover:text-indigo-400 transition-colors">Domain Name (.COM) Lookup</Link></li>
            <li><Link href="/platforms" className="hover:text-indigo-400 transition-colors text-indigo-400 font-semibold">View All 100+ Platforms →</Link></li>
          </ul>
        </div>

        {/* Quick Links & Products */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Products & Tools</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/checker" className="hover:text-indigo-400 transition-colors">Username Checker Pro</Link></li>
            <li><Link href="/products" className="hover:text-indigo-400 transition-colors">SEO Audit Engine</Link></li>
            <li><Link href="/products" className="hover:text-indigo-400 transition-colors">UI Kits & Templates</Link></li>
            <li><Link href="/" className="hover:text-indigo-400 transition-colors flex items-center gap-1">Platform Home <Globe className="w-3.5 h-3.5" /></Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} ShopApp Labs. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creators worldwide
        </p>
      </div>
    </footer>
  );
}
