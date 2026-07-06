import { describe, expect, it } from 'vitest';

import { bcryptPasswordService } from './bcrypt-password.service.js';

const plainPassword = 'password';

describe('bcryptPasswordService', () => {
  it('hashes a plain password', async () => {
    await expect(bcryptPasswordService.hash(plainPassword)).resolves.not.toEqual(plainPassword);
  });

  it('returns true when the password matches the hash', async () => {
    const passwordHash = await bcryptPasswordService.hash(plainPassword);

    await expect(
      bcryptPasswordService.compare({ password: plainPassword, passwordHash }),
    ).resolves.toEqual(true);
  });

  it('returns false when the password does not match the hash', async () => {
    const passwordHash = await bcryptPasswordService.hash(plainPassword);
    const wrongPassword = 'wrong-password';

    await expect(
      bcryptPasswordService.compare({
        password: wrongPassword,
        passwordHash,
      }),
    ).resolves.toEqual(false);
  });
});
