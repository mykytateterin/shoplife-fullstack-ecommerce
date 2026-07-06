import * as jose from 'jose';
import { describe, expect, it } from 'vitest';

import { env } from '../../../config/env.js';
import { joseTokenService } from './jose-token.service.js';

const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

describe('joseTokenService', () => {
  it('verifies a token signed for a user id', async () => {
    const userId = 1;

    const token = await joseTokenService.signAuthToken(userId);

    await expect(joseTokenService.verifyAuthToken(token)).resolves.toEqual(userId);
  });

  it('returns null for an invalid token', async () => {
    const invalidToken = 'invalid-token';

    await expect(joseTokenService.verifyAuthToken(invalidToken)).resolves.toEqual(null);
  });

  it('returns null for a token without subject', async () => {
    const tokenWithoutSub = await new jose.SignJWT()
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);

    await expect(joseTokenService.verifyAuthToken(tokenWithoutSub)).resolves.toEqual(null);
  });

  it('returns null for a token with a non-numeric subject', async () => {
    const tokenWithNaNSub = await new jose.SignJWT()
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('tokenWithNaNSub')
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);

    await expect(joseTokenService.verifyAuthToken(tokenWithNaNSub)).resolves.toEqual(null);
  });

  it('returns null for a token with zero subject', async () => {
    const tokenWithZeroSub = await new jose.SignJWT()
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('0')
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);

    await expect(joseTokenService.verifyAuthToken(tokenWithZeroSub)).resolves.toEqual(null);
  });

  it('returns null for a token with a negative subject', async () => {
    const tokenWithNegativeSub = await new jose.SignJWT()
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('-5')
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);

    await expect(joseTokenService.verifyAuthToken(tokenWithNegativeSub)).resolves.toEqual(null);
  });

  it('returns null for a token with an unsafe integer subject', async () => {
    const tokenWithUnsafeSub = await new jose.SignJWT()
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('9007199254740995')
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);

    await expect(joseTokenService.verifyAuthToken(tokenWithUnsafeSub)).resolves.toEqual(null);
  });

  it('returns null for a token with a decimal subject', async () => {
    const tokenWithDecimalSub = await new jose.SignJWT()
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('3.14')
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(jwtSecret);

    await expect(joseTokenService.verifyAuthToken(tokenWithDecimalSub)).resolves.toEqual(null);
  });
});
