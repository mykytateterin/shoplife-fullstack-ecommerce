import { signInRequestSchema, signUpRequestSchema } from '@shoplife/contracts';
import { Router } from 'express';

import { validateRequest } from '../../core/middlewares/validate.middleware.js';
import { usersController } from './users.controller.js';

const router = Router();

router.post('/signup', validateRequest({ body: signUpRequestSchema }), usersController.signUp);
router.post('/signin', validateRequest({ body: signInRequestSchema }), usersController.signIn);

export const usersRouter = router;
