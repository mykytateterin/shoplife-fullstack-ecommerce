import type { DomainCategory } from './categories.model.js';
import type { PrismaCategory } from './categories.repository.js';

const toDomainCategory = (category: PrismaCategory): DomainCategory => ({
  id: category.id,
  isPublished: category.isPublished,
  name: category.name,
  parentId: category.parentId,
  position: category.position,
  slug: category.slug,
});

export { toDomainCategory };
