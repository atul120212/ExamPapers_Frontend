import { Suspense } from 'react';
import Hero from '@/components/Hero';
import PapersGrid from '@/components/PapersGrid';
import Filters from '@/components/Filters';

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  return (
    <>
      <Hero />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <Suspense fallback={<div className="h-96 bg-surface rounded animate-pulse" />}>
              <Filters />
            </Suspense>

            {/* Papers Grid */}
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-surface rounded animate-pulse" />
                ))}
              </div>}>
                <PapersGrid searchQuery={searchParams.search as string} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
