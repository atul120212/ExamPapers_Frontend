'use client';

import { useAppStore } from '@/lib/store';

export default function StepWizard() {
  const { currentStep } = useAppStore();
  
  const steps = [
    { number: 1, label: 'Category', color: 'bg-gold' },
    { number: 2, label: 'Board/Institution', color: 'bg-teal' },
    { number: 3, label: 'Class/Level', color: 'bg-green' },
  ];

  return (
    <div className="mb-8">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-4">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center gap-2 flex-1">
            {/* Step Dot */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all ${
              currentStep >= step.number
                ? `${step.color} text-ink`
                : 'border-2 border-gold/30 text-muted-foreground'
            }`}>
              {currentStep >= step.number ? '✓' : step.number}
            </div>
            
            {/* Step Label */}
            <span className={`text-xs font-bold uppercase tracking-wide hidden sm:inline ${
              currentStep >= step.number ? 'text-gold' : 'text-muted-foreground'
            }`}>
              {step.label}
            </span>

            {/* Connector Line */}
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 transition-colors ${
                currentStep > step.number ? 'bg-gold' : 'bg-gold/20'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Info */}
      {currentStep > 0 && (
        <div className="text-xs text-muted-foreground text-center">
          Step {currentStep} of 3
        </div>
      )}
    </div>
  );
}
