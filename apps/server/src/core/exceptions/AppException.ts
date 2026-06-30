class AppException extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppException };
