import type { DomainUser } from '../../users/users.model.js';
import type { UsersRepository } from '../../users/users.repository.port.js';
import type { PasswordService } from '../ports/password.service.port.js';

import { AppException } from '../../../core/exceptions/AppException.js';

type MakeSignUpUseCaseDependencies = {
  passwordService: SignUpUseCasePasswordService;
  usersRepository: SignUpUseCaseUsersRepository;
};

type SignUpData = {
  email: string;
  password: string;
};

type SignUpResult = DomainUser;

type SignUpUseCase = (data: SignUpData) => Promise<SignUpResult>;

type SignUpUseCasePasswordService = Pick<PasswordService, 'hash'>;

type SignUpUseCaseUsersRepository = Pick<UsersRepository, 'create' | 'findByEmail'>;

const makeSignUpUseCase = (dependencies: MakeSignUpUseCaseDependencies): SignUpUseCase => {
  return async (data) => {
    const foundUser = await dependencies.usersRepository.findByEmail(data.email);

    if (foundUser) {
      throw new AppException(409, 'Email is already in use');
    }

    const passwordHash = await dependencies.passwordService.hash(data.password);

    const user = await dependencies.usersRepository.create({
      email: data.email,
      passwordHash,
    });

    return user;
  };
};

export { makeSignUpUseCase };
