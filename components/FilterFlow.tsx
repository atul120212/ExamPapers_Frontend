'use client';

import { useAppStore } from '@/lib/store';
import StepWizard from './wizard/StepWizard';
import CategorySelection from './steps/CategorySelection';
import BoardSelection from './steps/BoardSelection';
import ClassSelection from './steps/ClassSelection';

export default function FilterFlow() {
  const { currentStep } = useAppStore();

  // Show category selection on initial load
  if (currentStep === 0) {
    return (
      <div className="mb-12">
        <CategorySelection />
      </div>
    );
  }

  // Show step wizard and content when user has selected category
  return (
    <div className="mb-12 border border-gold/20 rounded-xl p-8 bg-surface">
      {/* Step Wizard */}
      <StepWizard />

      {/* Step Content Container */}
      <div className="mt-10 space-y-8">
        {currentStep === 1 && (
          <>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-6">
                Select Board
              </h3>
              <BoardSelection />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-6">
                Select Class / Level
              </h3>
              <ClassSelection />
            </div>
          </>
        )}

        {currentStep === 3 && (
          <div className="text-center py-12">
            <div className="inline-block px-6 py-3 rounded-lg bg-gold/10 border border-gold/30">
              <p className="text-gold font-bold">Filters Applied - Browse Results Below</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="mt-10 pt-8 border-t border-gold/10 flex justify-between items-center">
        {currentStep > 1 && (
          <button
            onClick={() => useAppStore.setState({ currentStep: currentStep - 1 })}
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors font-medium text-sm"
          >
            ← Previous
          </button>
        )}
        {currentStep < 3 && currentStep > 0 && <div />}
        
        {currentStep === 3 && (
          <button
            onClick={() => document.getElementById('papers-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="ml-auto text-gold hover:text-gold-dim transition-colors font-bold text-sm"
          >
            See All Papers →
          </button>
        )}
      </div>
    </div>
  );
}
