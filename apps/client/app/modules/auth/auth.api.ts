import type {
  GetCurrentUserResponse,
  SignInRequest,
  SignInResponse,
  SignOutResponse,
  SignUpRequest,
  SignUpResponse,
} from '@shoplife/contracts';

import { request } from '../../shared/api/http-client';

const authApi = {
  getCurrentUser: (): Promise<GetCurrentUserResponse> => {
    return request<GetCurrentUserResponse>('/auth/me');
  },
  signIn: (data: SignInRequest): Promise<SignInResponse> => {
    return request<SignInResponse>('/auth/sign-in', {
      body: JSON.stringify(data),
      method: 'POST',
    });
  },
  signOut: (): Promise<SignOutResponse> => {
    return request<SignOutResponse>('/auth/sign-out', {
      method: 'POST',
    });
  },
  signUp: (data: SignUpRequest): Promise<SignUpResponse> => {
    return request<SignUpResponse>('/auth/sign-up', {
      body: JSON.stringify(data),
      method: 'POST',
    });
  },
};

export { authApi };
