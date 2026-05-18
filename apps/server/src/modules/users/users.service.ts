import { Prisma } from '../../infrastructure/database/prisma/generated/client.js';
import { usersRepository } from './users.repository.js';

export const usersService = {
  signUp: async (data: Prisma.UserCreateInput) => {
    const existingUser = await usersRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('Email is already in use');
    }

    return usersRepository.create(data);
  },
};
