import type { ValidationErrorDetail } from '@shoplife/contracts';

import { AppException } from './AppException.js';

class ValidationException extends AppException {
  constructor(details: ValidationErrorDetail[]) {
    super(400, 'Validation failed', details);
  }
}

export { ValidationException };
