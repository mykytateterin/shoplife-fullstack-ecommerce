import type { Prisma } from '../../infrastructure/database/prisma/generated/client.js';

export type UserResponse = Prisma.UserGetPayload<{
  select: { email: true; id: true };
}>;
