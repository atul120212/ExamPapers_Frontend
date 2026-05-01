'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { fetchPapers, type Paper } from '@/lib/api';
import PaperCard from './PaperCard';

interface PapersGridProps {
  searchQuery?: string;
}

export default function PapersGrid({ searchQuery }: PapersGridProps) {
  const { filters, sortBy, currentPage, setCurrentPage } = useAppStore();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPapers = async () => {
      setLoading(true);
      const data = await fetchPapers({
        subjects: filters.subjects,
        boards: filters.boards,
        classes: filters.classes,
        years: filters.years,
        sort: sortBy,
        page: currentPage,
        limit: 12,
      });
      
      // Filter by search query if provided
      if (searchQuery) {
        const filtered = data.filter(paper =>
          paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.board.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPapers(filtered);
      } else {
        setPapers(data);
      }
      setLoading(false);
    };

    loadPapers();
  }, [filters, sortBy, currentPage, searchQuery]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-96 bg-surface rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No papers found.</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {papers.map(paper => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-border rounded hover:bg-surface disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {currentPage}</span>
        {papers.length === 12 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 border border-border rounded hover:bg-surface"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
