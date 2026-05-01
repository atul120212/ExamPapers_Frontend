'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Paper {
  id: string;
  title: string;
  board: string;
  class: string;
  subject: string;
  year: number;
  views: number;
  downloads: number;
  created_at: string;
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAppStore();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, views: 0, downloads: 0 });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      // Redirect to home if not admin
      window.location.href = '/';
      return;
    }

    const fetchPapers = async () => {
      try {
        const { data, error } = await supabase
          .from('papers')
          .select('*')
          .eq('uploaded_by', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setPapers(data || []);

        // Calculate stats
        const total = data?.length || 0;
        const totalViews = data?.reduce((sum, p) => sum + (p.views || 0), 0) || 0;
        const totalDownloads = data?.reduce((sum, p) => sum + (p.downloads || 0), 0) || 0;

        setStats({
          total,
          views: totalViews,
          downloads: totalDownloads,
        });
      } catch (error) {
        console.error('Error fetching papers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [user, isAuthenticated]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link
            href="/upload"
            className="px-6 py-2 bg-gold text-ink font-bold rounded hover:bg-gold-dim"
          >
            Upload Paper
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Papers</p>
            <p className="text-3xl font-bold text-gold">{stats.total}</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Views</p>
            <p className="text-3xl font-bold text-accent">{stats.views}</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Downloads</p>
            <p className="text-3xl font-bold text-green">{stats.downloads}</p>
          </div>
        </div>

        {/* Papers Table */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Board</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Class</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Views</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Downloads</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {papers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                    No papers uploaded yet
                  </td>
                </tr>
              ) : (
                papers.map(paper => (
                  <tr key={paper.id} className="border-b border-border/50 hover:bg-ink-soft">
                    <td className="px-6 py-4 text-sm">{paper.title}</td>
                    <td className="px-6 py-4 text-sm">{paper.board}</td>
                    <td className="px-6 py-4 text-sm">{paper.class}</td>
                    <td className="px-6 py-4 text-sm">{paper.subject}</td>
                    <td className="px-6 py-4 text-sm">{paper.views}</td>
                    <td className="px-6 py-4 text-sm">{paper.downloads}</td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        href={`/papers/${paper.id}`}
                        className="text-gold hover:text-gold-dim"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
