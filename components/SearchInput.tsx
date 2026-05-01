'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search subjects, boards, years..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-2 bg-accent hover:bg-accent/80 rounded text-sm font-medium"
      >
        🔍
      </button>
    </div>
  );
}
