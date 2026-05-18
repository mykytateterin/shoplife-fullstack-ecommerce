import { Prisma } from '../../infrastructure/database/prisma/generated/client.js';
import { prisma } from '../../infrastructure/database/prisma/prisma.client.js';

export const usersRepository = {
  create: async (data: Prisma.UserCreateInput) => {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
      },
    });
  },
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
      },
    });
  },
};
