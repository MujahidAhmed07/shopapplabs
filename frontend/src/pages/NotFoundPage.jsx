import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto py-24 px-6 text-center">
      <GlassCard className="p-12 space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-white font-heading">404 — Page Not Found</h1>
        <p className="text-slate-400 text-sm">
          The page or product you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
        >
          <Home className="w-4 h-4" /> Return to Home
        </Link>
      </GlassCard>
    </div>
  );
}
