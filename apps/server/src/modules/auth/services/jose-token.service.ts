import * as jose from 'jose';

import type { TokenService } from '../ports/token-service.port.js';

import { env } from '../../../config/env.js';

const joseTokenService: TokenService = {
  signAuthToken: async ({ email, id, role }) => {
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    return new jose.SignJWT({
      email,
      role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(String(id))
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);
  },
};

export { joseTokenService };
