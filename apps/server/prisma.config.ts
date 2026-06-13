import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: 'src/infrastructure/database/prisma/migrations',
  },
  schema: 'src/infrastructure/database/prisma/schema.prisma',
});
