import { Request, Response } from 'express';
import { usersService } from './users.service.js';

export const usersController = {
  signUp: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const createdUser = await usersService.signUp({ email, password });

    res.status(201).json({
      success: true,
      user: createdUser,
    });
  },
};
