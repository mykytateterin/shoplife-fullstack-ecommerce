import { Router } from 'express';
import { usersController } from './users.controller.js';

const router = Router();

router.post('/signup', usersController.signUp);

export const usersRouter = router;
