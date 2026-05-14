import type { Categories } from '~/types/domain';

export const setCategoriesStorage = (categories: Categories): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

export const getCategoriesStorage = (): Categories =>
  JSON.parse(localStorage.getItem('categories') || '{}');

export const deleteCategoriesStorage = (): void =>
  localStorage.removeItem('categories');
