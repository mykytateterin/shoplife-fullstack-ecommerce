import type { ContractUser } from '../users/public-user.js';

type GetCurrentUserResponse = {
  data: ContractUser;
  success: true;
};

export type { GetCurrentUserResponse };
