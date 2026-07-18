import { categoriesRepository } from './categories.repository.js';
import { makeGetCategoriesUseCase } from './use-cases/get-categories.use-case.js';

const getCategoriesUseCase = makeGetCategoriesUseCase({
  categoriesRepository,
});

export { getCategoriesUseCase };
