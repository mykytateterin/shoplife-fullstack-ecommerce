import type { SignUpInput } from '@shoplife/shared';

import bcrypt from 'bcrypt';

import type { UserResponse } from './users.dto.js';

import { AppException } from '../../core/exceptions/AppException.js';
import { usersRepository } from './users.repository.js';

export const usersService = {
  signUp: async (data: SignUpInput): Promise<UserResponse> => {
    const existingUser = await usersRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppException(409, 'Email is already in use');
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '12', 10);

    const hash = await bcrypt.hash(data.password, saltRounds);

    const userDataWithHashedPassword = {
      ...data,
      password: hash,
    };

    return usersRepository.create(userDataWithHashedPassword);
  },
};
