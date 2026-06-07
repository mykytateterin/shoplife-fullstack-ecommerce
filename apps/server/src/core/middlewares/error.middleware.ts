import type { NextFunction, Request, Response } from 'express';

import { AppException } from '../exceptions/AppException.js';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(`[Error] ${req.method} ${req.url}: ${error.message}`);

  if (error instanceof AppException) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      ...(error.details !== undefined && { details: error.details }),
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
};
