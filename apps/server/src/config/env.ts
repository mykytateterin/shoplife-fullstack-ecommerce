import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive(),
  SALT_ROUNDS: z.coerce.number().int().positive().min(12).max(15),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  const errorTree = z.treeifyError(_env.error);
  console.error(JSON.stringify(errorTree, null, 2));
  process.exit(1);
}

export const env = _env.data;
