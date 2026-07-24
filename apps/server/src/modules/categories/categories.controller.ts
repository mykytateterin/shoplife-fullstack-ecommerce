import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  GetCategoriesResponse,
} from '@shoplife/contracts';

import type {
  TypedRequest,
  TypedRequestBody,
  TypedResponseBody,
} from '../../types/express.types.js';

import { toContractCategoryTree } from './categories.api.mapper.js';
import { createCategoryUseCase, getCategoriesUseCase } from './categories.module.js';

const categoriesController = {
  create: async (
    req: TypedRequestBody<CreateCategoryRequest>,
    res: TypedResponseBody<CreateCategoryResponse>,
  ): Promise<void> => {
    const { isPublished, name, parentId, position, slug } = req.body;

    await createCategoryUseCase({
      isPublished,
      name,
      parentId,
      position,
      slug,
    });

    res.status(201).json({
      success: true,
    });
  },
  getCategories: async (
    _req: TypedRequest,
    res: TypedResponseBody<GetCategoriesResponse>,
  ): Promise<void> => {
    const rootCategoryTreeNodes = await getCategoriesUseCase();

    res.status(200).json({
      data: toContractCategoryTree(rootCategoryTreeNodes),
      success: true,
    });
  },
};

export { categoriesController };
