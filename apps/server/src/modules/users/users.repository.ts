import type { Prisma } from '../../infrastructure/database/prisma/generated/client.js';

import { prisma } from '../../infrastructure/database/prisma/prisma.client.js';

const publicUserSelect = {
  email: true,
  id: true,
  role: true,
} satisfies Prisma.UserSelect;

type PublicUserRecord = Prisma.UserGetPayload<{
  select: typeof publicUserSelect;
}>;

const authUserSelect = {
  email: true,
  id: true,
  passwordHash: true,
  role: true,
} satisfies Prisma.UserSelect;

type AuthUserRecord = Prisma.UserGetPayload<{
  select: typeof authUserSelect;
}>;

type CreateUserData = {
  email: string;
  passwordHash: string;
};

export const usersRepository = {
  create: async (data: CreateUserData): Promise<PublicUserRecord> => {
    return prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
      },
      select: publicUserSelect,
    });
  },
  findByEmail: async (email: string): Promise<null | PublicUserRecord> => {
    return prisma.user.findUnique({
      select: publicUserSelect,
      where: { email },
    });
  },
  findByEmailWithPassword: async (email: string): Promise<AuthUserRecord | null> => {
    return prisma.user.findUnique({
      select: authUserSelect,
      where: { email },
    });
  },
};

export type { PublicUserRecord };
