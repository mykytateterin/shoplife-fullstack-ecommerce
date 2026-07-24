import type { NextFunction } from 'express';

import type { TypedRequestAuthUser, TypedResponse } from '../../../types/express.types.js';
import type { DomainUserRole } from '../users.model.js';

import { AppException } from '../../../core/exceptions/AppException.js';

type RoleMiddleware = (req: TypedRequestAuthUser, res: TypedResponse, next: NextFunction) => void;

const createRoleMiddleware = (allowedRoles: DomainUserRole[]): RoleMiddleware => {
  return (req, _res, next) => {
    if (!req.user) {
      throw new AppException(403, 'Forbidden');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppException(403, 'Forbidden');
    }

    next();
  };
};

export { createRoleMiddleware };
