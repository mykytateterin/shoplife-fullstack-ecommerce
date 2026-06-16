import type { SignUpInput } from '@shoplife/shared';

import type { Prisma } from '../../infrastructure/database/prisma/generated/client.js';

import { prisma } from '../../infrastructure/database/prisma/prisma.client.js';

const publicUserSelect = {
  email: true,
  id: true,
  role: true,
} satisfies Prisma.UserSelect;

type PublicUser = Prisma.UserGetPayload<{
  select: typeof publicUserSelect;
}>;

const authUserSelect = {
  email: true,
  id: true,
  password: true,
  role: true,
} satisfies Prisma.UserSelect;

type AuthUser = Prisma.UserGetPayload<{
  select: typeof authUserSelect;
}>;

export const usersRepository = {
  create: async (data: SignUpInput): Promise<PublicUser> => {
    return prisma.user.create({
      data,
      select: publicUserSelect,
    });
  },
  findByEmail: async (email: string): Promise<null | PublicUser> => {
    return prisma.user.findUnique({
      select: publicUserSelect,
      where: { email },
    });
  },
  findByEmailWithPassword: async (email: string): Promise<AuthUser | null> => {
    return prisma.user.findUnique({
      select: authUserSelect,
      where: { email },
    });
  },
};

export type { PublicUser };
