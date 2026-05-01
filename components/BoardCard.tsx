'use client';

interface Board {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface BoardCardProps {
  board: Board;
  isSelected: boolean;
  onSelect: () => void;
}

export default function BoardCard({ board, isSelected, onSelect }: BoardCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`group relative p-6 rounded-lg border-2 transition-all duration-200 ${
        isSelected
          ? 'border-gold bg-gold/10'
          : 'border-gold/20 bg-surface hover:border-gold/40 hover:bg-surface-top'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`text-5xl p-3 rounded-lg ${isSelected ? 'bg-gold/20' : 'bg-surface-top group-hover:bg-gold/10'}`}>
          {board.icon}
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg text-white group-hover:text-gold transition-colors">
            {board.name}
          </h3>
        </div>
      </div>
    </button>
  );
}
