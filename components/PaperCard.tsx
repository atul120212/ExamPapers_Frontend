'use client';

import Link from 'next/link';
import { type Paper } from '@/lib/api';

interface PaperCardProps {
  paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden hover:border-gold/50 transition-colors bg-surface">
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-gold transition-colors">
          <Link href={`/papers/${paper.id}`}>{paper.title}</Link>
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
            {paper.board}
          </span>
          <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
            Class {paper.class}
          </span>
          <span className="text-xs bg-green/20 text-green px-2 py-1 rounded">
            {paper.year}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          <strong>{paper.subject}</strong>
        </p>

        {paper.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {paper.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>👁️ {paper.views} views</span>
            <span>⬇️ {paper.downloads} downloads</span>
          </div>
          <Link
            href={`/papers/${paper.id}`}
            className="text-xs font-bold text-gold hover:text-gold-dim transition-colors"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
