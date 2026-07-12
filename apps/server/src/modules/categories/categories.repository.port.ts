import type { DomainCategory } from './categories.model.js';

type CategoriesRepository = {
  findAllPublished(): Promise<DomainCategory[]>;
};

export type { CategoriesRepository };
