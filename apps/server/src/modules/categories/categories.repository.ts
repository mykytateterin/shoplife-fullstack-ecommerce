import type { Prisma } from '../../infrastructure/database/prisma/generated/client.js';
import type { CategoriesRepository } from './categories.repository.port.js';

import { prisma } from '../../infrastructure/database/prisma/prisma.client.js';
import { toDomainCategory } from './categories.repository.mapper.js';

const prismaCategorySelect = {
  id: true,
  isPublished: true,
  name: true,
  parentId: true,
  position: true,
  slug: true,
} satisfies Prisma.CategorySelect;

type PrismaCategory = Prisma.CategoryGetPayload<{
  select: typeof prismaCategorySelect;
}>;

const categoriesRepository: CategoriesRepository = {
  findAllPublished: async () => {
    const publishedCategories = await prisma.category.findMany({
      orderBy: [{ parentId: 'asc' }, { position: 'asc' }, { id: 'asc' }],
      select: prismaCategorySelect,
      where: { isPublished: true },
    });

    return publishedCategories.map(toDomainCategory);
  },
};

export { categoriesRepository };
export type { PrismaCategory };
