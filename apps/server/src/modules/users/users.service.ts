import type { SignInInput, SignUpInput } from '@shoplife/shared';

import bcrypt from 'bcrypt';
import * as jose from 'jose';

import { AppException } from '../../core/exceptions/AppException.js';
import { type PublicUser, usersRepository } from './users.repository.js';

export const usersService = {
  signIn: async (data: SignInInput): Promise<{ token: string }> => {
    const foundUser = await usersRepository.findByEmailWithPassword(data.email);

    if (!foundUser) {
      throw new AppException(401, 'Invalid email or password');
    }

    const isSamePassword = await bcrypt.compare(data.password, foundUser.password);

    if (!isSamePassword) {
      throw new AppException(401, 'Invalid email or password');
    }

    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
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
  signUp: async (data: SignUpInput): Promise<PublicUser> => {
    const foundUser = await usersRepository.findByEmail(data.email);

    if (foundUser) {
      throw new AppException(409, 'Email is already in use');
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '12', 10);

    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const user = await usersRepository.create({
      email: data.email,
      passwordHash,
    });

    return {
      email: user.email,
      id: user.id,
      role: user.role,
    };
  },
};
