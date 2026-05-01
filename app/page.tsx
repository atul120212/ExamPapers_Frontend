import { Suspense } from 'react';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import FilterFlow from '@/components/FilterFlow';
import PapersGrid from '@/components/PapersGrid';
import Filters from '@/components/Filters';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;

  return (
    <>
      <Hero />
      <CategoryGrid />
      
      {/* Step-based Filter Flow Section */}
      <section className="py-16 sm:py-24 bg-ink-soft" id="filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="space-y-8">
            <div className="h-12 bg-surface rounded animate-pulse" />
            <div className="h-48 bg-surface rounded animate-pulse" />
          </div>}>
            <FilterFlow />
          </Suspense>
        </div>
      </section>

      {/* Papers Grid Section */}
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <PapersGrid searchQuery={params.search ? String(params.search) : ''} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
