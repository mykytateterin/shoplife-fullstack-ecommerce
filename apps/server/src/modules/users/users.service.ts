import type { Prisma } from '@shoplife/shared';

import { AppException } from '../../core/exceptions/AppException.js';
import type { UserResponse } from './users.dto.js';
import { usersRepository } from './users.repository.js';

export const usersService = {
  signUp: async (data: Prisma.UserCreateInput): Promise<UserResponse> => {
    const existingUser = await usersRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppException(409, 'Email is already in use');
    }

    return usersRepository.create(data);
  },
};
