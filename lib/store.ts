import { create } from 'zustand';

export type ExamCategory = 'school' | 'university' | 'entrance' | 'competitive' | null;

export interface PaperFilters {
  subjects: string[];
  boards: string[];
  classes: string[];
  years: string[];
  stream?: string;
  level?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  
  // Step-based filtering state
  currentStep: number;
  selectedCategory: ExamCategory;
  selectedBoard: string | null;
  selectedClass: string | null;
  selectedStream: string | null;
  
  filters: PaperFilters;
  currentPage: number;
  sortBy: 'recent' | 'popular' | 'views';
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
  setStep: (step: number) => void;
  setCategory: (category: ExamCategory) => void;
  setSelectedBoard: (board: string | null) => void;
  setSelectedClass: (cls: string | null) => void;
  setSelectedStream: (stream: string | null) => void;
  updateFilters: (filters: Partial<PaperFilters>) => void;
  resetFilters: () => void;
  resetStep: () => void;
  setCurrentPage: (page: number) => void;
  setSortBy: (sort: 'recent' | 'popular' | 'views') => void;
}

const defaultFilters: PaperFilters = {
  subjects: [],
  boards: [],
  classes: [],
  years: [],
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  currentStep: 0,
  selectedCategory: null,
  selectedBoard: null,
  selectedClass: null,
  selectedStream: null,
  
  filters: defaultFilters,
  currentPage: 1,
  sortBy: 'recent',
  
  setUser: (user) => set({ user, isAuthenticated: user !== null }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  
  setStep: (step) => set({ currentStep: step }),
  
  setCategory: (category) => set((state) => ({
    selectedCategory: category,
    currentStep: category ? 1 : 0,
    selectedBoard: null,
    selectedClass: null,
    selectedStream: null,
  })),
  
  setSelectedBoard: (board) => set({ selectedBoard: board }),
  
  setSelectedClass: (cls) => set({ selectedClass: cls }),
  
  setSelectedStream: (stream) => set({ selectedStream: stream }),
  
  updateFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
    currentPage: 1,
  })),
  
  resetFilters: () => set({ filters: defaultFilters, currentPage: 1 }),
  
  resetStep: () => set({
    currentStep: 0,
    selectedCategory: null,
    selectedBoard: null,
    selectedClass: null,
    selectedStream: null,
  }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setSortBy: (sort) => set({ sortBy: sort }),
}));
