import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader2, RefreshCw, ExternalLink, Check, Copy, Sparkles, Share2 } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import ResultBadge from '../components/common/ResultBadge';
import SeoFaq from '../components/common/SeoFaq';
import { PLATFORMS_CONFIG, CATEGORIES } from '../config/platforms';
import { checkSinglePlatform } from '../services/apiClient';

export default function CheckerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read initial params from URL
  const initialUsername = searchParams.get('u') || searchParams.get('username') || 'shopapp';
  const initialCat = searchParams.get('cat') || 'all';

  const [username, setUsername] = useState(initialUsername);
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [results, setResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [searchHistory, setSearchHistory] = useState(['shopapp', 'mujahid', 'devlabs']);

  const filteredPlatforms = PLATFORMS_CONFIG.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  const runCheck = useCallback(async (query, category) => {
    const cleanQuery = query.trim().toLowerCase().replace(/^@/, '');
    if (!cleanQuery) return;

    setIsSearching(true);
    setProgress(0);

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
    });

    await Promise.all(checkPromises);
    setIsSearching(false);
  }, []);

  // Update URL search params dynamically without page reload
  const updateUrlAndSearch = (newUsername, newCategory) => {
    const cleanQuery = newUsername.trim().toLowerCase().replace(/^@/, '');
    setSearchParams({ u: cleanQuery, cat: newCategory }, { replace: true });
    
    if (!searchHistory.includes(cleanQuery)) {
      setSearchHistory([cleanQuery, ...searchHistory.slice(0, 4)]);
    }
    runCheck(cleanQuery, newCategory);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateUrlAndSearch(username, activeCategory);
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    updateUrlAndSearch(username, catId);
  };

  // Run on mount or when searchParams change externally
  useEffect(() => {
    const u = searchParams.get('u') || searchParams.get('username') || 'shopapp';
    const cat = searchParams.get('cat') || 'all';
    setUsername(u);
    setActiveCategory(cat);
    runCheck(u, cat);
  }, []);

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
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
          Real-time <span className="text-gradient">Username & Domain</span> Checker
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Type your brand or personal handle to check availability live across 100+ networks simultaneously.
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
              placeholder="Enter username (e.g. shopapp, brandname)"
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
                Check Availability
              </>
            )}
          </button>
        </form>

        {/* History Chips & Share Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-white/5 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
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
          </div>

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
        </div>
      </GlassCard>

      {/* Progress & Category Filter Controls */}
      <div className="space-y-4">
        {isSearching && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Checking platforms...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs (No page reload) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Stats Badges */}
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
          const formattedUrl = platform.urlPattern.replace('{}', username);

          return (
            <GlassCard key={platform.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    {platform.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5 font-mono">
                    @{username}
                  </p>
                </div>
                <ResultBadge status={res.status} message={res.message} />
              </div>

              {/* Profile Details if available */}
              {res.full_name && (
                <div className="text-xs bg-white/5 p-2.5 rounded-lg text-slate-300">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account Owner</span>
                  {res.full_name}
                </div>
              )}

              {/* Action bar */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <a
                  href={res.url || formattedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  Visit Link <ExternalLink className="w-3.5 h-3.5" />
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

      {/* SEO FAQ & Keyword Content Section */}
      <SeoFaq />

    </div>
  );
}
