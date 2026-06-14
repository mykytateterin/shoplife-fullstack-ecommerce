import type { Prisma } from '../../infrastructure/database/prisma/generated/client.js';
import type { UserResponse } from './users.dto.js';

import { prisma } from '../../infrastructure/database/prisma/prisma.client.js';

export const usersRepository = {
  create: async (data: Prisma.UserCreateInput): Promise<UserResponse> => {
    return prisma.user.create({
      data,
      select: {
        email: true,
        id: true,
      },
    });
  },
  findByEmail: async (email: string): Promise<null | UserResponse> => {
    return prisma.user.findUnique({
      select: {
        email: true,
        id: true,
      },
      where: { email },
    });
  },
};
