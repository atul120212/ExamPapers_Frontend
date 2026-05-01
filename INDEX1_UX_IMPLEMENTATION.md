# Index1 UX Implementation - ExamVault Step-Based Filtering

## Overview
This document explains how the ExamVault application implements the sophisticated step-based filtering UX from the reference index1.html design.

## Architecture & Flow

### 1. State Management (Zustand Store)
The application uses Zustand to manage filtering state across components:

```typescript
- currentStep: 0 (Category) → 1 (Board) → 2 (Class) → 3 (Results)
- selectedCategory: 'school' | 'university' | 'entrance' | 'competitive' | null
- selectedBoard: string | null (CBSE, ICSE, IIT-JEE, etc.)
- selectedClass: string | null (Class 9-12, B.Tech, M.Tech, etc.)
```

**State Actions:**
- `setCategory(category)` - Sets category and resets following steps
- `setSelectedBoard(board)` - Sets board and advances to step 2
- `setSelectedClass(class)` - Sets class and advances to step 3
- `resetStep()` - Clears all selections for new search

### 2. Component Hierarchy

```
Home (page.tsx)
├── Hero
├── CategoryGrid (shows categories like School, University)
├── FilterFlow (main wizard container)
│   ├── CategorySelection (Step 0)
│   │   └── 4 mode cards
│   ├── StepWizard (visual progress indicator)
│   ├── BoardSelection (Step 1)
│   │   └── Grid of board/institution cards
│   └── ClassSelection (Step 2)
│       └── Grid of class/level options
├── Breadcrumb (shows: Home / Category / Board / Class)
└── Papers Grid Section
    ├── Filters (sidebar with checkboxes)
    └── PapersGrid (results display)
```

### 3. User Journey

#### Step 0: Category Selection
- User sees 4 cards: School Boards, Universities, Entrance Exams, Competitive Exams
- On click, sets `selectedCategory` and advances to Step 1
- `FilterFlow` component re-renders to show next step

#### Step 1: Board/Institution Selection
- Displays 8 board options relevant to selected category
- Cards show icon and name
- On click, sets `selectedBoard` and advances to Step 2
- Breadcrumb updates to show: Home / Category / Board

#### Step 2: Class/Level Selection
- Shows 4 class/level options based on category
- School: Class 9, 10, 11, 12
- University: B.Tech, M.Tech, BCA, MCA
- Entrance: Undergraduate, Postgraduate, Professional, General
- On click, sets `selectedClass` and advances to Step 3
- Breadcrumb updates to show full path

#### Step 3: Results
- Displays message: "Filters Applied - Browse Results Below"
- Papers grid loads with sidebar filters
- User can further refine using sidebar checkboxes
- Breadcrumb shows complete path with active last item

### 4. Component Details

#### StepWizard (`components/wizard/StepWizard.tsx`)
- Visual indicator showing 1, 2, 3 steps
- Gold checkmark for completed steps
- Connecting lines between steps
- Color transitions based on currentStep

#### Breadcrumb (`components/Breadcrumb.tsx`)
- Shows Home / Category / Board / Class path
- Only renders when category is selected
- Last item is bold/gold (active state)
- Clicking items resets to that point

#### FilterFlow (`components/FilterFlow.tsx`)
- Container managing which step to display
- Shows CategorySelection when currentStep === 0
- Shows StepWizard + BoardSelection when currentStep === 1
- Shows StepWizard + ClassSelection when currentStep === 2
- Shows completion message and navigation when currentStep === 3

#### ViewToggle (`components/ViewToggle.tsx`)
- Grid/List view toggle buttons
- Used in list controls above papers
- Allows users to switch between card and list layouts

### 5. Key Design Patterns

**Progressive Disclosure**
- Only show options relevant to current selection
- Hide complexity until user needs it
- Each step unlocks next level of choices

**Visual Feedback**
- Gold color (--gold) highlights active/selected items
- Checkmarks show completed steps
- Border colors change on hover
- Smooth transitions between states

**Mobile Responsive**
- Grid layout adapts: 1 col mobile, 2-4 cols desktop
- Labels hidden on small screens (show icons only)
- Breadcrumb scrolls horizontally if needed
- Paper cards stack on mobile

### 6. Integration with Papers

After Step 3 completion:
1. Sidebar Filters populate based on category/board selection
2. `PapersGrid` fetches data filtered by selections
3. User can further refine with sidebar checkboxes
4. Results show papers matching all criteria

### 7. CSS Classes Used

- `.step-wizard` - Container for step indicator
- `.step-dot` - Individual step circles
- `.step-line` - Connecting lines
- `.breadcrumb` - Navigation path
- `.opt-card` - Option selection cards
- `.opt-btn` - Option button style
- `.gold` - Primary accent color

### 8. State Reset Behavior

Clicking "Previous" or breadcrumb items resets:
- `currentStep` to previous value
- Clears selections after that point
- Sidebar filters update accordingly
- Allows users to change their selection path

## Accessibility Features

- Semantic HTML structure
- Clear visual hierarchy
- Keyboard navigation ready
- Screen reader friendly labels
- Sufficient color contrast
- Focus states on interactive elements

## Performance Optimizations

- Client-side state (Zustand) prevents unnecessary re-renders
- Suspense boundaries for async data loading
- CSS transitions for smooth animations
- Lazy loading of paper cards
- Memoized filter calculations

## Customization Points

To add new categories/boards/classes:
1. Edit BoardSelection.tsx - add to appropriate array
2. Edit ClassSelection.tsx - add to appropriate array
3. Update store.ts if new filter types needed
4. Update Filters.tsx sidebar if new filter dimensions needed

## Future Enhancements

- URL parameter persistence (save selections in URL)
- Search across all categories
- Favorite/saved filter sets
- Advanced filter combining
- Recently accessed boards
- Trending papers in category
