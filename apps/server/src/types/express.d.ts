import type { Request, Response } from 'express';

type TypedRequest = Request;
type TypedRequestBody<T> = Request<unknown, unknown, T>;
type TypedResponseBody<T> = Response<T>;

export type { TypedRequest, TypedRequestBody, TypedResponseBody };
