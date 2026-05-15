import { UsersSchema, type Users } from '../../../types/domain';

export const setUsersStorage = (users: Users): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUsersStorage = (): Users => {
  const usersStorageData = JSON.parse(localStorage.getItem('users') || '{}');

  return UsersSchema.parse(usersStorageData);
}

export const deleteUsersStorage = (): void => localStorage.removeItem('users');
