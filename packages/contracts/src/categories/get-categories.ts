import type { ContractCategory } from './category.js';

type GetCategoriesResponse = {
  data: ContractCategory[];
  success: true;
};

export type { GetCategoriesResponse };
