import bcrypt from 'bcrypt';

import type { PasswordService } from '../ports/password.service.port.js';

import { env } from '../../../config/env.js';

const bcryptPasswordService: PasswordService = {
  compare: async ({ password, passwordHash }) => {
    return bcrypt.compare(password, passwordHash);
  },
  hash: async (password) => {
    const saltRounds = env.SALT_ROUNDS;

    return bcrypt.hash(password, saltRounds);
  },
};

export { bcryptPasswordService };
