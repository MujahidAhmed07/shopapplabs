'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Search, ShoppingBag, Layers } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="glass-nav sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              ShopApp <span className="text-gradient">Labs</span>
            </span>
            <span className="block text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
              Digital Platform Suite
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          <Link
            href="/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive('/') 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </Link>
          <Link
            href="/checker"
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/checker') 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="w-4 h-4" />
            Username Checker
          </Link>
          <Link
            href="/platforms"
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/platforms') 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            Supported Platforms
          </Link>
          <Link
            href="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/products') 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Products
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/checker"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            Launch Tool
          </Link>
        </div>

      </div>
    </header>
  );
}
