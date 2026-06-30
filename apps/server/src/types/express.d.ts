import type { Request, Response } from 'express';

type TypedRequest = Request;

type TypedRequestBody<TBody> = Request<unknown, unknown, TBody>;

type TypedRequestCookies<TCookies> = Omit<Request, 'cookies'> & {
  cookies: TCookies;
};

type TypedResponseBody<TBody> = Response<TBody>;

export type { TypedRequest, TypedRequestBody, TypedRequestCookies, TypedResponseBody };
