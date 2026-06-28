import type { PrismaUser, PrismaUserWithPassword } from './users.repository.js';

import { UserRole as PrismaUserRole } from '../../infrastructure/database/prisma/generated/client.js';
import { type DomainUser, DomainUserRole, type DomainUserWithPassword } from './users.model.js';

const prismaUserRoleToDomainUserRole = {
  [PrismaUserRole.ADMIN]: DomainUserRole.ADMIN,
  [PrismaUserRole.MANAGER]: DomainUserRole.MANAGER,
  [PrismaUserRole.USER]: DomainUserRole.USER,
} satisfies Record<PrismaUserRole, DomainUserRole>;

const toDomainUserRole = (role: PrismaUserRole): DomainUserRole => {
  return prismaUserRoleToDomainUserRole[role];
};

const toUser = (user: PrismaUser): DomainUser => ({
  email: user.email,
  id: user.id,
  role: toDomainUserRole(user.role),
});

const toUserWithPassword = (user: PrismaUserWithPassword): DomainUserWithPassword => ({
  email: user.email,
  id: user.id,
  passwordHash: user.passwordHash,
  role: toDomainUserRole(user.role),
});

export { toUser, toUserWithPassword };
