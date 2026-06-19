import { defineConfig } from 'prisma/config';

import { prismaEnv } from './prisma.env.js';

export default defineConfig({
  datasource: {
    url: prismaEnv.DATABASE_URL,
  },
  migrations: {
    path: 'src/infrastructure/database/prisma/migrations',
  },
  schema: 'src/infrastructure/database/prisma/schema.prisma',
});
