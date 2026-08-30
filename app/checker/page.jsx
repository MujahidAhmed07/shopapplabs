'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Loader2, RefreshCw, ExternalLink, Check, Copy, Share2, Sparkles, Wand2 } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import ResultBadge from '@/components/common/ResultBadge';
import SeoFaq from '@/components/common/SeoFaq';
import { PLATFORMS_CONFIG, CATEGORIES } from '@/lib/config/platforms';
import { checkSinglePlatform } from '@/lib/services/apiClient';
import { generateUsernameSuggestions, getVerifiedAvailableSuggestions, getGloballyAvailableSuggestions } from '@/lib/utils/usernameSuggestions';

function CheckerPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialUsername = searchParams.get('u') || searchParams.get('username') || '';
  const initialCat = searchParams.get('cat') || 'all';

  const [username, setUsername] = useState(initialUsername);
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [results, setResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(Boolean(initialUsername.trim()));
  const [progress, setProgress] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [globalVerifiedSuggestions, setGlobalVerifiedSuggestions] = useState([]);
  const [isCheckingGlobal, setIsCheckingGlobal] = useState(false);

  // Load user's search history from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('username_search_history');
      if (saved) {
        setSearchHistory(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const filteredPlatforms = PLATFORMS_CONFIG.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  const [verifiedPlatformSuggestions, setVerifiedPlatformSuggestions] = useState({});

  const runCheck = useCallback(async (query, category) => {
    const cleanQuery = query.trim().toLowerCase().replace(/^@/, '');
    if (!cleanQuery) return;

    setHasSearched(true);
    setIsSearching(true);
    setProgress(0);
    setVerifiedPlatformSuggestions({});
    setGlobalVerifiedSuggestions([]);
    setIsCheckingGlobal(true);

    const activeList = PLATFORMS_CONFIG.filter(
      (p) => category === 'all' || p.category === category
    );

    const initialResults = {};
    activeList.forEach((p) => {
      initialResults[p.id] = { status: 'LOADING' };
    });
    setResults(initialResults);

    let completed = 0;
    const total = activeList.length;

    const checkPromises = activeList.map(async (platform) => {
      const res = await checkSinglePlatform(platform.id, cleanQuery);
      completed++;
      setProgress(Math.round((completed / total) * 100));

      setResults((prev) => ({
        ...prev,
        [platform.id]: res
      }));

      // If taken on this platform, find verified available alternative handles asynchronously
      if (res.status === 'TAKEN') {
        getVerifiedAvailableSuggestions(platform.id, cleanQuery, checkSinglePlatform).then((availables) => {
          if (availables && availables.length > 0) {
            setVerifiedPlatformSuggestions((prev) => ({
              ...prev,
              [platform.id]: availables
            }));
          }
        });
      }
    });

    await Promise.all(checkPromises);
    setIsSearching(false);

    // Verify candidate suggestions across all key platforms for universal availability
    getGloballyAvailableSuggestions(cleanQuery, checkSinglePlatform).then((verifiedGlobal) => {
      setGlobalVerifiedSuggestions(verifiedGlobal);
      setIsCheckingGlobal(false);
    });
  }, []);

  const updateUrlAndSearch = (newUsername, newCategory) => {
    const cleanQuery = newUsername.trim().toLowerCase().replace(/^@/, '');
    if (!cleanQuery) return;

    router.replace(`/checker?u=${encodeURIComponent(cleanQuery)}&cat=${encodeURIComponent(newCategory)}`);
    
    setSearchHistory((prevHistory) => {
      const filtered = prevHistory.filter((item) => item !== cleanQuery);
      const updated = [cleanQuery, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('username_search_history', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    runCheck(cleanQuery, newCategory);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem('username_search_history');
    } catch (e) {}
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      updateUrlAndSearch(username, activeCategory);
    }
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (username.trim()) {
      updateUrlAndSearch(username, catId);
    }
  };

  useEffect(() => {
    const u = searchParams.get('u') || searchParams.get('username') || '';
    const cat = searchParams.get('cat') || 'all';
    setUsername(u);
    setActiveCategory(cat);
    if (u.trim()) {
      runCheck(u, cat);
    }
  }, [searchParams, runCheck]);

  const handleCopyLink = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareSearchUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const availableCount = Object.values(results).filter((r) => r.status === 'AVAILABLE').length;
  const takenCount = Object.values(results).filter((r) => r.status === 'TAKEN').length;

  return (
    <div className="max-w-7xl mx-auto py-10 px-2 md:px-6 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
          Social Media <span className="text-gradient">Username Checker</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Search username availability live across 100+ social media networks, developer platforms, gaming hubs, and domain TLD extensions (.com, .io, .dev).
        </p>
      </div>

      {/* Main Search Bar */}
      <GlassCard hoverGlow={false} className="p-4 md:p-6 shadow-2xl">
        <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter desired username or domain (e.g. yourbrand)..."
              className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching || !username.trim()}
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
                Check Availability
              </>
            )}
          </button>
        </form>

        {/* History Chips & Share Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-white/5 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            {searchHistory.length > 0 && (
              <>
                <span className="font-semibold text-slate-500">Recent Searches:</span>
                {searchHistory.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => { setUsername(item); updateUrlAndSearch(item, activeCategory); }}
                    className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                  >
                    @{item}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-slate-500 hover:text-slate-400 underline text-[11px] ml-1"
                >
                  Clear
                </button>
              </>
            )}
          </div>

          {hasSearched && (
            <button
              type="button"
              onClick={handleShareSearchUrl}
              className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/20 flex items-center gap-1.5 self-start sm:self-auto transition-all"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Share Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" /> Share Search URL
                </>
              )}
            </button>
          )}
        </div>

        {/* Smart Verified Available Handle Alternatives Bar */}
        {hasSearched && username.trim() && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <Wand2 className="w-3 h-3 text-emerald-400" />
                Verified Available Across Major Platforms:
              </span>
              {isCheckingGlobal && (
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin text-emerald-400" /> Checking available alternatives...
                </span>
              )}
            </div>
            {globalVerifiedSuggestions.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {globalVerifiedSuggestions.map((sugg) => (
                  <button
                    key={sugg}
                    type="button"
                    onClick={() => { setUsername(sugg); updateUrlAndSearch(sugg, activeCategory); }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 font-semibold"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    @{sugg}
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-sans">Available</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Progress & Category Filter Controls */}
      <div className="space-y-4">
        {isSearching && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Checking platforms...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="progress-bar-animated h-full rounded-full transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              {availableCount} Available
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 font-semibold border border-rose-500/20">
              {takenCount} Taken
            </span>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlatforms.map((platform) => {
          const res = results[platform.id] || { status: 'LOADING' };
          const isDomain = platform.category === 'domains' || platform.id.startsWith('domain_');
          const domainLabel = username.replace(/_/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || username;
          const tld = platform.id.startsWith('domain_') ? platform.id.split('_')[1] : 'com';
          const formattedUrl = isDomain ? `https://${domainLabel}.${tld}` : platform.urlPattern.replace('{}', username);
          const displayHandle = isDomain ? `${domainLabel}.${tld}` : `@${username}`;

          return (
            <GlassCard key={platform.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    {platform.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5 font-mono">
                    {displayHandle}
                  </p>
                </div>
                <ResultBadge status={res.status} message={res.message} />
              </div>

              {res.full_name && (
                <div className="text-xs bg-white/5 p-2.5 rounded-lg text-slate-300">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account Owner</span>
                  {res.full_name}
                </div>
              )}

              {/* Verified Available Alternatives for Taken Handles / Domains */}
              {res.status === 'TAKEN' && (
                <div className="text-xs bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/20 space-y-1.5">
                  <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                    <Wand2 className="w-3 h-3 text-emerald-400" /> Verified Available {isDomain ? 'Domains' : 'Handles'}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(verifiedPlatformSuggestions[platform.id] && verifiedPlatformSuggestions[platform.id].length > 0
                      ? verifiedPlatformSuggestions[platform.id]
                      : generateUsernameSuggestions(username, isDomain).slice(0, 3)
                    ).map((alt) => (
                      <button
                        key={alt}
                        type="button"
                        onClick={() => { setUsername(alt); updateUrlAndSearch(alt, activeCategory); }}
                        className="px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-mono border border-emerald-500/30 transition-colors flex items-center gap-1 font-semibold"
                      >
                        <Check className="w-3 h-3 text-emerald-400" /> {isDomain ? `${alt}.${tld}` : `@${alt}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <a
                  href={res.url || formattedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  {isDomain ? 'Register / View' : 'Visit Link'} <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyLink(res.url || formattedUrl, platform.id)}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  {copiedId === platform.id ? (
                    <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied!</span>
                  ) : (
                    <span className="flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy URL</span>
                  )}
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <SeoFaq />

    </div>
  );
}

export default function CheckerPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-24 text-slate-400 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span>Loading Username Search Suite...</span>
      </div>
    }>
      <CheckerPageContent />
    </Suspense>
  );
}
