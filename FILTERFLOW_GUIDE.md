# FilterFlow - Step-Based Exam Paper Selection

## Overview

The FilterFlow component implements a progressive disclosure UI pattern that guides users through selecting exam papers in 3 sequential steps. Based on their selection at each step, only relevant options appear in the next step.

## Architecture

### Components

1. **FilterFlow** (`components/FilterFlow.tsx`) - Main orchestrator component
   - Manages which step component to display
   - Handles navigation between steps
   - Integrates with Zustand store for state management

2. **CategorySelection** (`components/steps/CategorySelection.tsx`) - Step 0
   - Initial screen showing 4 categories
   - Categories: School Boards, Universities, Entrance Exams, Competitive Exams
   - Selecting a category moves to Step 1

3. **BoardSelection** (`components/steps/BoardSelection.tsx`) - Step 1
   - Shows board/institution options filtered by selected category
   - Different boards for each category (e.g., CBSE, ICSE for schools; IIT, NIT for universities)
   - Selecting a board advances to Step 2

4. **ClassSelection** (`components/steps/ClassSelection.tsx`) - Step 2
   - Shows class/level options filtered by category
   - Different options per category (Classes 9-12 for schools, Degree levels for universities, etc.)
   - Selecting a class moves to Step 3 (Results view)

5. **StepFlow** (`components/StepFlow.tsx`)
   - Visual progress indicator showing completed/active steps
   - Displays selected values from previous steps
   - Animated step indicator circles connected by progress lines

## State Management

Using Zustand store (`lib/store.ts`) to track:

```typescript
currentStep: number           // 0 (category) -> 1 (board) -> 2 (class) -> 3 (results)
selectedCategory: ExamCategory // 'school' | 'university' | 'entrance' | 'competitive' | null
selectedBoard: string | null   // Selected board/institution name
selectedClass: string | null   // Selected class/level
selectedStream: string | null  // Selected stream (future expansion)
```

## User Flow

```
Step 0: CategorySelection
  ↓ (User selects category)
Step 1: BoardSelection (filtered by category)
  ↓ (User selects board)
Step 2: ClassSelection (filtered by category)
  ↓ (User selects class)
Step 3: Results View
  ↓
Displayed with dynamic sidebar filters
```

## Category-Specific Options

### School Boards
- **Boards**: CBSE, ICSE, IIT-JEE, NEET, AP Board, Maharashtra, Tamil Nadu, Karnataka
- **Classes**: 9, 10, 11, 12
- **Additional Filters**: Stream (Science/Commerce/Arts)

### Universities
- **Institutions**: Delhi University, AKTU, Mumbai University, Bangalore University, IIT Bombay, NIT Allahabad, Anna University, IIT Delhi
- **Levels**: B.Tech, M.Tech, BCA, MCA
- **Additional Filters**: Department/Specialization

### Entrance Exams
- **Exams**: JEE Main, JEE Advanced, NEET, GATE, CAT, UPSC, GPAT, AIEEE
- **Levels**: Undergraduate, Postgraduate, Professional, General
- **Additional Filters**: Subject/Stream

### Competitive Exams
- **Exams**: SSC CGL, RRB NTPC, Banking, Insurance, AFCAT, NDA, POLICE, CLAT
- **Levels**: Different exam tiers
- **Additional Filters**: Year, Level

## UI Features

- **Gold Theme**: Primary accent color (#ffb800) with dark ink background
- **Step Indicator**: Connected circles showing progress with checkmarks for completed steps
- **Animated Transitions**: Smooth color changes as steps are completed
- **Responsive Grid**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Selected State**: Gold border and background highlight for selected items
- **Previous Button**: Navigation back to previous step (Step 2+)
- **Call-to-Action**: "See All Papers" button at Step 3

## Integration with Main Page

The FilterFlow is placed before the main Papers Grid:

1. User completes FilterFlow steps
2. Selections are stored in Zustand store
3. PapersGrid component reads selections from store
4. Dynamic sidebar filters update based on selections
5. Paper cards display matching results

## Styling

- Gold (#ffb800) for primary actions and progress indicators
- Dark ink (#0d1117) for backgrounds
- Gold/20 for subtle borders and inactive states
- Gold/10 for hover backgrounds
- Teal gradients for progress lines

## Future Enhancements

- Add subject selection as Step 4
- Save user preferences for next visit
- Show paper count at each step
- Add filtering by year/exam season
- Mobile-optimized step carousel view
