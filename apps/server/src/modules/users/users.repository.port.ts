import type { DomainUser, DomainUserWithPassword } from './users.model.js';

type CreateData = {
  email: string;
  passwordHash: string;
};

type UsersRepository = {
  create(data: CreateData): Promise<DomainUser>;
  findByEmail(email: string): Promise<DomainUser | null>;
  findByEmailWithPassword(email: string): Promise<DomainUserWithPassword | null>;
  findById(id: number): Promise<DomainUser | null>;
};

export type { UsersRepository };
