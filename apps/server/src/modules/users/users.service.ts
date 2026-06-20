import type { SignInRequest, SignUpRequest, UserRole } from '@shoplife/contracts';

import bcrypt from 'bcrypt';
import * as jose from 'jose';

import { env } from '../../config/env.js';
import { AppException } from '../../core/exceptions/AppException.js';
import { toContractUserRole } from './users.mapper.js';
import { usersRepository } from './users.repository.js';

type SignInResult = {
  token: string;
};

type SignUpResult = {
  email: string;
  id: number;
  role: UserRole;
};

export const usersService = {
  signIn: async (data: SignInRequest): Promise<SignInResult> => {
    const foundUser = await usersRepository.findByEmailWithPassword(data.email);

    if (!foundUser) {
      throw new AppException(401, 'Invalid email or password');
    }

    const isSamePassword = await bcrypt.compare(data.password, foundUser.password);

    if (!isSamePassword) {
      throw new AppException(401, 'Invalid email or password');
    }

    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);
    const token = await new jose.SignJWT({
      email: foundUser.email,
      role: foundUser.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(String(foundUser.id))
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);

    return {
      token,
    };
  },
  signUp: async (data: SignUpRequest): Promise<SignUpResult> => {
    const foundUser = await usersRepository.findByEmail(data.email);

    if (foundUser) {
      throw new AppException(409, 'Email is already in use');
    }

    const saltRounds = env.SALT_ROUNDS;

    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const user = await usersRepository.create({
      email: data.email,
      passwordHash,
    });

    return {
      email: user.email,
      id: user.id,
      role: toContractUserRole(user.role),
    };
  },
};
