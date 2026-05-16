import { create } from 'zustand';
import { getAuthCookies } from '../lib/storage/cookies/authCookies';
import { getUsersStorage } from '../lib/storage/users/usersStorage';
import type { UserState } from '../types/store';

export const useUserStore = create<UserState>((set) => ({
  isLogged: null,
  loginCheck: () => {
    const { login, token } = getAuthCookies();
    const users = getUsersStorage();

    if (login && token) {
      const userToken = users?.[login]?.token;

      set({ isLogged: userToken === token });
    }

    set({ isLogged: false });
  },
  generateToken: () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < 16; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }

    return token;
  },
}));
