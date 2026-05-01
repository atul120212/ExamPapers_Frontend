'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-start gap-4 lg:gap-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} className="flex items-center">
            <button
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all ${
                isActive
                  ? 'bg-gold text-ink ring-2 ring-gold ring-offset-2 ring-offset-background'
                  : isCompleted
                    ? 'bg-gold text-ink'
                    : 'border-2 border-gold/30 text-gold hover:border-gold/50'
              }`}
            >
              {step}
            </button>
            {step < totalSteps && (
              <div
                className={`h-1 flex-1 mx-2 lg:mx-6 ${
                  isCompleted ? 'bg-gold' : 'bg-gold/20'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
