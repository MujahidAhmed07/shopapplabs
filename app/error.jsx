'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error for debugging
    console.error('App Router Boundary caught error:', error);

    const errorMessage = error?.message || error?.name || '';
    const isChunkError =
      errorMessage.includes('ChunkLoadError') ||
      errorMessage.includes('Loading chunk') ||
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('Importing a module script failed');

    if (isChunkError) {
      const now = Date.now();
      const lastReload = parseInt(sessionStorage.getItem('__chunk_err_reload') || '0', 10);
      
      // Auto reload if not reloaded in the last 20 seconds to break infinite reload loops
      if (now - lastReload > 20000) {
        sessionStorage.setItem('__chunk_err_reload', String(now));
        // Cache-bust the URL to force fresh HTML from server/CDN
        const cleanUrl = window.location.href.split('?')[0].split('#')[0];
        window.location.replace(cleanUrl + '?__r=' + now);
      }
    }
  }, [error]);

  const handleReload = () => {
    sessionStorage.removeItem('__chunk_err_reload');
    window.location.reload();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white font-heading">
            Application Update Available
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            A new version of ShopApp Labs Username Checker was deployed or your connection was interrupted. Please refresh to load the latest version.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={handleReload}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Page
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
