import type { DomainUserRole } from '../../users/users.model.js';

type SignAuthTokenData = {
  email: string;
  id: number;
  role: DomainUserRole;
};

type TokenService = {
  signAuthToken(data: SignAuthTokenData): Promise<string>;
};

export type { TokenService };
