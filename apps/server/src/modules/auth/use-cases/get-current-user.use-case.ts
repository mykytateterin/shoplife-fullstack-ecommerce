import type { DomainUser } from '../../users/users.model.js';
import type { usersRepository } from '../../users/users.repository.js';
import type { TokenService } from '../ports/token.service.port.js';

import { AppException } from '../../../core/exceptions/AppException.js';

type GetCurrentUserData = {
  token: string;
};

type GetCurrentUserResult = DomainUser;

type GetCurrentUserUseCase = (data: GetCurrentUserData) => Promise<GetCurrentUserResult>;

type GetCurrentUserUsersRepository = Pick<typeof usersRepository, 'findById'>;

type MakeGetCurrentUserUseCaseDependencies = {
  tokenService: TokenService;
  usersRepository: GetCurrentUserUsersRepository;
};

const makeGetCurrentUserUseCase = (
  dependencies: MakeGetCurrentUserUseCaseDependencies,
): GetCurrentUserUseCase => {
  return async (data) => {
    const userId = await dependencies.tokenService.verifyAuthToken(data.token);

    if (!userId) {
      throw new AppException(401, 'Unauthorized');
    }

    const userData = await dependencies.usersRepository.findById(userId);

    if (!userData) {
      throw new AppException(401, 'Unauthorized');
    }

    return userData;
  };
};

export { makeGetCurrentUserUseCase };
