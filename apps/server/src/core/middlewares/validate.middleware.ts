import type { NextFunction } from 'express';
import type { ZodType } from 'zod';

import type { TypedRequest, TypedResponseBody } from '../../types/express.js';

import { ZodException } from '../exceptions/ZodException.js';

type RequestSchema = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

const validateRequest = (schema: RequestSchema) => {
  return (req: TypedRequest, _res: TypedResponseBody<unknown>, next: NextFunction): void => {
    if (schema.body) {
      const result = schema.body.safeParse(req.body);
      if (!result.success) {
        next(new ZodException(result.error.issues));
        return;
      }
      req.body = result.data;
    }

    if (schema.query) {
      const result = schema.query.safeParse(req.query);
      if (!result.success) {
        next(new ZodException(result.error.issues));
        return;
      }
    }

    if (schema.params) {
      const result = schema.params.safeParse(req.params);
      if (!result.success) {
        next(new ZodException(result.error.issues));
        return;
      }
    }

    next();
  };
};

export { validateRequest };
