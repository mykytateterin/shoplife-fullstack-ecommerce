import type { ContractCategory } from '@shoplife/contracts';

import type { DomainCategoryTreeNode } from './categories.model.js';

const toContractCategory = (
  category: DomainCategoryTreeNode,
  parentPath: string,
): ContractCategory => {
  const path = `${parentPath}/${category.slug}`;

  return {
    children: category.children.map((child) => toContractCategory(child, path)),
    id: category.id,
    name: category.name,
    path,
    slug: category.slug,
  };
};

const toContractCategoryTree = (categoryTree: DomainCategoryTreeNode[]): ContractCategory[] => {
  return categoryTree.map((category) => toContractCategory(category, ''));
};

export { toContractCategoryTree };
