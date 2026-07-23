import type { NextFunction } from 'express';

import { describe, expect, it, vi } from 'vitest';

import type {
  TypedCookiesAuth,
  TypedRequestCookies,
  TypedResponse,
} from '../../../types/express.types.js';

import { DomainUserRole } from '../../users/users.model.js';
import { createAuthMiddleware } from './auth.middleware.js';

const tokenService = {
  verifyAuthToken: vi.fn(),
};

const usersRepository = {
  findById: vi.fn(),
};

const authMiddleware = createAuthMiddleware({
  tokenService,
  usersRepository,
});

const next = vi.fn() as NextFunction;
const res = {} as TypedResponse;

const userId = 1;

const foundUser = {
  email: 'user@example.com',
  id: userId,
  role: DomainUserRole.USER,
};

describe('createAuthMiddleware', () => {
  it('throws 401 when the token cookie is missing', async () => {
    const req = { cookies: {} } as TypedRequestCookies<TypedCookiesAuth>;

    await expect(authMiddleware(req, res, next)).rejects.toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('throws 401 when the token is invalid', async () => {
    const req = { cookies: { token: 'invalid-token' } } as TypedRequestCookies<TypedCookiesAuth>;
    tokenService.verifyAuthToken.mockResolvedValue(null);

    await expect(authMiddleware(req, res, next)).rejects.toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('throws 401 when the token is valid but the user does not exist', async () => {
    const req = { cookies: { token: 'valid-token' } } as TypedRequestCookies<TypedCookiesAuth>;
    tokenService.verifyAuthToken.mockResolvedValue(userId);
    usersRepository.findById.mockResolvedValue(null);

    await expect(authMiddleware(req, res, next)).rejects.toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('does not find a user when the token is invalid', async () => {
    const req = { cookies: { token: 'invalid-token' } } as TypedRequestCookies<TypedCookiesAuth>;
    tokenService.verifyAuthToken.mockResolvedValue(null);

    await expect(authMiddleware(req, res, next)).rejects.toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });

    expect(usersRepository.findById).not.toHaveBeenCalled();
  });

  it('attaches user to req and calls next when the token is valid', async () => {
    const req = { cookies: { token: 'valid-token' } } as TypedRequestCookies<TypedCookiesAuth>;
    tokenService.verifyAuthToken.mockResolvedValue(userId);
    usersRepository.findById.mockResolvedValue(foundUser);

    await authMiddleware(req, res, next);

    expect(req.user).toEqual(foundUser);
    expect(next).toHaveBeenCalled();
  });

  it('finds a user by the id from the token', async () => {
    const req = { cookies: { token: 'valid-token' } } as TypedRequestCookies<TypedCookiesAuth>;
    tokenService.verifyAuthToken.mockResolvedValue(userId);
    usersRepository.findById.mockResolvedValue(foundUser);

    await authMiddleware(req, res, next);

    expect(usersRepository.findById).toHaveBeenCalledWith(userId);
  });
});
