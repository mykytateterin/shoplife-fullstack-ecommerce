import { type Categories, CategoriesSchema } from '../../../types/domain';

const deleteCategoriesStorage = (): void => {
  localStorage.removeItem('categories');
};

const getCategoriesStorage = (): Categories => {
  const categoriesStorageData: unknown = JSON.parse(localStorage.getItem('categories') ?? '{}');

  return CategoriesSchema.parse(categoriesStorageData);
};

const setCategoriesStorage = (categories: Categories): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

export { deleteCategoriesStorage, getCategoriesStorage, setCategoriesStorage };
