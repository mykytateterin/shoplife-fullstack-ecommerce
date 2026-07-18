import type { ContractCategory } from '@shoplife/contracts';

import { create } from 'zustand';

type CategoriesState = {
  areCategoriesLoading: boolean;
  categories: ContractCategory[];
  clearCategories: () => void;
  setAreCategoriesLoading: (nextAreCategoriesLoading: boolean) => void;
  setCategories: (nextCategories: ContractCategory[]) => void;
};

const useCategoriesStore = create<CategoriesState>((set) => ({
  areCategoriesLoading: true,
  categories: [],
  clearCategories: () => {
    set({ categories: [] });
  },
  setAreCategoriesLoading: (nextAreCategoriesLoading) => {
    set({ areCategoriesLoading: nextAreCategoriesLoading });
  },
  setCategories: (nextCategories) => {
    set({ categories: nextCategories });
  },
}));

export { useCategoriesStore };
