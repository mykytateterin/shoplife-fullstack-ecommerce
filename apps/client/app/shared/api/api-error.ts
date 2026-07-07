import type { ApiErrorResponse } from '@shoplife/contracts';

class ApiError extends Error {
  readonly response: ApiErrorResponse;
  readonly status: number;

  constructor(status: number, response: ApiErrorResponse) {
    super(response.error);

    this.name = 'ApiError';
    this.status = status;
    this.response = response;

    Object.setPrototypeOf(this, new.target.prototype);

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
