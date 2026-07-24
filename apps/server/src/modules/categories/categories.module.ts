import { categoriesRepository } from './categories.repository.js';
import { makeCreateCategoryUseCase } from './use-cases/create-category.use-case.js';
import { makeGetCategoriesUseCase } from './use-cases/get-categories.use-case.js';

const getCategoriesUseCase = makeGetCategoriesUseCase({
  categoriesRepository,
});

const createCategoryUseCase = makeCreateCategoryUseCase({
  categoriesRepository,
});

export { createCategoryUseCase, getCategoriesUseCase };
