'use client';

import { useAppStore } from '@/lib/store';
import { StepIndicator } from '../StepIndicator';

const categories = [
  {
    id: 'school',
    label: 'School Boards',
    description: 'CBSE, ICSE, UP, and all State Boards (Class 9-12)',
    icon: '🏫',
  },
  {
    id: 'university',
    label: 'Universities',
    description: 'AKTU, DU, MU, B.Tech, BCA, MBA, and more',
    icon: '🎓',
  },
  {
    id: 'entrance',
    label: 'Entrance Exams',
    description: 'JEE Main, NEET, GATE, CAT, UPSC, and more',
    icon: '🏆',
  },
  {
    id: 'competitive',
    label: 'Competitive Exams',
    description: 'SSC, RRB, Banking, Insurance, and more',
    icon: '⭐',
  },
];

export default function CategorySelection() {
  const { setCategory } = useAppStore();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gold uppercase tracking-widest mb-2">
          Select Your Category
        </h2>
        <p className="text-muted-foreground">Choose the type of exam papers you want to access</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCategory(category.id as any)}
            className="p-6 rounded-lg border-2 border-gold/20 bg-surface hover:border-gold hover:bg-surface-top transition-all group text-left"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">{category.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg group-hover:text-gold transition-colors">
                  {category.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
