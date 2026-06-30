import * as jose from 'jose';

import type { TokenService } from '../ports/token.service.port.js';

import { env } from '../../../config/env.js';

const joseTokenService: TokenService = {
  signAuthToken: async (userId) => {
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    return new jose.SignJWT()
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(String(userId))
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);
  },
  verifyAuthToken: async (token: string) => {
    try {
      const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);
      const { payload } = await jose.jwtVerify(token, jwtSecret);

      if (!payload.sub) {
        return null;
      }

      const userId = Number(payload.sub);
      const isValidUserId = Number.isSafeInteger(userId) && userId > 0;

      if (!isValidUserId) {
        return null;
      }

      return userId;
    } catch {
      return null;
    }
  },
};

export { joseTokenService };
