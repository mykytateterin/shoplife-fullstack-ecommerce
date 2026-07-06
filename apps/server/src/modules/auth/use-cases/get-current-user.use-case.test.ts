import { describe, expect, it, vi } from 'vitest';

import { DomainUserRole } from '../../users/users.model.js';
import { makeGetCurrentUserUseCase } from './get-current-user.use-case.js';

const tokenService = {
  signAuthToken: vi.fn(),
  verifyAuthToken: vi.fn(),
};

const usersRepository = {
  findById: vi.fn(),
};

const getCurrentUserUseCase = makeGetCurrentUserUseCase({
  tokenService,
  usersRepository,
});

const getCurrentUserData = {
  token: 'auth-token',
};

const userId = 1;

const foundUser = {
  email: 'user@example.com',
  id: userId,
  role: DomainUserRole.USER,
};

describe('makeGetCurrentUserUseCase', () => {
  it('throws 401 when the token is invalid', async () => {
    tokenService.verifyAuthToken.mockResolvedValue(null);

    await expect(getCurrentUserUseCase(getCurrentUserData)).rejects.toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('throws 401 when the token is valid but the user does not exist', async () => {
    tokenService.verifyAuthToken.mockResolvedValue(userId);
    usersRepository.findById.mockResolvedValue(null);

    await expect(getCurrentUserUseCase(getCurrentUserData)).rejects.toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('does not find a user when the token is invalid', async () => {
    tokenService.verifyAuthToken.mockResolvedValue(null);

    await expect(getCurrentUserUseCase(getCurrentUserData)).rejects.toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });

    expect(usersRepository.findById).not.toHaveBeenCalled();
  });

  it('returns the found user when the token is valid', async () => {
    tokenService.verifyAuthToken.mockResolvedValue(userId);
    usersRepository.findById.mockResolvedValue(foundUser);

    await expect(getCurrentUserUseCase(getCurrentUserData)).resolves.toEqual(foundUser);
  });

  it('finds a user by the id from the token', async () => {
    tokenService.verifyAuthToken.mockResolvedValue(userId);
    usersRepository.findById.mockResolvedValue(foundUser);

    await getCurrentUserUseCase(getCurrentUserData);

    expect(usersRepository.findById).toHaveBeenCalledWith(userId);
  });
});
