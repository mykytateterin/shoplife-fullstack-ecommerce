import type { $ZodIssueBase } from 'zod/v4/core';

import { AppException } from './AppException.js';

export class ZodException extends AppException {
  constructor(issues: $ZodIssueBase[]) {
    const details = issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    super(400, 'Validation failed', details);
  }
}
