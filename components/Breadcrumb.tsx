'use client';

import { useAppStore } from '@/lib/store';

const getCategoryLabel = (category: string | null) => {
  const labels: Record<string, string> = {
    school: 'School Boards',
    university: 'Universities',
    entrance: 'Entrance Exams',
    competitive: 'Competitive Exams',
  };
  return category ? labels[category] : null;
};

export default function Breadcrumb() {
  const { selectedCategory, selectedBoard, selectedClass, resetStep } = useAppStore();
  
  const items = [
    { label: 'Home', href: '#' },
    selectedCategory && { label: getCategoryLabel(selectedCategory), href: '#' },
    selectedBoard && { label: selectedBoard, href: '#' },
    selectedClass && { label: selectedClass, href: '#', active: true },
  ].filter(Boolean);

  if (!selectedCategory) return null;

  return (
    <nav className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-gold/10 text-sm sticky top-16 z-10">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <button
            onClick={item?.href === '#' ? resetStep : undefined}
            className={`transition-colors ${
              item?.active
                ? 'text-gold font-bold cursor-default'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {item?.label}
          </button>
          {idx < items.length - 1 && <span className="text-gold/30">/</span>}
        </div>
      ))}
    </nav>
  );
}
