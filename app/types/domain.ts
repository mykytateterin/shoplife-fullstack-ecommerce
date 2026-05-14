import z from 'zod';

export const UserSchema = z.object({
  password: z.string(),
  token: z.string(),
  isAdmin: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

export const UsersSchema = z.record(z.string(), UserSchema);

export type Users = z.infer<typeof UsersSchema>;

export const CategorySchema = z.object({
  url: z.string()
});

export type Category = z.infer<typeof CategorySchema>;

export const CategoriesSchema = z.record(z.string(), CategorySchema);

export type Categories = z.infer<typeof CategoriesSchema>;
