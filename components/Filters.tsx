'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';

const BOARDS = [
  { name: 'CBSE', icon: '📘' },
  { name: 'ICSE', icon: '📗' },
  { name: 'State Board', icon: '📕' },
];

const CLASSES = ['9', '10', '11', '12'];
const YEARS = ['2024', '2023', '2022', '2021', '2020'];
const SUBJECTS = [
  { name: 'Mathematics', icon: '∑' },
  { name: 'Science', icon: '⚗️' },
  { name: 'English', icon: '✏️' },
  { name: 'History', icon: '📜' },
  { name: 'Geography', icon: '🌍' },
  { name: 'Chemistry', icon: '🧪' },
  { name: 'Physics', icon: '⚡' },
  { name: 'Biology', icon: '🔬' },
];

export default function Filters() {
  const { filters, updateFilters, resetFilters } = useAppStore();
  const [expanded, setExpanded] = useState({
    boards: true,
    classes: true,
    subjects: true,
    years: false,
  });

  const toggleFilter = (category: string, value: string) => {
    const current = filters[category as keyof typeof filters] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilters({ [category]: updated });
  };

  const toggleExpand = (section: string) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Filters</h2>
        <button
          onClick={() => resetFilters()}
          className="text-xs text-gold hover:text-gold-dim transition-colors uppercase font-bold"
        >
          Reset
        </button>
      </div>

      {/* Boards */}
      <div className="border border-gold/20 rounded-lg p-4 bg-surface">
        <button
          onClick={() => toggleExpand('boards')}
          className="w-full flex justify-between items-center mb-4"
        >
          <h3 className="font-bold text-white uppercase tracking-wide text-sm">Boards</h3>
          <span className="text-gold text-lg">{expanded.boards ? '−' : '+'}</span>
        </button>
        {expanded.boards && (
          <div className="space-y-3">
            {BOARDS.map(board => (
              <label key={board.name} className="flex items-center gap-3 cursor-pointer group">
                <div className="flex items-center justify-center w-6 h-6 border-2 border-gold/30 rounded group-hover:border-gold group-hover:bg-gold/10 transition-all">
                  {filters.boards.includes(board.name) && (
                    <div className="w-2 h-2 bg-gold rounded-full" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">{board.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Classes */}
      <div className="border border-gold/20 rounded-lg p-4 bg-surface">
        <button
          onClick={() => toggleExpand('classes')}
          className="w-full flex justify-between items-center mb-4"
        >
          <h3 className="font-bold text-white uppercase tracking-wide text-sm">Classes</h3>
          <span className="text-gold text-lg">{expanded.classes ? '−' : '+'}</span>
        </button>
        {expanded.classes && (
          <div className="grid grid-cols-2 gap-3">
            {CLASSES.map(cls => (
              <button
                key={cls}
                onClick={() => toggleFilter('classes', cls)}
                className={`py-2 px-3 rounded text-sm font-bold transition-all border-2 ${
                  filters.classes.includes(cls)
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gold/20 text-muted-foreground hover:border-gold/40'
                }`}
              >
                Class {cls}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Subjects */}
      <div className="border border-gold/20 rounded-lg p-4 bg-surface">
        <button
          onClick={() => toggleExpand('subjects')}
          className="w-full flex justify-between items-center mb-4"
        >
          <h3 className="font-bold text-white uppercase tracking-wide text-sm">Subjects</h3>
          <span className="text-gold text-lg">{expanded.subjects ? '−' : '+'}</span>
        </button>
        {expanded.subjects && (
          <div className="space-y-2">
            {SUBJECTS.map(subject => (
              <label key={subject.name} className="flex items-center gap-3 cursor-pointer group">
                <div className="flex items-center justify-center w-6 h-6 border-2 border-gold/30 rounded group-hover:border-gold group-hover:bg-gold/10 transition-all">
                  {filters.subjects.includes(subject.name) && (
                    <div className="w-2 h-2 bg-gold rounded-full" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">{subject.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Years */}
      <div className="border border-gold/20 rounded-lg p-4 bg-surface">
        <button
          onClick={() => toggleExpand('years')}
          className="w-full flex justify-between items-center mb-4"
        >
          <h3 className="font-bold text-white uppercase tracking-wide text-sm">Years</h3>
          <span className="text-gold text-lg">{expanded.years ? '−' : '+'}</span>
        </button>
        {expanded.years && (
          <div className="space-y-2">
            {YEARS.map(year => (
              <label key={year} className="flex items-center gap-3 cursor-pointer group">
                <div className="flex items-center justify-center w-6 h-6 border-2 border-gold/30 rounded group-hover:border-gold group-hover:bg-gold/10 transition-all">
                  {filters.years.includes(year) && (
                    <div className="w-2 h-2 bg-gold rounded-full" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">{year}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
