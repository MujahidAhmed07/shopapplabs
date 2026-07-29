import React from 'react';
import { Link } from 'react-router-dom';
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

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Products & Tools</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link to="/checker" className="hover:text-indigo-400 transition-colors">Username Checker Pro</Link></li>
            <li><Link to="/products" className="hover:text-indigo-400 transition-colors">SEO Audit Engine</Link></li>
            <li><Link to="/products" className="hover:text-indigo-400 transition-colors">UI Kits & Templates</Link></li>
            <li><Link to="/products" className="hover:text-indigo-400 transition-colors">Developer APIs</Link></li>
          </ul>
        </div>

        {/* Legal & Info */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">ShopApp Labs</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-1">Platform Home <Globe className="w-3.5 h-3.5" /></Link></li>
            <li><span className="text-slate-500">Version 2.0 (React + Flask)</span></li>
            <li><span className="text-slate-500">cPanel Optimized WSGI</span></li>
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
