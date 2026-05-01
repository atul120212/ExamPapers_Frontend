'use client';

import { useAppStore } from '@/lib/store';
import StepFlow from './StepFlow';
import CategorySelection from './steps/CategorySelection';
import BoardSelection from './steps/BoardSelection';
import ClassSelection from './steps/ClassSelection';
import { useState } from 'react';

export default function FilterFlow() {
  const { currentStep, selectedCategory } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(true);

  if (currentStep === 0) {
    return (
      <div className="mb-12">
        <CategorySelection />
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gold/20 rounded-lg p-8 bg-surface-top">
      <div className="mb-8">
        <StepFlow />
      </div>

      {/* Step content */}
      <div className="mt-8">
        {currentStep === 1 && <BoardSelection />}
        {currentStep === 2 && <ClassSelection />}
        {currentStep === 3 && (
          <div className="text-center py-8">
            <p className="text-gold text-lg font-bold">Filters Applied - View Results Below</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-8 border-t border-gold/10">
        {currentStep > 1 && (
          <button
            onClick={() => useAppStore.setState({ currentStep: currentStep - 1 })}
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <span>←</span> Previous
          </button>
        )}
        {currentStep < 2 && (
          <div />
        )}
        {currentStep === 3 && (
          <button
            onClick={() => useAppStore.setState({ currentStep: currentStep })}
            className="ml-auto text-gold hover:text-gold-dim transition-colors font-bold"
          >
            See All Papers →
          </button>
        )}
      </div>
    </div>
  );
}
