import 'dotenv/config';
import { z } from 'zod';

const prismaEnvSchema = z.object({
  DATABASE_URL: z.url(),
});

const _prismaEnv = prismaEnvSchema.safeParse(process.env);

if (!_prismaEnv.success) {
  const errorTree = z.treeifyError(_prismaEnv.error);
  console.error(JSON.stringify(errorTree, null, 2));
  process.exit(1);
}

export const prismaEnv = _prismaEnv.data;
