import type { DomainCategory } from './categories.model.js';

type CreateData = {
  isPublished: boolean;
  name: string;
  parentId: number | null;
  position: number;
  slug: string;
};

type FindBySlugAndParentIdData = {
  parentId: number | null;
  slug: string;
};

type CategoriesRepository = {
  create(data: CreateData): Promise<DomainCategory>;
  findAllPublished(): Promise<DomainCategory[]>;
  findById(id: number): Promise<DomainCategory | null>;
  findBySlugAndParentId(data: FindBySlugAndParentIdData): Promise<DomainCategory | null>;
};

export type { CategoriesRepository };
