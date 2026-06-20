import type { UserRole } from './user-role.js';

export type PublicUser = {
  email: string;
  id: number;
  role: UserRole;
};
