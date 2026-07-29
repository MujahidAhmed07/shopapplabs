import React from 'react';

export default function GlassCard({ children, className = '', hoverGlow = true }) {
  return (
    <div
      className={`glass-panel p-6 relative overflow-hidden ${
        hoverGlow ? 'hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
