'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Paper {
  id: string;
  title: string;
  board: string;
  class: string;
  subject: string;
  year: number;
  description?: string;
  file_url: string;
  views: number;
  downloads: number;
  uploaded_by: string;
  created_at: string;
}

export default function PaperDetailPage() {
  const params = useParams();
  const paperId = params.id as string;
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const { data, error: queryError } = await supabase
          .from('papers')
          .select('*')
          .eq('id', paperId)
          .single();

        if (queryError) throw queryError;
        setPaper(data);

        // Increment views
        await supabase
          .from('papers')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', paperId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load paper');
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [paperId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !paper) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-red-400 mb-4">{error || 'Paper not found'}</p>
        <Link href="/" className="text-gold hover:text-gold-dim">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="text-gold hover:text-gold-dim mb-6 inline-block">
          ← Back
        </Link>

        <div className="bg-surface border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{paper.title}</h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-sm bg-accent/20 text-accent px-3 py-1 rounded">
              {paper.board}
            </span>
            <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded">
              Class {paper.class}
            </span>
            <span className="text-sm bg-green/20 text-green px-3 py-1 rounded">
              {paper.year}
            </span>
            <span className="text-sm text-muted-foreground">
              {paper.subject}
            </span>
          </div>

          {paper.description && (
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {paper.description}
            </p>
          )}

          <div className="flex gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <div>
                <div className="text-sm text-muted-foreground">Views</div>
                <div className="text-xl font-bold">{paper.views}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⬇️</span>
              <div>
                <div className="text-sm text-muted-foreground">Downloads</div>
                <div className="text-xl font-bold">{paper.downloads}</div>
              </div>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Uploaded on {new Date(paper.created_at).toLocaleDateString()}
            </p>
            <a
              href={paper.file_url}
              download
              className="inline-block px-6 py-3 bg-gold text-ink font-bold rounded hover:bg-gold-dim transition-colors"
            >
              Download Paper
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
