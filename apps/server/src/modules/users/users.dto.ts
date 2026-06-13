import type { Prisma } from '@shoplife/shared';

export type UserResponse = Prisma.UserGetPayload<{
  select: { email: true; id: true };
}>;
