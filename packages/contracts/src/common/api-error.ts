type ApiErrorResponse<TDetails = unknown> = {
  details?: TDetails;
  error: string;
  success: false;
};

export type { ApiErrorResponse };
