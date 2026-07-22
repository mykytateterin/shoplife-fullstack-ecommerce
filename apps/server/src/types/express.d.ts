import type { Request, Response } from 'express';

import type { DomainUser } from '../modules/users/users.model.js';

type TypedCookiesAuth = {
  token?: string;
};

type TypedRequest = Request;

type TypedRequestBody<TBody> = Request<unknown, unknown, TBody>;

type TypedRequestCookies<TCookies> = Omit<Request, 'cookies'> & {
  cookies: TCookies;
};

type TypedRequestAuthUser = TypedRequestCookies<TypedCookiesAuth> & {
  user?: DomainUser;
};

type TypedResponse = Response;

type TypedResponseBody<TBody> = Response<TBody>;

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user?: DomainUser;
    }
  }
}

export type {
  TypedCookiesAuth,
  TypedRequest,
  TypedRequestAuthUser,
  TypedRequestBody,
  TypedRequestCookies,
  TypedResponse,
  TypedResponseBody,
};
