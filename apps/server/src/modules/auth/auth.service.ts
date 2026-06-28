import bcrypt from 'bcrypt';
import * as jose from 'jose';

import type { DomainUser } from '../users/users.model.js';

import { env } from '../../config/env.js';
import { AppException } from '../../core/exceptions/AppException.js';
import { usersRepository } from '../users/users.repository.js';

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

    const isSamePassword = await bcrypt.compare(data.password, foundUser.passwordHash);

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
  signUp: async (data: SignUpData): Promise<SignUpResult> => {
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

    return user;
  },
};
