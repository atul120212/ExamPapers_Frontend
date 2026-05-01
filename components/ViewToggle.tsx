'use client';

import { useState } from 'react';

export interface ViewToggleProps {
  onViewChange?: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ onViewChange }: ViewToggleProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView);
    onViewChange?.(newView);
  };

  return (
    <div className="flex items-center gap-1 p-1 bg-surface rounded border border-gold/20">
      <button
        onClick={() => handleViewChange('grid')}
        className={`px-3 py-2 rounded text-sm font-medium transition-all ${
          view === 'grid'
            ? 'bg-ink text-gold'
            : 'text-muted-foreground hover:text-gold'
        }`}
        title="Grid view"
      >
        ⊞
      </button>
      <button
        onClick={() => handleViewChange('list')}
        className={`px-3 py-2 rounded text-sm font-medium transition-all ${
          view === 'list'
            ? 'bg-ink text-gold'
            : 'text-muted-foreground hover:text-gold'
        }`}
        title="List view"
      >
        ≡
      </button>
    </div>
  );
}
