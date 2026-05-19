import { AppException } from '../../core/exceptions/AppException.js';
import { Prisma } from '@shoplife/shared';
import { usersRepository } from './users.repository.js';

export const usersService = {
  signUp: async (data: Prisma.UserCreateInput) => {
    const existingUser = await usersRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppException(409, 'Email is already in use');
    }

    return usersRepository.create(data);
  },
};
