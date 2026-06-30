import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

import { env } from '../../../config/env.js';
import { PrismaClient } from './generated/client.js';

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export { prisma };
