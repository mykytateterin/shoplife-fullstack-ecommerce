import bcrypt from 'bcrypt';

import type { PasswordHasher } from '../ports/password-hasher.port.js';

import { env } from '../../../config/env.js';

const bcryptPasswordHasher: PasswordHasher = {
  compare: async ({ password, passwordHash }) => {
    return bcrypt.compare(password, passwordHash);
  },
  hash: async (password) => {
    const saltRounds = env.SALT_ROUNDS;

    return bcrypt.hash(password, saltRounds);
  },
};

export { bcryptPasswordHasher };
