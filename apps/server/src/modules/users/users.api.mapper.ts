import { type ContractUser, ContractUserRole } from '@shoplife/contracts';

import { type DomainUser, DomainUserRole } from './users.model.js';

const domainUserRoleToContractUserRole = {
  [DomainUserRole.ADMIN]: ContractUserRole.ADMIN,
  [DomainUserRole.MANAGER]: ContractUserRole.MANAGER,
  [DomainUserRole.USER]: ContractUserRole.USER,
} satisfies Record<DomainUserRole, ContractUserRole>;

const toContractUserRole = (role: DomainUserRole): ContractUserRole => {
  return domainUserRoleToContractUserRole[role];
};

const toContractUser = (user: DomainUser): ContractUser => {
  return {
    email: user.email,
    id: user.id,
    role: toContractUserRole(user.role),
  };
};

export { toContractUser };
