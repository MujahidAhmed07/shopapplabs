import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Loader2, RefreshCw, ExternalLink, Check, Copy, ArrowLeft, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import ResultBadge from '../components/common/ResultBadge';
import SeoFaq from '../components/common/SeoFaq';
import { checkSinglePlatform } from '../services/apiClient';
import { PLATFORMS_CONFIG } from '../config/platforms';

const DEDICATED_PLATFORM_DETAILS = {
  instagram: {
    title: "Instagram Username & Handle Availability Checker",
    subtitle: "Check if an Instagram handle is taken, inspect owner profile data, and verify handle rules.",
    guidelines: [
      "Must be between 1 and 30 characters long",
      "Only letters, numbers, periods (.), and underscores (_) allowed",
      "Cannot contain consecutive periods or start/end with a period",
      "No spaces or special characters permitted"
    ]
  },
  tiktok: {
    title: "TikTok Username & @unique_id Availability Checker",
    subtitle: "Verify TikTok username availability in real-time before starting your creator channel.",
    guidelines: [
      "Must be between 2 and 24 characters long",
      "Only letters, numbers, underscores, and periods allowed",
      "Changing username is allowed once every 30 days on TikTok"
    ]
  },
  youtube: {
    title: "YouTube Handle (@name) Availability Search Tool",
    subtitle: "Reserve your official YouTube channel handle before someone else claims your brand.",
    guidelines: [
      "Must be between 3 and 30 characters long",
      "Must follow YouTube Community Guidelines",
      "Only alphanumeric characters, underscores, hyphens, and dots allowed"
    ]
  },
  twitter: {
    title: "X (Twitter) Handle Availability Checker",
    subtitle: "Search X (Twitter) handles live to ensure consistent brand identity across social media.",
    guidelines: [
      "Must be 15 characters or fewer",
      "Only letters, numbers, and underscores allowed (no dots or dashes)",
      "Cannot contain 'Twitter' or 'Admin' in the handle"
    ]
  },
  github: {
    title: "GitHub Username & Organization Name Checker",
    subtitle: "Verify software developer account and organization username availability on GitHub.",
    guidelines: [
      "Must be 39 characters or fewer",
      "Cannot contain consecutive hyphens or start/end with a hyphen",
      "Only alphanumeric characters and single hyphens allowed"
    ]
  },
  domain: {
    title: "Domain Name (.COM, .IO, .DEV) DNS Availability Search",
    subtitle: "Perform live DNS lookup across top-level domain extensions with 1-click registration.",
    guidelines: [
      "Supports .com, .io, .dev, .org, .net, .co, .ai domain extensions",
      "Instant Cloudflare DNS A and NS record resolution",
      "Direct registration link to Namecheap when domain is available"
    ]
  }
};

export default function SinglePlatformCheckerPage() {
  const { platformSlug } = useParams();

  // Normalize platform key
  const key = platformSlug ? platformSlug.replace(/-username-checker|-availability-checker/g, '') : 'instagram';
  const platformId = key === 'domain' ? 'domain_com' : key;
  const platformMeta = PLATFORMS_CONFIG.find((p) => p.id === platformId) || {
    id: 'instagram',
    name: 'Instagram',
    category: 'social'
  };

  const details = DEDICATED_PLATFORM_DETAILS[key] || {
    title: `${platformMeta.name} Username Availability Checker`,
    subtitle: `Real-time availability verification tool for ${platformMeta.name}.`,
    guidelines: [
      `Check availability for ${platformMeta.name} handles`,
      "Instant profile link resolution",
      "Free and unlimited checks"
    ]
  };

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
  }, [platformSlug]);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-10">
      
      {/* Back button */}
      <Link to="/platforms" className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to All Supported Platforms
      </Link>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Dedicated Checker Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
          {details.title}
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {details.subtitle}
        </p>
      </div>

      {/* Checker Input Box */}
      <GlassCard hoverGlow={false} className="p-6 space-y-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Enter ${platformMeta.name} handle...`}
              className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-base"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
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
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-mono block">@{username}</span>
                <span className="text-lg font-bold text-white">{platformMeta.name} Status</span>
              </div>
              <ResultBadge status={result.status} message={result.message} />
            </div>

            {result.full_name && (
              <div className="p-3 bg-white/5 rounded-xl text-xs text-slate-300">
                <strong className="text-indigo-400 block mb-1">Registered Name / Title:</strong>
                {result.full_name}
              </div>
            )}

            {result.url && (
              <div className="flex items-center justify-between pt-2 text-xs">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                >
                  Visit Direct Profile / Registration Link <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(result.url)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <span className="text-emerald-400">Copied!</span> : "Copy URL"}
                </button>
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Handle Naming Guidelines Section */}
      <GlassCard hoverGlow={false} className="p-8 space-y-4 bg-slate-900/60">
        <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          {platformMeta.name} Username Naming Rules & Guidelines
        </h3>
        <ul className="space-y-2.5 text-xs text-slate-300">
          {details.guidelines.map((rule, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {rule}
            </li>
          ))}
        </ul>
      </GlassCard>

      {/* SEO FAQ — Platform Specific, unique per page */}
      <SeoFaq platformKey={key} platformName={platformMeta.name} />

    </div>
  );
}
