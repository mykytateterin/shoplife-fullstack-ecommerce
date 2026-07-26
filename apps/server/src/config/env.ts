import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.url({ error: 'DATABASE_URL is not a valid URL' }),
  JWT_SECRET: z
    .string({ error: 'JWT_SECRET is not a valid string' })
    .min(32, { error: 'JWT_SECRET must be at least 32 characters long' }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'], { error: 'NODE_ENV is not a valid environment' })
    .default('development'),
  PORT: z.coerce
    .number({ error: 'PORT is not a valid number' })
    .int({ error: 'PORT must be an integer' })
    .positive({ error: 'PORT must be a positive integer' }),
  SALT_ROUNDS: z.coerce
    .number({ error: 'SALT_ROUNDS is not a valid number' })
    .int({ error: 'SALT_ROUNDS must be an integer' })
    .positive({ error: 'SALT_ROUNDS must be a positive integer' })
    .min(12, { error: 'SALT_ROUNDS must be at least 12' })
    .max(15, { error: 'SALT_ROUNDS must be at most 15' }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  const errorTree = z.treeifyError(_env.error);
  console.error(JSON.stringify(errorTree, null, 2));
  process.exit(1);
}

const env = _env.data;

export { env };
