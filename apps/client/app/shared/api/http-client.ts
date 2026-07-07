import type { ApiErrorResponse } from '@shoplife/contracts';

import { env } from '../../config/env';
import { ApiError } from './api-error';

const API_URL = env.VITE_API_URL;

const request = async <TResponse>(path: string, options?: RequestInit): Promise<TResponse> => {
  const headers = new Headers(options?.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorResponse = (await response.json()) as ApiErrorResponse;
    throw new ApiError(response.status, errorResponse);
  }

  const data = (await response.json()) as TResponse;

  return data;
};

export { request };
