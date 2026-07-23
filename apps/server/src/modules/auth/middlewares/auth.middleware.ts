import type { NextFunction } from 'express';

import type {
  TypedCookiesAuth,
  TypedRequestCookies,
  TypedResponse,
} from '../../../types/express.types.js';
import type { UsersRepository } from '../../users/users.repository.port.js';
import type { TokenService } from '../ports/token.service.port.js';

import { AppException } from '../../../core/exceptions/AppException.js';

type AuthMiddleware = (
  req: TypedRequestCookies<TypedCookiesAuth>,
  res: TypedResponse,
  next: NextFunction,
) => Promise<void>;

type CreateAuthMiddlewareTokenService = Pick<TokenService, 'verifyAuthToken'>;

type CreateAuthMiddlewareUsersRepository = Pick<UsersRepository, 'findById'>;

type CreateAuthMiddlewareDependencies = {
  tokenService: CreateAuthMiddlewareTokenService;
  usersRepository: CreateAuthMiddlewareUsersRepository;
};

const createAuthMiddleware = (dependencies: CreateAuthMiddlewareDependencies): AuthMiddleware => {
  return async (req, _res, next) => {
    const { token } = req.cookies;

    if (!token) {
      throw new AppException(401, 'Unauthorized');
    }

    const userId = await dependencies.tokenService.verifyAuthToken(token);

    if (!userId) {
      throw new AppException(401, 'Unauthorized');
    }

    const userData = await dependencies.usersRepository.findById(userId);

    if (!userData) {
      throw new AppException(401, 'Unauthorized');
    }

    req.user = userData;

    next();
  };
};

export { createAuthMiddleware };
