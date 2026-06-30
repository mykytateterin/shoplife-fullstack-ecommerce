import type { ContractUser } from '../users/user.js';

type GetCurrentUserResponse = {
  data: ContractUser;
  success: true;
};

export type { GetCurrentUserResponse };
