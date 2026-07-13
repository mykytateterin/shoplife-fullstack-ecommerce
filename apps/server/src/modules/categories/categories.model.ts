type DomainCategory = {
  id: number;
  isPublished: boolean;
  name: string;
  parentId: null | number;
  position: number;
  slug: string;
};

type DomainCategoryTreeNode = {
  children: DomainCategoryTreeNode[];
  id: number;
  name: string;
  slug: string;
};

export type { DomainCategory, DomainCategoryTreeNode };
