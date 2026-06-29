import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@shoplife/contracts';

import type { TypedRequestBody, TypedResponseBody } from '../../types/express.js';

import { env } from '../../config/env.js';
import { toPublicUser } from '../users/users.api.mapper.js';
import { signInUseCase, signUpUseCase } from './auth.module.js';

const isProduction = env.NODE_ENV === 'production';

export const authController = {
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
  signUp: async (
    req: TypedRequestBody<SignUpRequest>,
    res: TypedResponseBody<SignUpResponse>,
  ): Promise<void> => {
    const { email, password } = req.body;

    const createdUser = await signUpUseCase({ email, password });

    res.status(201).json({
      data: toPublicUser(createdUser),
      success: true,
    });
  },
};
