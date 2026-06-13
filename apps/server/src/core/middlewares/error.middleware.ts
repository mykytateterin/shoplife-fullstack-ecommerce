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
