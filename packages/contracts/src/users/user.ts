import type { ContractUserRole } from './user-role.js';

type ContractUser = {
  email: string;
  id: number;
  role: ContractUserRole;
};

export type { ContractUser };
