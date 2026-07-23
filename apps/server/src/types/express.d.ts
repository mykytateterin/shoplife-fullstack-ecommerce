import type { DomainUser } from '../modules/users/users.model.js';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user?: DomainUser;
    }
  }
}
