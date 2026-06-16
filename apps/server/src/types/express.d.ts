import type { Request } from 'express';

type TypedRequestBody<T> = Request<unknown, unknown, T>;

export type { TypedRequestBody };
