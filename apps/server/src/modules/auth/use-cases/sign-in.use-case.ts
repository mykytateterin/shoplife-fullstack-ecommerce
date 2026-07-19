import type { UsersRepository } from '../../users/users.repository.port.js';
import type { PasswordService } from '../ports/password.service.port.js';
import type { TokenService } from '../ports/token.service.port.js';

import { AppException } from '../../../core/exceptions/AppException.js';

type SignInUseCasePasswordService = Pick<PasswordService, 'compare'>;

type SignInUseCaseTokenService = Pick<TokenService, 'signAuthToken'>;

type SignInUseCaseUsersRepository = Pick<UsersRepository, 'findByEmailWithPassword'>;

type MakeSignInUseCaseDependencies = {
  passwordService: SignInUseCasePasswordService;
  tokenService: SignInUseCaseTokenService;
  usersRepository: SignInUseCaseUsersRepository;
};

type SignInData = {
  email: string;
  password: string;
};

type SignInResult = {
  token: string;
};

type SignInUseCase = (data: SignInData) => Promise<SignInResult>;

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
