import type { GetCategoriesResponse } from '@shoplife/contracts';

import type { TypedRequest, TypedResponseBody } from '../../types/express.js';

import { toContractCategoryTree } from './categories.api.mapper.js';
import { getCategoriesUseCase } from './categories.module.js';

const categoriesController = {
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
