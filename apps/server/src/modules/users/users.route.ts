import { signUpSchema } from '@shoplife/shared';
import { Router } from 'express';

import { validateRequest } from '../../core/middlewares/validate.middleware.js';
import { usersController } from './users.controller.js';

const router = Router();

router.post('/signup', validateRequest({ body: signUpSchema }), usersController.signUp);

export const usersRouter = router;
