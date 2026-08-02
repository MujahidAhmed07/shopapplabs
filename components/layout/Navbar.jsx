'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Search, ShoppingBag, Layers, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home', icon: null },
    { href: '/checker', label: 'Username Checker', icon: Search },
    { href: '/platforms', label: 'Supported Platforms', icon: Layers },
    { href: '/products', label: 'Products', icon: ShoppingBag },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group z-50">
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

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                  isActive(link.href)
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/checker"
            className="hidden sm:flex px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            Launch Tool
          </Link>

          {/* Hamburger Button for Mobile & Tablet */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/15 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-slate-950/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl transition-all animate-fadeIn z-40">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center gap-3 transition-all ${
                    isActive(link.href)
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5 text-indigo-400" />}
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10 mt-2">
              <Link
                href="/checker"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl text-center text-base font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-white" />
                Launch Tool
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
