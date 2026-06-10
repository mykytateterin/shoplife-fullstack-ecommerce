import type { Prisma } from '@shoplife/shared';

export type UserResponse = Prisma.UserGetPayload<{
  select: { id: true; email: true };
}>;
