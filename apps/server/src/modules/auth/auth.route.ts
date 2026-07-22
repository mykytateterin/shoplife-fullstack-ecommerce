import { signInRequestSchema, signUpRequestSchema } from '@shoplife/contracts';
import { Router } from 'express';

import { createValidationMiddleware } from '../../core/middlewares/validation.middleware.js';
import { authController } from './auth.controller.js';
import { authMiddleware } from './auth.module.js';

const authRouter = Router();

authRouter.get('/me', authMiddleware, authController.getCurrentUser);

authRouter.post(
  '/sign-up',
  createValidationMiddleware({ body: signUpRequestSchema }),
  authController.signUp,
);
authRouter.post('/sign-out', authController.signOut);
authRouter.post(
  '/sign-in',
  createValidationMiddleware({ body: signInRequestSchema }),
  authController.signIn,
);

export { authRouter };
