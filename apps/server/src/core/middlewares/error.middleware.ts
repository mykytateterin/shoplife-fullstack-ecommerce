import type { ApiErrorResponse } from '@shoplife/contracts';
import type { NextFunction } from 'express';

import type { TypedRequest, TypedResponseBody } from '../../types/express.js';

import { AppException } from '../exceptions/AppException.js';

export const errorMiddleware = (
  error: Error,
  req: TypedRequest,
  res: TypedResponseBody<ApiErrorResponse>,
  _next: NextFunction,
): void => {
  console.error(`[Error] ${req.method} ${req.url}: ${error.message}`);

  if (error instanceof AppException) {
    res.status(error.statusCode).json({
      error: error.message,
      success: false,
      ...(error.details !== undefined && { details: error.details }),
    });
    return;
  }

  res.status(500).json({
    error: 'Internal Server Error',
    success: false,
  });
};
