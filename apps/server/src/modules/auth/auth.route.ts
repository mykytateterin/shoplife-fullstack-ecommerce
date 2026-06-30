import { signInRequestSchema, signUpRequestSchema } from '@shoplife/contracts';
import { Router } from 'express';

import { validateRequest } from '../../core/middlewares/validate.middleware.js';
import { authController } from './auth.controller.js';

const authRouter = Router();

authRouter.get('/me', authController.getCurrentUser);

authRouter.post('/sign-up', validateRequest({ body: signUpRequestSchema }), authController.signUp);
authRouter.post('/sign-in', validateRequest({ body: signInRequestSchema }), authController.signIn);

export { authRouter };
