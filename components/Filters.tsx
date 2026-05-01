'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';

const BOARDS = ['CBSE', 'ICSE', 'IIT-JEE', 'NEET', 'State Board'];
const CLASSES = ['9', '10', '11', '12'];
const YEARS = ['2024', '2023', '2022', '2021', '2020'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Economics', 'Biology', 'Physics', 'Chemistry'];

export default function Filters() {
  const { filters, updateFilters, resetFilters } = useAppStore();
  const [expanded, setExpanded] = useState({
    boards: true,
    classes: true,
    subjects: true,
    years: true,
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
        <h2 className="text-lg font-bold">Filters</h2>
        <button
          onClick={() => resetFilters()}
          className="text-sm text-accent hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Boards */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleExpand('boards')}
          className="w-full flex justify-between items-center mb-3"
        >
          <h3 className="font-semibold">Boards</h3>
          <span className="text-muted-foreground">{expanded.boards ? '−' : '+'}</span>
        </button>
        {expanded.boards && (
          <div className="space-y-2">
            {BOARDS.map(board => (
              <label key={board} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.boards.includes(board)}
                  onChange={() => toggleFilter('boards', board)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{board}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Classes */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleExpand('classes')}
          className="w-full flex justify-between items-center mb-3"
        >
          <h3 className="font-semibold">Classes</h3>
          <span className="text-muted-foreground">{expanded.classes ? '−' : '+'}</span>
        </button>
        {expanded.classes && (
          <div className="space-y-2">
            {CLASSES.map(cls => (
              <label key={cls} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.classes.includes(cls)}
                  onChange={() => toggleFilter('classes', cls)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Class {cls}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Subjects */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleExpand('subjects')}
          className="w-full flex justify-between items-center mb-3"
        >
          <h3 className="font-semibold">Subjects</h3>
          <span className="text-muted-foreground">{expanded.subjects ? '−' : '+'}</span>
        </button>
        {expanded.subjects && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {SUBJECTS.map(subject => (
              <label key={subject} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.subjects.includes(subject)}
                  onChange={() => toggleFilter('subjects', subject)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{subject}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Years */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleExpand('years')}
          className="w-full flex justify-between items-center mb-3"
        >
          <h3 className="font-semibold">Years</h3>
          <span className="text-muted-foreground">{expanded.years ? '−' : '+'}</span>
        </button>
        {expanded.years && (
          <div className="space-y-2">
            {YEARS.map(year => (
              <label key={year} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.years.includes(year)}
                  onChange={() => toggleFilter('years', year)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{year}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
