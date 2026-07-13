import type { DomainCategoryTreeNode } from '../categories.model.js';
import type { CategoriesRepository } from '../categories.repository.port.js';

type GetCategoriesCategoriesRepository = Pick<CategoriesRepository, 'findAllPublished'>;

type GetCategoriesResult = DomainCategoryTreeNode[];

type GetCategoriesUseCase = () => Promise<GetCategoriesResult>;

type MakeGetCategoriesUseCaseDependencies = {
  categoriesRepository: GetCategoriesCategoriesRepository;
};

const makeGetCategoriesUseCase = (
  dependencies: MakeGetCategoriesUseCaseDependencies,
): GetCategoriesUseCase => {
  return async () => {
    const categories = await dependencies.categoriesRepository.findAllPublished();

    const nodesById = new Map<number, DomainCategoryTreeNode>();

    categories.forEach((category) => {
      nodesById.set(category.id, {
        children: [],
        id: category.id,
        name: category.name,
        slug: category.slug,
      });
    });

    const rootCategoryTreeNodes: DomainCategoryTreeNode[] = [];

    for (const category of categories) {
      const currentNode = nodesById.get(category.id);

      if (!currentNode) {
        continue;
      }

      if (category.parentId === null) {
        rootCategoryTreeNodes.push(currentNode);
        continue;
      }

      const parentNode = nodesById.get(category.parentId);

      if (!parentNode) {
        continue;
      }

      parentNode.children.push(currentNode);
    }

    return rootCategoryTreeNodes;
  };
};

export { makeGetCategoriesUseCase };
