import React from 'react';

export default function GlassCard({ children, className = '', hoverGlow = true }) {
  return (
    <div
      className={`glass-panel relative overflow-hidden ${
        hoverGlow ? 'card-hover cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
