'use client';

import { useAppStore } from '@/lib/store';

const SCHOOL_BOARDS = [
  { name: 'CBSE', icon: '📘' },
  { name: 'ICSE', icon: '📗' },
  { name: 'IIT-JEE', icon: '⚡' },
  { name: 'NEET', icon: '🧬' },
  { name: 'AP Board', icon: '📕' },
  { name: 'Maharashtra', icon: '🏛️' },
  { name: 'Tamil Nadu', icon: '📚' },
  { name: 'Karnataka', icon: '📖' },
];

const UNIVERSITY_BOARDS = [
  { name: 'Delhi University', icon: '🎓' },
  { name: 'AKTU', icon: '🏫' },
  { name: 'Mumbai University', icon: '🏛️' },
  { name: 'Bangalore University', icon: '📚' },
  { name: 'IIT Bombay', icon: '⚡' },
  { name: 'NIT Allahabad', icon: '🔬' },
  { name: 'Anna University', icon: '📖' },
  { name: 'IIT Delhi', icon: '⭐' },
];

const ENTRANCE_BOARDS = [
  { name: 'JEE Main', icon: '⚡' },
  { name: 'JEE Advanced', icon: '🚀' },
  { name: 'NEET', icon: '🧬' },
  { name: 'GATE', icon: '🏆' },
  { name: 'CAT', icon: '📊' },
  { name: 'UPSC', icon: '⭐' },
  { name: 'GPAT', icon: '💊' },
  { name: 'AIEEE', icon: '📐' },
];

const COMPETITIVE_BOARDS = [
  { name: 'SSC CGL', icon: '📝' },
  { name: 'RRB NTPC', icon: '🚂' },
  { name: 'Banking', icon: '🏦' },
  { name: 'Insurance', icon: '🛡️' },
  { name: 'AFCAT', icon: '✈️' },
  { name: 'NDA', icon: '🎖️' },
  { name: 'POLICE', icon: '👮' },
  { name: 'CLAT', icon: '⚖️' },
];

const getBoardsForCategory = (category: string | null) => {
  switch (category) {
    case 'school':
      return SCHOOL_BOARDS;
    case 'university':
      return UNIVERSITY_BOARDS;
    case 'entrance':
      return ENTRANCE_BOARDS;
    case 'competitive':
      return COMPETITIVE_BOARDS;
    default:
      return [];
  }
};

export default function BoardSelection() {
  const { selectedCategory, selectedBoard, setSelectedBoard } = useAppStore();
  const boards = getBoardsForCategory(selectedCategory);

  const handleBoardSelect = (boardName: string) => {
    setSelectedBoard(boardName);
    useAppStore.setState({ currentStep: 2 });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gold uppercase tracking-widest mb-2">
          Select Your Board/Institution
        </h2>
        <p className="text-muted-foreground">Choose the specific board or institution</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {boards.map((board) => (
          <button
            key={board.name}
            onClick={() => handleBoardSelect(board.name)}
            className={`p-4 rounded-lg border-2 transition-all group ${
              selectedBoard === board.name
                ? 'border-gold bg-gold/10'
                : 'border-gold/20 hover:border-gold'
            }`}
          >
            <div className="text-3xl mb-3">{board.icon}</div>
            <p className={`font-bold text-sm ${
              selectedBoard === board.name ? 'text-gold' : 'text-white group-hover:text-gold'
            }`}>
              {board.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
