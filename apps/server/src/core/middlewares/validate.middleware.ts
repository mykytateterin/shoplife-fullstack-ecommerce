import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

import { ZodException } from '../exceptions/ZodException.js';

type RequestSchema = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export const validateRequest = (schema: RequestSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
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
