import type { ContractUser } from '@shoplife/contracts';

import { create } from 'zustand';

type AuthState = {
  clearUser: () => void;
  isSessionLoading: boolean;
  setIsSessionLoading: (nextIsSessionLoading: boolean) => void;
  setUser: (nextUser: ContractUser) => void;
  user: ContractUser | null;
};

const useAuthStore = create<AuthState>((set) => ({
  clearUser: () => {
    set({ user: null });
  },
  isSessionLoading: true,
  setIsSessionLoading: (nextIsSessionLoading) => {
    set({ isSessionLoading: nextIsSessionLoading });
  },
  setUser: (nextUser) => {
    set({ user: nextUser });
  },
  user: null,
}));

export { useAuthStore };
