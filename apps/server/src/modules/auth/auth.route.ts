import { signInRequestSchema, signUpRequestSchema } from '@shoplife/contracts';
import { Router } from 'express';

import { validateRequest } from '../../core/middlewares/validate.middleware.js';
import { authController } from './auth.controller.js';

const router = Router();

router.post('/sign-up', validateRequest({ body: signUpRequestSchema }), authController.signUp);
router.post('/sign-in', validateRequest({ body: signInRequestSchema }), authController.signIn);

export const authRouter = router;
