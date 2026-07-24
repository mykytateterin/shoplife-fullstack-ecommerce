import type { CategoriesRepository } from '../categories.repository.port.js';

import { AppException } from '../../../core/exceptions/AppException.js';

type CreateCategoryCategoriesRepository = Pick<
  CategoriesRepository,
  'create' | 'findById' | 'findBySlugAndParentId'
>;

type CreateCategoryData = {
  isPublished: boolean;
  name: string;
  parentId: number | null;
  position: number;
  slug: string;
};

type CreateCategoryUseCase = (data: CreateCategoryData) => Promise<void>;

type MakeCreateCategoryUseCaseDependencies = {
  categoriesRepository: CreateCategoryCategoriesRepository;
};

const makeCreateCategoryUseCase = (
  dependencies: MakeCreateCategoryUseCaseDependencies,
): CreateCategoryUseCase => {
  return async (data) => {
    const { isPublished, name, parentId, position, slug } = data;

    if (parentId !== null) {
      const foundParentCategory = await dependencies.categoriesRepository.findById(parentId);

      if (foundParentCategory === null) {
        throw new AppException(404, 'Parent category not found');
      }
    }

    const foundCategory = await dependencies.categoriesRepository.findBySlugAndParentId({
      parentId,
      slug,
    });

    if (foundCategory !== null) {
      throw new AppException(409, 'Category already exists');
    }

    await dependencies.categoriesRepository.create({
      isPublished,
      name,
      parentId,
      position,
      slug,
    });
  };
};

export { makeCreateCategoryUseCase };
