import type { Prisma } from '@shoplife/shared';

import { prisma } from '../../infrastructure/database/prisma/prisma.client.js';
import type { UserResponse } from './users.dto.js';

export const usersRepository = {
  create: async (data: Prisma.UserCreateInput): Promise<UserResponse> => {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
      },
    });
  },
  findByEmail: async (email: string): Promise<UserResponse | null> => {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
      },
    });
  },
};
