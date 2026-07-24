import { createCategoryRequestSchema } from '@shoplife/contracts';
import { Router } from 'express';

import { createValidationMiddleware } from '../../core/middlewares/validation.middleware.js';
import { authMiddleware } from '../auth/auth.module.js';
import { createRoleMiddleware } from '../users/middlewares/role.middleware.js';
import { DomainUserRole } from '../users/users.model.js';
import { categoriesController } from './categories.controller.js';

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getCategories);

categoriesRouter.post(
  '/create',
  authMiddleware,
  createRoleMiddleware([DomainUserRole.ADMIN, DomainUserRole.MANAGER]),
  createValidationMiddleware({ body: createCategoryRequestSchema }),
  categoriesController.create,
);

export { categoriesRouter };
