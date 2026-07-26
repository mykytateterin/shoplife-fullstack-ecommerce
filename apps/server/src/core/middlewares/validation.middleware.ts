import type { ValidationErrorDetail } from '@shoplife/contracts';
import type { NextFunction } from 'express';
import type { z } from 'zod';

import type { TypedRequest, TypedResponseBody } from '../../types/express.types.js';

import { ValidationException } from '../exceptions/ValidationException.js';

type RequestSchema = {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
};

const issuesToDetails = (issues: z.core.$ZodIssueBase[]): ValidationErrorDetail[] => {
  return issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
};

const createValidationMiddleware = (schema: RequestSchema) => {
  return (req: TypedRequest, _res: TypedResponseBody<unknown>, next: NextFunction): void => {
    if (schema.body) {
      const result = schema.body.safeParse(req.body);

      if (!result.success) {
        const details = issuesToDetails(result.error.issues);

        next(new ValidationException(details));
        return;
      }
      req.body = result.data;
    }

    if (schema.query) {
      const result = schema.query.safeParse(req.query);

      if (!result.success) {
        const details = issuesToDetails(result.error.issues);

        next(new ValidationException(details));
        return;
      }
    }

    if (schema.params) {
      const result = schema.params.safeParse(req.params);

      if (!result.success) {
        const details = issuesToDetails(result.error.issues);

        next(new ValidationException(details));
        return;
      }
    }

    next();
  };
};

export { createValidationMiddleware };
