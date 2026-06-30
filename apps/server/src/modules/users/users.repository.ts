import type { Prisma } from '../../infrastructure/database/prisma/generated/client.js';
import type { DomainUser, DomainUserWithPassword } from './users.model.js';

import { prisma } from '../../infrastructure/database/prisma/prisma.client.js';
import { toUser, toUserWithPassword } from './users.repository.mapper.js';

const prismaUserSelect = {
  email: true,
  id: true,
  role: true,
} satisfies Prisma.UserSelect;

type PrismaUser = Prisma.UserGetPayload<{
  select: typeof prismaUserSelect;
}>;

const prismaUserWithPasswordSelect = {
  ...prismaUserSelect,
  passwordHash: true,
} satisfies Prisma.UserSelect;

type CreateUserData = {
  email: string;
  passwordHash: string;
};

type PrismaUserWithPassword = Prisma.UserGetPayload<{
  select: typeof prismaUserWithPasswordSelect;
}>;

const usersRepository = {
  create: async (data: CreateUserData): Promise<DomainUser> => {
    const createdUser = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
      },
      select: prismaUserSelect,
    });

    return toUser(createdUser);
  },
  findByEmail: async (email: string): Promise<DomainUser | null> => {
    const foundUser = await prisma.user.findUnique({
      select: prismaUserSelect,
      where: { email },
    });

    return foundUser ? toUser(foundUser) : null;
  },
  findByEmailWithPassword: async (email: string): Promise<DomainUserWithPassword | null> => {
    const foundUser = await prisma.user.findUnique({
      select: prismaUserWithPasswordSelect,
      where: { email },
    });

    return foundUser ? toUserWithPassword(foundUser) : null;
  },
  findById: async (id: number): Promise<DomainUser | null> => {
    const foundUser = await prisma.user.findUnique({
      select: prismaUserSelect,
      where: { id },
    });

    return foundUser ? toUser(foundUser) : null;
  },
};

export { usersRepository };
export type { PrismaUser, PrismaUserWithPassword };
