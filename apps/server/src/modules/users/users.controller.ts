import { Request, Response } from 'express';
import { usersService } from './users.service.js';

export const usersController = {
  signUp: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const createdUser = await usersService.signUp({ email, password });

      res.status(201).json({
        success: true,
        user: createdUser,
      });
    } catch (error: unknown) {
      console.error('Registration controller error:', error);

      const isEmailConflict = error instanceof Error && error.message === 'Email is already in use';

      if (isEmailConflict) {
        res.status(409).json({
          success: false,
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  },
};
