import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ResultBadge({ status, message }) {
  if (status === 'LOADING') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-badge">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Checking...
      </span>
    );
  }

  if (status === 'AVAILABLE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-badge">
        <CheckCircle2 className="w-3.5 h-3.5" />
        AVAILABLE
      </span>
    );
  }

  if (status === 'TAKEN') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-badge">
        <XCircle className="w-3.5 h-3.5" />
        TAKEN
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-badge"
      title={message || ''}
    >
      <AlertCircle className="w-3.5 h-3.5" />
      {status || 'UNKNOWN'}
    </span>
  );
}
