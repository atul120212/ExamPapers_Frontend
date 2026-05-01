'use client';

import { useAppStore } from '@/lib/store';

export default function StepFlow() {
  const { currentStep, selectedBoard, selectedClass } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Step indicator line */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
              currentStep >= 1 ? 'bg-gold text-ink' : 'bg-surface border-2 border-gold/30 text-muted-foreground'
            }`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
          </div>

          {/* Line 1 */}
          <div className={`flex-1 h-1 mx-2 transition-colors ${
            currentStep >= 2 ? 'bg-gradient-to-r from-gold to-gold' : 'bg-gold/20'
          }`} />

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
              currentStep >= 2 ? 'bg-gold text-ink' : 'bg-surface border-2 border-gold/30 text-muted-foreground'
            }`}>
              {currentStep > 2 ? '✓' : '2'}
            </div>
          </div>

          {/* Line 2 */}
          <div className={`flex-1 h-1 mx-2 transition-colors ${
            currentStep >= 3 ? 'bg-gradient-to-r from-gold to-gold' : 'bg-gold/20'
          }`} />

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
              currentStep >= 3 ? 'bg-gold text-ink' : 'bg-surface border-2 border-gold/30 text-muted-foreground'
            }`}>
              3
            </div>
          </div>
        </div>
      </div>

      {/* Step labels and status */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-gold">Step 1</p>
          <p className="text-sm text-muted-foreground mt-1">Select Board</p>
          {selectedBoard && (
            <p className="text-xs text-gold mt-1 font-semibold">{selectedBoard}</p>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest font-bold" style={{ color: currentStep >= 2 ? '#ffb800' : '#8b949e' }}>
            Step 2
          </p>
          <p className="text-sm text-muted-foreground mt-1">Select Class</p>
          {selectedClass && currentStep >= 2 && (
            <p className="text-xs text-gold mt-1 font-semibold">Class {selectedClass}</p>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest font-bold" style={{ color: currentStep >= 3 ? '#ffb800' : '#8b949e' }}>
            Step 3
          </p>
          <p className="text-sm text-muted-foreground mt-1">View Results</p>
          {currentStep >= 3 && (
            <p className="text-xs text-green-400 mt-1 font-semibold">Complete</p>
          )}
        </div>
      </div>
    </div>
  );
}
