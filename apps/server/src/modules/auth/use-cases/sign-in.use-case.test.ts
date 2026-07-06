import { describe, expect, it, vi } from 'vitest';

import { DomainUserRole } from '../../users/users.model.js';
import { makeSignInUseCase } from './sign-in.use-case.js';

const tokenService = {
  signAuthToken: vi.fn(),
  verifyAuthToken: vi.fn(),
};

const passwordService = {
  compare: vi.fn(),
  hash: vi.fn(),
};

const usersRepository = {
  findByEmailWithPassword: vi.fn(),
};

const signInUseCase = makeSignInUseCase({
  passwordService,
  tokenService,
  usersRepository,
});

const signInData = {
  email: 'user@example.com',
  password: 'input-password',
};

const foundUserWithPassword = {
  email: 'user@example.com',
  id: 1,
  passwordHash: 'hashed-password',
  role: DomainUserRole.USER,
};

const authToken = 'auth-token';

describe('makeSignInUseCase', () => {
  it('throws 401 when the user does not exist', async () => {
    usersRepository.findByEmailWithPassword.mockResolvedValue(null);

    await expect(signInUseCase(signInData)).rejects.toMatchObject({
      message: 'Invalid email or password',
      statusCode: 401,
    });
  });

  it('throws 401 when the user exists but the password is incorrect', async () => {
    usersRepository.findByEmailWithPassword.mockResolvedValue(foundUserWithPassword);
    passwordService.compare.mockResolvedValue(false);

    await expect(signInUseCase(signInData)).rejects.toMatchObject({
      message: 'Invalid email or password',
      statusCode: 401,
    });
  });

  it('does not compare passwords when the user does not exist', async () => {
    usersRepository.findByEmailWithPassword.mockResolvedValue(null);

    await expect(signInUseCase(signInData)).rejects.toMatchObject({
      message: 'Invalid email or password',
      statusCode: 401,
    });

    expect(passwordService.compare).not.toHaveBeenCalled();
  });

  it('does not sign an auth token when the password is incorrect', async () => {
    usersRepository.findByEmailWithPassword.mockResolvedValue(foundUserWithPassword);
    passwordService.compare.mockResolvedValue(false);

    await expect(signInUseCase(signInData)).rejects.toMatchObject({
      message: 'Invalid email or password',
      statusCode: 401,
    });

    expect(tokenService.signAuthToken).not.toHaveBeenCalled();
  });

  it('returns an object with a token when the user exists and the password is correct', async () => {
    usersRepository.findByEmailWithPassword.mockResolvedValue(foundUserWithPassword);
    passwordService.compare.mockResolvedValue(true);
    tokenService.signAuthToken.mockResolvedValue(authToken);

    await expect(signInUseCase(signInData)).resolves.toEqual({
      token: authToken,
    });
  });

  it('calls password service with the input password and stored password hash', async () => {
    usersRepository.findByEmailWithPassword.mockResolvedValue(foundUserWithPassword);
    passwordService.compare.mockResolvedValue(true);
    tokenService.signAuthToken.mockResolvedValue(authToken);

    await signInUseCase(signInData);

    expect(passwordService.compare).toHaveBeenCalledWith({
      password: signInData.password,
      passwordHash: foundUserWithPassword.passwordHash,
    });
  });

  it('signs an auth token for the found user', async () => {
    usersRepository.findByEmailWithPassword.mockResolvedValue(foundUserWithPassword);
    passwordService.compare.mockResolvedValue(true);
    tokenService.signAuthToken.mockResolvedValue(authToken);

    await signInUseCase(signInData);

    expect(tokenService.signAuthToken).toHaveBeenCalledWith(foundUserWithPassword.id);
  });
});
