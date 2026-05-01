'use client';

import { useState } from 'react';
import StepIndicator from './StepIndicator';
import BoardCard from './BoardCard';

const boards = [
  { id: 'cbse', name: 'CBSE', icon: '📘', color: 'bg-blue-500' },
  { id: 'icse', name: 'ICSE/ISC', icon: '📗', color: 'bg-green-500' },
  { id: 'up', name: 'UP Board', icon: '🏛️', color: 'bg-gray-500' },
  { id: 'maharashtra', name: 'Maharashtra', icon: '🟧', color: 'bg-orange-500' },
  { id: 'rajasthan', name: 'Rajasthan', icon: '🟥', color: 'bg-pink-500' },
  { id: 'tamil', name: 'Tamil Nadu', icon: '📕', color: 'bg-purple-500' },
  { id: 'bihar', name: 'Bihar', icon: '📄', color: 'bg-gray-400' },
  { id: 'mp', name: 'MP Board', icon: '📃', color: 'bg-gray-400' },
  { id: 'westbengal', name: 'West Bengal', icon: '📋', color: 'bg-orange-400' },
  { id: 'haryana', name: 'Haryana', icon: '📑', color: 'bg-red-400' },
  { id: 'karnataka', name: 'Karnataka', icon: '📙', color: 'bg-yellow-500' },
  { id: 'gujarat', name: 'Gujarat', icon: '🔴', color: 'bg-blue-400' },
];

export default function BoardSelector() {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [step] = useState(1);

  return (
    <div className="space-y-12">
      <StepIndicator currentStep={step} totalSteps={3} />
      
      <div>
        <h2 className="text-3xl font-bold text-white mb-2 text-uppercase tracking-wide">
          SELECT YOUR BOARD
        </h2>
        <p className="text-muted-foreground">Choose your educational board to see relevant exam papers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            isSelected={selectedBoard === board.id}
            onSelect={() => setSelectedBoard(board.id)}
          />
        ))}
      </div>
    </div>
  );
}
