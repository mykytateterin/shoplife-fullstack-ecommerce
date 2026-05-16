import { CategoriesSchema, type Categories } from '../../../types/domain';

export const setCategoriesStorage = (categories: Categories): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

export const getCategoriesStorage = (): Categories => {
  const categoriesStorageData = JSON.parse(localStorage.getItem('categories') || '{}');

  return CategoriesSchema.parse(categoriesStorageData);
};

export const deleteCategoriesStorage = (): void => localStorage.removeItem('categories');
