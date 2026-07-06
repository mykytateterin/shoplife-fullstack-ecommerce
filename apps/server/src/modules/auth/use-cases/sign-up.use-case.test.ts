import { describe, expect, it, vi } from 'vitest';

import { DomainUserRole } from '../../users/users.model.js';
import { makeSignUpUseCase } from './sign-up.use-case.js';

const passwordService = {
  compare: vi.fn(),
  hash: vi.fn(),
};

const usersRepository = {
  create: vi.fn(),
  findByEmail: vi.fn(),
};

const signUpUseCase = makeSignUpUseCase({
  passwordService,
  usersRepository,
});

const signUpData = {
  email: 'user@example.com',
  password: 'input-password',
};

const foundUser = {
  email: 'user@example.com',
  id: 1,
  role: DomainUserRole.USER,
};

const hashedPassword = 'hashed-password';

const createdUser = {
  email: 'user@example.com',
  id: 1,
  role: DomainUserRole.USER,
};

describe('makeSignUpUseCase', () => {
  it('throws 409 when the email is already in use', async () => {
    usersRepository.findByEmail.mockResolvedValue(foundUser);

    await expect(signUpUseCase(signUpData)).rejects.toMatchObject({
      message: 'Email is already in use',
      statusCode: 409,
    });
  });

  it('does not hash the password when the email is already in use', async () => {
    usersRepository.findByEmail.mockResolvedValue(foundUser);

    await expect(signUpUseCase(signUpData)).rejects.toMatchObject({
      message: 'Email is already in use',
      statusCode: 409,
    });

    expect(passwordService.hash).not.toHaveBeenCalled();
  });

  it('does not create a user when the email is already in use', async () => {
    usersRepository.findByEmail.mockResolvedValue(foundUser);

    await expect(signUpUseCase(signUpData)).rejects.toMatchObject({
      message: 'Email is already in use',
      statusCode: 409,
    });

    expect(usersRepository.create).not.toHaveBeenCalled();
  });

  it('returns the created user when the email is available', async () => {
    usersRepository.findByEmail.mockResolvedValue(null);
    passwordService.hash.mockResolvedValue(hashedPassword);
    usersRepository.create.mockResolvedValue(createdUser);

    await expect(signUpUseCase(signUpData)).resolves.toEqual(createdUser);
  });

  it('hashes the input password when the email is available', async () => {
    usersRepository.findByEmail.mockResolvedValue(null);
    passwordService.hash.mockResolvedValue(hashedPassword);
    usersRepository.create.mockResolvedValue(createdUser);

    await signUpUseCase(signUpData);

    expect(passwordService.hash).toHaveBeenCalledWith(signUpData.password);
  });

  it('creates a user with the email and hashed password', async () => {
    usersRepository.findByEmail.mockResolvedValue(null);
    passwordService.hash.mockResolvedValue(hashedPassword);
    usersRepository.create.mockResolvedValue(createdUser);

    await signUpUseCase(signUpData);

    expect(usersRepository.create).toHaveBeenCalledWith({
      email: signUpData.email,
      passwordHash: hashedPassword,
    });
  });
});
