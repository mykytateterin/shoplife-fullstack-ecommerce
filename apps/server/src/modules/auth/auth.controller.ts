import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@shoplife/contracts';
import type { Response } from 'express';

import type { TypedRequestBody } from '../../types/express.js';

import { env } from '../../config/env.js';
import { authService } from './auth.service.js';

const isProduction = env.NODE_ENV === 'production';

export const authController = {
  signIn: async (req: TypedRequestBody<SignInRequest>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const { token } = await authService.signIn({ email, password });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: isProduction,
    });

    const response: SignInResponse = {
      success: true,
    };

    res.status(200).json(response);
  },
  signUp: async (req: TypedRequestBody<SignUpRequest>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const createdUser = await authService.signUp({ email, password });

    const response: SignUpResponse = {
      data: createdUser,
      success: true,
    };

    res.status(201).json(response);
  },
};
