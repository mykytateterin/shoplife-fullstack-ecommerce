import type { usersRepository } from '../../users/users.repository.js';
import type { PasswordService } from '../ports/password.service.port.js';
import type { TokenService } from '../ports/token.service.port.js';

import { AppException } from '../../../core/exceptions/AppException.js';

type MakeSignInUseCaseDependencies = {
  passwordService: PasswordService;
  tokenService: TokenService;
  usersRepository: SignInUsersRepository;
};

type SignInData = {
  email: string;
  password: string;
};

type SignInResult = {
  token: string;
};

type SignInUseCase = (data: SignInData) => Promise<SignInResult>;

type SignInUsersRepository = Pick<typeof usersRepository, 'findByEmailWithPassword'>;

const makeSignInUseCase = (dependencies: MakeSignInUseCaseDependencies): SignInUseCase => {
  return async (data) => {
    const foundUser = await dependencies.usersRepository.findByEmailWithPassword(data.email);

    if (!foundUser) {
      throw new AppException(401, 'Invalid email or password');
    }

    const isSamePassword = await dependencies.passwordService.compare({
      password: data.password,
      passwordHash: foundUser.passwordHash,
    });

    if (!isSamePassword) {
      throw new AppException(401, 'Invalid email or password');
    }

    const token = await dependencies.tokenService.signAuthToken(foundUser.id);

    return {
      token,
    };
  };
};

export { makeSignInUseCase };
