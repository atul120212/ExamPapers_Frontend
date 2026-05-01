'use client';

import { useAppStore } from '@/lib/store';

const CLASS_OPTIONS = [
  { value: '9', label: 'Class 9', description: 'Secondary' },
  { value: '10', label: 'Class 10', description: 'SSC / Matric' },
  { value: '11', label: 'Class 11', description: 'Higher Secondary' },
  { value: '12', label: 'Class 12', description: 'HSC / Senior' },
];

const UNIVERSITY_LEVELS = [
  { value: 'btech', label: 'B.Tech', description: 'Bachelor of Technology' },
  { value: 'mtech', label: 'M.Tech', description: 'Master of Technology' },
  { value: 'bca', label: 'BCA', description: 'Bachelor of Computer Applications' },
  { value: 'mca', label: 'MCA', description: 'Master of Computer Applications' },
];

const ENTRANCE_LEVELS = [
  { value: 'undergraduate', label: 'Undergraduate', description: 'For Class 12 passed' },
  { value: 'postgraduate', label: 'Postgraduate', description: 'For Graduation passed' },
  { value: 'professional', label: 'Professional', description: 'For Working Professionals' },
  { value: 'general', label: 'General', description: 'Open to all' },
];

const STREAMS = [
  { value: 'science', label: 'Science', description: 'Physics, Chemistry, Biology' },
  { value: 'commerce', label: 'Commerce', description: 'Accounts, Economics, Business' },
  { value: 'arts', label: 'Arts', description: 'History, Geography, Political Science' },
  { value: 'general', label: 'General', description: 'All subjects' },
];

const getOptionsForCategory = (category: string | null) => {
  switch (category) {
    case 'school':
      return { options: CLASS_OPTIONS, title: 'Select Class', subtitle: 'Choose your class level' };
    case 'university':
      return { options: UNIVERSITY_LEVELS, title: 'Select Level', subtitle: 'Choose your degree level' };
    case 'entrance':
      return { options: ENTRANCE_LEVELS, title: 'Select Level', subtitle: 'Choose your entrance level' };
    case 'competitive':
      return { options: CLASS_OPTIONS, title: 'Select Stream', subtitle: 'Choose your stream' };
    default:
      return { options: [], title: 'Select Option', subtitle: '' };
  }
};

export default function ClassSelection() {
  const { selectedCategory, selectedClass, setSelectedClass } = useAppStore();
  const { options, title, subtitle } = getOptionsForCategory(selectedCategory);

  const handleClassSelect = (classValue: string) => {
    setSelectedClass(classValue);
    useAppStore.setState({ currentStep: 3 });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gold uppercase tracking-widest mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleClassSelect(option.value)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              selectedClass === option.value
                ? 'border-gold bg-gold/10'
                : 'border-gold/20 hover:border-gold bg-surface'
            }`}
          >
            <h3 className={`font-bold text-lg mb-1 ${
              selectedClass === option.value ? 'text-gold' : 'text-white'
            }`}>
              {option.label}
            </h3>
            <p className="text-xs text-muted-foreground">
              {option.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-gold/5 border border-gold/20">
        <p className="text-sm text-muted-foreground">
          <span className="text-gold font-bold">Tip:</span> You can refine your results further using the filters panel on the left after selecting all options.
        </p>
      </div>
    </div>
  );
}
