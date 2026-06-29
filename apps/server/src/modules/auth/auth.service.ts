import type { DomainUser } from '../users/users.model.js';

import { AppException } from '../../core/exceptions/AppException.js';
import { usersRepository } from '../users/users.repository.js';
import { bcryptPasswordHasher } from './services/bcrypt-password-hasher.service.js';
import { joseTokenService } from './services/jose-token.service.js';

type SignInData = {
  email: string;
  password: string;
};

type SignInResult = {
  token: string;
};

type SignUpData = {
  email: string;
  password: string;
};

type SignUpResult = DomainUser;

export const authService = {
  signIn: async (data: SignInData): Promise<SignInResult> => {
    const foundUser = await usersRepository.findByEmailWithPassword(data.email);

    if (!foundUser) {
      throw new AppException(401, 'Invalid email or password');
    }

    const isSamePassword = await bcryptPasswordHasher.compare({
      password: data.password,
      passwordHash: foundUser.passwordHash,
    });

    if (!isSamePassword) {
      throw new AppException(401, 'Invalid email or password');
    }

    const token = await joseTokenService.signAuthToken({
      email: foundUser.email,
      id: foundUser.id,
      role: foundUser.role,
    });

    return {
      token,
    };
  },
  signUp: async (data: SignUpData): Promise<SignUpResult> => {
    const foundUser = await usersRepository.findByEmail(data.email);

    if (foundUser) {
      throw new AppException(409, 'Email is already in use');
    }

    const passwordHash = await bcryptPasswordHasher.hash(data.password);

    const user = await usersRepository.create({
      email: data.email,
      passwordHash,
    });

    return user;
  },
};
