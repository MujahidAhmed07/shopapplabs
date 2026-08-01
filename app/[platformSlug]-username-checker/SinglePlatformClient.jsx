'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Loader2, RefreshCw, ExternalLink, Check, Copy, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import ResultBadge from '@/components/common/ResultBadge';
import SeoFaq from '@/components/common/SeoFaq';
import { checkSinglePlatform } from '@/lib/services/apiClient';

export default function SinglePlatformClient({ platformKey, platformId, platformMeta, details, platformSlug }) {
  const [username, setUsername] = useState('shopapp');
  const [result, setResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const query = username.trim().toLowerCase().replace(/^@/, '');
    if (!query) return;

    setIsSearching(true);
    setResult({ status: 'LOADING' });

    const res = await checkSinglePlatform(platformId, query);
    setResult(res);
    setIsSearching(false);
  };

  useEffect(() => {
    handleSearch();
  }, [platformId]);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-2 md:px-6 space-y-12">
      
      {/* Back to hub */}
      <div>
        <Link
          href="/platforms"
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Supported Platforms
        </Link>
      </div>

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Dedicated {platformMeta.name} Checker Engine
        </div>

        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
          {details.title}
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {details.subtitle}
        </p>
      </div>

      {/* Search Input Box */}
      <GlassCard hoverGlow={false} className="p-6 shadow-2xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Enter ${platformMeta.name} handle (e.g. shopapp)`}
              className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 text-base transition-all disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                Check {platformMeta.name}
              </>
            )}
          </button>
        </form>

        {/* Live Result Display */}
        {result && (
          <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div>
                <span className="text-xs text-slate-400 font-mono block">Query Target</span>
                <span className="text-lg font-bold text-white font-mono">@{username.replace(/^@/, '')}</span>
              </div>
              <ResultBadge status={result.status} message={result.message} />
            </div>

            {result.full_name && (
              <div className="text-xs bg-indigo-500/10 border border-indigo-500/20 p-3.5 rounded-xl text-slate-200">
                <span className="text-indigo-400 font-bold block mb-1">Account Owner Info</span>
                {result.full_name} {result.followers ? `• ${result.followers.toLocaleString()} Followers` : ''}
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-2">
              <a
                href={result.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                Visit {platformMeta.name} Link <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => handleCopy(result.url || '#')}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                {copied ? (
                  <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied!</span>
                ) : (
                  <span className="flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy Target URL</span>
                )}
              </button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Handle Guidelines Card */}
      <GlassCard hoverGlow={false} className="p-8 space-y-4">
        <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          {platformMeta.name} Username Naming Rules &amp; Guidelines
        </h2>
        <ul className="space-y-2 text-xs text-slate-300">
          {details.guidelines.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      {/* SEO FAQ */}
      <SeoFaq platformKey={platformKey} platformName={platformMeta.name} />

    </div>
  );
}
