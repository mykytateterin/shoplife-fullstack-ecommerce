import { create } from 'zustand';
import Cookies from 'js-cookie';
import { getUsersStorage } from '~/lib/storage/users/usersStorage';

export const useUserStore = create((set) => ({
  isLogged: null,
  loginCheck: () => {
    const login = Cookies.get('login');
    const token = Cookies.get('token');
    const users = getUsersStorage();

    if (login && token) {
      const userToken = users?.[login]?.token;

      return set({ isLogged: userToken === token });
    }

    return set({ isLogged: false });
  },
  generateToken: () => {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < 16; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }

    return token;
  },
}));
