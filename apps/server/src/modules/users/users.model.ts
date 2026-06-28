const DomainUserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

type DomainUser = {
  email: string;
  id: number;
  role: DomainUserRole;
};

type DomainUserRole = (typeof DomainUserRole)[keyof typeof DomainUserRole];

type DomainUserWithPassword = DomainUser & {
  passwordHash: string;
};

export { DomainUserRole };
export type { DomainUser, DomainUserWithPassword };
