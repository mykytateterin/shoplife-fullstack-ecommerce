import type { SignInInput, SignUpInput } from '@shoplife/shared';
import type { Response } from 'express';

import type { TypedRequestBody } from '../../types/express.js';

import { usersService } from './users.service.js';

const isProduction = process.env.NODE_ENV === 'production';

export const usersController = {
  signIn: async (req: TypedRequestBody<SignInInput>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const { token } = await usersService.signIn({ email, password });

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
  signUp: async (req: TypedRequestBody<SignUpInput>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const createdUser = await usersService.signUp({ email, password });

    res.status(201).json({
      success: true,
      user: createdUser,
    });
  },
};
