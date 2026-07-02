import type {
  GetCurrentUserResponse,
  SignInRequest,
  SignInResponse,
  SignOutResponse,
  SignUpRequest,
  SignUpResponse,
} from '@shoplife/contracts';

import type {
  TypedRequest,
  TypedRequestBody,
  TypedRequestCookies,
  TypedResponseBody,
} from '../../types/express.js';

import { env } from '../../config/env.js';
import { AppException } from '../../core/exceptions/AppException.js';
import { toContractUser } from '../users/users.api.mapper.js';
import { getCurrentUserUseCase, signInUseCase, signUpUseCase } from './auth.module.js';

const isProduction = env.NODE_ENV === 'production';

type AuthCookies = {
  token?: string;
};

const authController = {
  getCurrentUser: async (
    req: TypedRequestCookies<AuthCookies>,
    res: TypedResponseBody<GetCurrentUserResponse>,
  ): Promise<void> => {
    const { token } = req.cookies;

    if (!token) {
      throw new AppException(401, 'Unauthorized');
    }

    const userData = await getCurrentUserUseCase({ token });

    res.status(200).json({
      data: toContractUser(userData),
      success: true,
    });
  },
  signIn: async (
    req: TypedRequestBody<SignInRequest>,
    res: TypedResponseBody<SignInResponse>,
  ): Promise<void> => {
    const { email, password } = req.body;

    const { token } = await signInUseCase({ email, password });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: isProduction,
    });

    res.status(200).json({
      success: true,
    });
  },
  signOut: (_req: TypedRequest, res: TypedResponseBody<SignOutResponse>): void => {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: isProduction,
    });

    res.status(200).json({
      success: true,
    });
  },
  signUp: async (
    req: TypedRequestBody<SignUpRequest>,
    res: TypedResponseBody<SignUpResponse>,
  ): Promise<void> => {
    const { email, password } = req.body;

    const createdUser = await signUpUseCase({ email, password });

    res.status(201).json({
      data: toContractUser(createdUser),
      success: true,
    });
  },
};

export { authController };
