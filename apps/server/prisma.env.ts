import 'dotenv/config';
import { z } from 'zod';

const prismaEnvSchema = z.object({
  DATABASE_URL: z.url({ error: 'DATABASE_URL is not a valid URL' }),
});

const _prismaEnv = prismaEnvSchema.safeParse(process.env);

if (!_prismaEnv.success) {
  const errorTree = z.treeifyError(_prismaEnv.error);
  console.error(JSON.stringify(errorTree, null, 2));
  process.exit(1);
}

const prismaEnv = _prismaEnv.data;

export { prismaEnv };
