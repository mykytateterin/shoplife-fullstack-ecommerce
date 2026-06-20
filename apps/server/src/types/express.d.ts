import type { Request, Response } from 'express';

type TypedRequestBody<T> = Request<unknown, unknown, T>;
type TypedResponseBody<T> = Response<T>;

export type { TypedRequestBody, TypedResponseBody };
