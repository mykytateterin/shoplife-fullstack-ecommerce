import { UserRole as ContractUserRole } from '@shoplife/contracts';

import { UserRole as PrismaUserRole } from '../../infrastructure/database/prisma/generated/enums.js';

const prismaUserRoleToContractUserRole = {
  [PrismaUserRole.ADMIN]: ContractUserRole.ADMIN,
  [PrismaUserRole.MANAGER]: ContractUserRole.MANAGER,
  [PrismaUserRole.USER]: ContractUserRole.USER,
} satisfies Record<PrismaUserRole, ContractUserRole>;

export const toContractUserRole = (role: PrismaUserRole): ContractUserRole => {
  return prismaUserRoleToContractUserRole[role];
};
