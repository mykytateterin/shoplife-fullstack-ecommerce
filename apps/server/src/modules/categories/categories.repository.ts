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
  create: async (data) => {
    const { isPublished, name, parentId, position, slug } = data;

    const createdCategory = await prisma.category.create({
      data: {
        isPublished,
        name,
        parentId,
        position,
        slug,
      },
      select: prismaCategorySelect,
    });

    return toDomainCategory(createdCategory);
  },
  findAllPublished: async () => {
    const publishedCategories = await prisma.category.findMany({
      orderBy: [{ parentId: 'asc' }, { position: 'asc' }, { id: 'asc' }],
      select: prismaCategorySelect,
      where: { isPublished: true },
    });

    return publishedCategories.map(toDomainCategory);
  },
  findById: async (id) => {
    const foundCategory = await prisma.category.findUnique({
      select: prismaCategorySelect,
      where: {
        id,
      },
    });

    return foundCategory ? toDomainCategory(foundCategory) : null;
  },
  findBySlugAndParentId: async (data) => {
    const { parentId, slug } = data;

    if (parentId === null) {
      const foundCategory = await prisma.category.findUnique({
        select: prismaCategorySelect,
        where: { slug },
      });

      return foundCategory ? toDomainCategory(foundCategory) : null;
    }

    const foundCategory = await prisma.category.findUnique({
      select: prismaCategorySelect,
      where: {
        parentId_slug: { parentId, slug },
      },
    });

    return foundCategory ? toDomainCategory(foundCategory) : null;
  },
};

export { categoriesRepository };
export type { PrismaCategory };
