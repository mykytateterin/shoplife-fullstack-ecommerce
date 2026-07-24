import { z } from 'zod';

const createCategoryRequestSchema = z.object({
  isPublished: z.boolean({ error: 'isPublished must be a boolean' }),
  name: z
    .string({
      error: 'name is required',
    })
    .trim()
    .min(2, {
      error: 'name must be at least 2 characters long',
    })
    .max(255, {
      error: 'name cannot exceed 255 characters',
    }),
  parentId: z
    .int({ error: 'parentId must be an integer' })
    .positive({ error: 'parentId must be a positive integer' })
    .nullable(),
  position: z
    .int({ error: 'position must be an integer' })
    .nonnegative({ error: 'position must be a non-negative integer' }),
  slug: z
    .string({
      error: 'slug is required',
    })
    .trim()
    .min(2, {
      error: 'slug must be at least 2 characters long',
    })
    .max(255, {
      error: 'slug cannot exceed 255 characters',
    }),
});

type CreateCategoryRequest = z.infer<typeof createCategoryRequestSchema>;

type CreateCategoryResponse = {
  success: true;
};

export { createCategoryRequestSchema };
export type { CreateCategoryRequest, CreateCategoryResponse };
