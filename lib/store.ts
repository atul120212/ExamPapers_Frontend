import { create } from 'zustand';

export interface PaperFilters {
  subjects: string[];
  boards: string[];
  classes: string[];
  years: string[];
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  filters: PaperFilters;
  currentPage: number;
  sortBy: 'recent' | 'popular' | 'views';
  
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
  updateFilters: (filters: Partial<PaperFilters>) => void;
  resetFilters: () => void;
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
  filters: defaultFilters,
  currentPage: 1,
  sortBy: 'recent',
  
  setUser: (user) => set({ user, isAuthenticated: user !== null }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  updateFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
    currentPage: 1,
  })),
  resetFilters: () => set({ filters: defaultFilters, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSortBy: (sort) => set({ sortBy: sort }),
}));
