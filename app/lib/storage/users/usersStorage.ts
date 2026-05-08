import type { Users } from '~/types/domain';

export const setUsersStorage = (users: Users): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUsersStorage = (): Users => JSON.parse(localStorage.getItem('users') || '{}');

export const deleteUsersStorage = (): void => localStorage.removeItem('users');