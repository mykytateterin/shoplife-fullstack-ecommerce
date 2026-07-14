import { describe, expect, it, vi } from 'vitest';

import { makeGetCategoriesUseCase } from './get-categories.use-case.js';

const categoriesRepository = {
  findAllPublished: vi.fn(),
};

const getCategoriesUseCase = makeGetCategoriesUseCase({
  categoriesRepository,
});

// --- Level 0 (Root categories) ---

const men = {
  id: 954,
  isPublished: true,
  name: 'Men',
  parentId: null,
  position: 0,
  slug: 'men',
};

const women = {
  id: 412,
  isPublished: true,
  name: 'Women',
  parentId: null,
  position: 1,
  slug: 'women',
};

const kids = {
  id: 88,
  isPublished: true,
  name: 'Kids',
  parentId: null,
  position: 2,
  slug: 'kids',
};

// --- Level 1 (Children of root categories) ---

const womenShoes = {
  id: 1205,
  isPublished: true,
  name: 'Shoes',
  parentId: 412,
  position: 0,
  slug: 'shoes',
};

const womenClothing = {
  id: 74,
  isPublished: true,
  name: 'Clothing',
  parentId: 412,
  position: 1,
  slug: 'clothing',
};

const menShoes = {
  id: 3102,
  isPublished: true,
  name: 'Shoes',
  parentId: 954,
  position: 0,
  slug: 'shoes',
};

const menClothing = {
  id: 512,
  isPublished: true,
  name: 'Clothing',
  parentId: 954,
  position: 1,
  slug: 'clothing',
};

// --- Level 2 (Grandchildren) ---

const menSneakers = {
  id: 8,
  isPublished: true,
  name: 'Sneakers',
  parentId: 3102,
  position: 0,
  slug: 'sneakers',
};

const menBoots = {
  id: 499,
  isPublished: true,
  name: 'Boots',
  parentId: 3102,
  position: 1,
  slug: 'boots',
};

const womenSneakers = {
  id: 1932,
  isPublished: true,
  name: 'Sneakers',
  parentId: 1205,
  position: 0,
  slug: 'sneakers',
};

const womenHeels = {
  id: 34,
  isPublished: true,
  name: 'Heels',
  parentId: 1205,
  position: 1,
  slug: 'heels',
};

const menShirts = {
  id: 555,
  isPublished: true,
  name: 'Shirts',
  parentId: 512,
  position: 0,
  slug: 'shirts',
};

const menSuits = {
  id: 76,
  isPublished: true,
  name: 'Suits',
  parentId: 512,
  position: 1,
  slug: 'suits',
};

const womenDresses = {
  id: 1201,
  isPublished: true,
  name: 'Dresses',
  parentId: 74,
  position: 0,
  slug: 'dresses',
};

const womenSkirts = {
  id: 321,
  isPublished: true,
  name: 'Skirts',
  parentId: 74,
  position: 1,
  slug: 'skirts',
};

// --- Level 3 (Great-grandchildren) ---

const womenRunningSneakers = {
  id: 45,
  isPublished: true,
  name: 'Running',
  parentId: 1932,
  position: 0,
  slug: 'running',
};

const womenPlatformSneakers = {
  id: 2901,
  isPublished: true,
  name: 'Platform',
  parentId: 1932,
  position: 1,
  slug: 'platform',
};

const menRunningSneakers = {
  id: 112,
  isPublished: true,
  name: 'Running',
  parentId: 8,
  position: 0,
  slug: 'running',
};

const menCasualSneakers = {
  id: 19,
  isPublished: true,
  name: 'Casual',
  parentId: 8,
  position: 1,
  slug: 'casual',
};

const womenEveningDresses = {
  id: 850,
  isPublished: true,
  name: 'Evening',
  parentId: 1201,
  position: 0,
  slug: 'evening',
};

const womenSummerDresses = {
  id: 3,
  isPublished: true,
  name: 'Summer',
  parentId: 1201,
  position: 1,
  slug: 'summer',
};

const menCasualShirts = {
  id: 1140,
  isPublished: true,
  name: 'Casual',
  parentId: 555,
  position: 0,
  slug: 'casual',
};

const menClassicShirts = {
  id: 602,
  isPublished: true,
  name: 'Classic',
  parentId: 555,
  position: 1,
  slug: 'classic',
};

const womenStilettos = {
  id: 789,
  isPublished: true,
  name: 'Stilettos',
  parentId: 34,
  position: 0,
  slug: 'stilettos',
};

const womenPumps = {
  id: 14,
  isPublished: true,
  name: 'Pumps',
  parentId: 34,
  position: 1,
  slug: 'pumps',
};

const womenMaxiSkirts = {
  id: 999,
  isPublished: true,
  name: 'Maxi',
  parentId: 321,
  position: 0,
  slug: 'maxi',
};

const womenPencilSkirts = {
  id: 51,
  isPublished: true,
  name: 'Pencil',
  parentId: 321,
  position: 1,
  slug: 'pencil',
};

const menBusinessSuits = {
  id: 345,
  isPublished: true,
  name: 'Business',
  parentId: 76,
  position: 0,
  slug: 'business',
};

const menTuxedos = {
  id: 22,
  isPublished: true,
  name: 'Tuxedos',
  parentId: 76,
  position: 1,
  slug: 'tuxedos',
};

const menWinterBoots = {
  id: 871,
  isPublished: true,
  name: 'Winter',
  parentId: 499,
  position: 0,
  slug: 'winter',
};

const menChelseaBoots = {
  id: 113,
  isPublished: true,
  name: 'Chelsea',
  parentId: 499,
  position: 1,
  slug: 'chelsea',
};

describe('makeGetCategoriesUseCase', () => {
  it('returns an empty tree when no published categories exist', async () => {
    categoriesRepository.findAllPublished.mockResolvedValue([]);

    await expect(getCategoriesUseCase()).resolves.toEqual([]);
  });

  it('omits an orphaned category branch when its root ancestor is missing', async () => {
    const publishedCategories = [menShoes, menSneakers];

    categoriesRepository.findAllPublished.mockResolvedValue(publishedCategories);

    await expect(getCategoriesUseCase()).resolves.toEqual([]);
  });

  it('returns published root categories', async () => {
    const publishedCategories = [men, women, kids];

    const rootCategoryTreeNodes = [
      {
        children: [],
        id: men.id,
        name: men.name,
        slug: men.slug,
      },
      {
        children: [],
        id: women.id,
        name: women.name,
        slug: women.slug,
      },
      {
        children: [],
        id: kids.id,
        name: kids.name,
        slug: kids.slug,
      },
    ];

    categoriesRepository.findAllPublished.mockResolvedValue(publishedCategories);

    await expect(getCategoriesUseCase()).resolves.toEqual(rootCategoryTreeNodes);
  });

  it('builds a category tree with multiple nesting levels', async () => {
    const publishedCategories = [
      menRunningSneakers,
      menCasualSneakers,
      womenStilettos,
      womenPumps,
      womenDresses,
      womenSkirts,
      menBusinessSuits,
      menTuxedos,
      womenMaxiSkirts,
      womenPencilSkirts,
      womenShoes,
      womenClothing,
      menWinterBoots,
      menChelseaBoots,
      menShirts,
      menSuits,
      menCasualShirts,
      menClassicShirts,
      menShoes,
      menClothing,
      womenEveningDresses,
      womenSummerDresses,
      womenSneakers,
      womenHeels,
      womenRunningSneakers,
      womenPlatformSneakers,
      menSneakers,
      menBoots,
      men,
      women,
    ];

    const rootCategoryTreeNodes = [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    id: menRunningSneakers.id,
                    name: menRunningSneakers.name,
                    slug: menRunningSneakers.slug,
                  },
                  {
                    children: [],
                    id: menCasualSneakers.id,
                    name: menCasualSneakers.name,
                    slug: menCasualSneakers.slug,
                  },
                ],
                id: menSneakers.id,
                name: menSneakers.name,
                slug: menSneakers.slug,
              },
              {
                children: [
                  {
                    children: [],
                    id: menWinterBoots.id,
                    name: menWinterBoots.name,
                    slug: menWinterBoots.slug,
                  },
                  {
                    children: [],
                    id: menChelseaBoots.id,
                    name: menChelseaBoots.name,
                    slug: menChelseaBoots.slug,
                  },
                ],
                id: menBoots.id,
                name: menBoots.name,
                slug: menBoots.slug,
              },
            ],
            id: menShoes.id,
            name: menShoes.name,
            slug: menShoes.slug,
          },
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    id: menCasualShirts.id,
                    name: menCasualShirts.name,
                    slug: menCasualShirts.slug,
                  },
                  {
                    children: [],
                    id: menClassicShirts.id,
                    name: menClassicShirts.name,
                    slug: menClassicShirts.slug,
                  },
                ],
                id: menShirts.id,
                name: menShirts.name,
                slug: menShirts.slug,
              },
              {
                children: [
                  {
                    children: [],
                    id: menBusinessSuits.id,
                    name: menBusinessSuits.name,
                    slug: menBusinessSuits.slug,
                  },
                  { children: [], id: menTuxedos.id, name: menTuxedos.name, slug: menTuxedos.slug },
                ],
                id: menSuits.id,
                name: menSuits.name,
                slug: menSuits.slug,
              },
            ],
            id: menClothing.id,
            name: menClothing.name,
            slug: menClothing.slug,
          },
        ],
        id: men.id,
        name: men.name,
        slug: men.slug,
      },
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    id: womenRunningSneakers.id,
                    name: womenRunningSneakers.name,
                    slug: womenRunningSneakers.slug,
                  },
                  {
                    children: [],
                    id: womenPlatformSneakers.id,
                    name: womenPlatformSneakers.name,
                    slug: womenPlatformSneakers.slug,
                  },
                ],
                id: womenSneakers.id,
                name: womenSneakers.name,
                slug: womenSneakers.slug,
              },
              {
                children: [
                  {
                    children: [],
                    id: womenStilettos.id,
                    name: womenStilettos.name,
                    slug: womenStilettos.slug,
                  },
                  { children: [], id: womenPumps.id, name: womenPumps.name, slug: womenPumps.slug },
                ],
                id: womenHeels.id,
                name: womenHeels.name,
                slug: womenHeels.slug,
              },
            ],
            id: womenShoes.id,
            name: womenShoes.name,
            slug: womenShoes.slug,
          },
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    id: womenEveningDresses.id,
                    name: womenEveningDresses.name,
                    slug: womenEveningDresses.slug,
                  },
                  {
                    children: [],
                    id: womenSummerDresses.id,
                    name: womenSummerDresses.name,
                    slug: womenSummerDresses.slug,
                  },
                ],
                id: womenDresses.id,
                name: womenDresses.name,
                slug: womenDresses.slug,
              },
              {
                children: [
                  {
                    children: [],
                    id: womenMaxiSkirts.id,
                    name: womenMaxiSkirts.name,
                    slug: womenMaxiSkirts.slug,
                  },
                  {
                    children: [],
                    id: womenPencilSkirts.id,
                    name: womenPencilSkirts.name,
                    slug: womenPencilSkirts.slug,
                  },
                ],
                id: womenSkirts.id,
                name: womenSkirts.name,
                slug: womenSkirts.slug,
              },
            ],
            id: womenClothing.id,
            name: womenClothing.name,
            slug: womenClothing.slug,
          },
        ],
        id: women.id,
        name: women.name,
        slug: women.slug,
      },
    ];

    categoriesRepository.findAllPublished.mockResolvedValue(publishedCategories);

    await expect(getCategoriesUseCase()).resolves.toEqual(rootCategoryTreeNodes);
  });

  it('preserves repository order for root and sibling categories', async () => {
    const publishedCategories = [womenShoes, womenClothing, menShoes, menClothing, men, women];

    categoriesRepository.findAllPublished.mockResolvedValue(publishedCategories);

    const result = await getCategoriesUseCase();

    expect(result.map((category) => category.id)).toEqual([men.id, women.id]);

    expect(result[0]?.children.map((category) => category.id)).toEqual([
      menShoes.id,
      menClothing.id,
    ]);

    expect(result[1]?.children.map((category) => category.id)).toEqual([
      womenShoes.id,
      womenClothing.id,
    ]);
  });
});
