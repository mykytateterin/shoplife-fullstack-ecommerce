import type { GetCategoriesResponse } from '@shoplife/contracts';

import { request } from '../../shared/api/http-client';

const categoriesApi = {
  getCategories: (): Promise<GetCategoriesResponse> => {
    return request<GetCategoriesResponse>('/categories');
  },
};

export { categoriesApi };
