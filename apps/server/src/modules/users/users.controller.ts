import type { SignUpInput } from '@shoplife/shared';
import type { Response } from 'express';

import type { TypedRequestBody } from '../../types/express.js';
import { usersService } from './users.service.js';

export const usersController = {
  signUp: async (req: TypedRequestBody<SignUpInput>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const createdUser = await usersService.signUp({ email, password });

    res.status(201).json({
      success: true,
      user: createdUser,
    });
  },
};
