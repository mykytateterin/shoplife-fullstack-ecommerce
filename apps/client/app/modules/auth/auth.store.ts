import type { ContractUser } from '@shoplife/contracts';

import { create } from 'zustand';

type AuthState = {
  clearUser(): void;
  isLoading: boolean;
  setIsLoading(nextIsLoading: boolean): void;
  setUser(nextUser: ContractUser): void;
  user: ContractUser | null;
};

const useAuthStore = create<AuthState>((set) => ({
  clearUser: () => {
    set({ user: null });
  },
  isLoading: false,
  setIsLoading: (nextIsLoading) => {
    set({ isLoading: nextIsLoading });
  },
  setUser: (nextUser) => {
    set({ user: nextUser });
  },
  user: null,
}));

export { useAuthStore };
