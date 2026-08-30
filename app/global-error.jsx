'use client';

import React, { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global layout boundary caught error:', error);

    const errorMessage = error?.message || error?.name || '';
    const isChunkError =
      errorMessage.includes('ChunkLoadError') ||
      errorMessage.includes('Loading chunk') ||
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('Importing a module script failed');

    if (isChunkError) {
      const now = Date.now();
      const lastReload = parseInt(sessionStorage.getItem('last_global_chunk_reload') || '0', 10);
      if (now - lastReload > 15000) {
        sessionStorage.setItem('last_global_chunk_reload', String(now));
        const cleanUrl = window.location.href.split('#')[0];
        window.location.href = cleanUrl;
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#090D16] text-white min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full p-8 rounded-2xl bg-white/[0.04] border border-white/10 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-white">Application Refresh Required</h2>
          <p className="text-slate-400 text-sm">
            A new version of ShopApp Labs was published. Please click below to refresh the page.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem('last_global_chunk_reload');
              window.location.reload();
            }}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
          >
            Refresh Now
          </button>
        </div>
      </body>
    </html>
  );
}
