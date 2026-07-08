import z from 'zod';

export const CategorySchema = z.object({
  url: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export const CategoriesSchema = z.record(z.string(), CategorySchema);

export type Categories = z.infer<typeof CategoriesSchema>;
