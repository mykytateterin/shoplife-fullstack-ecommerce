import { usersRepository } from '../users/users.repository.js';
import { createAuthMiddleware } from './middlewares/auth.middleware.js';
import { bcryptPasswordService } from './services/bcrypt-password.service.js';
import { joseTokenService } from './services/jose-token.service.js';
import { makeSignInUseCase } from './use-cases/sign-in.use-case.js';
import { makeSignUpUseCase } from './use-cases/sign-up.use-case.js';

const authMiddleware = createAuthMiddleware({
  tokenService: joseTokenService,
  usersRepository,
});

const signInUseCase = makeSignInUseCase({
  passwordService: bcryptPasswordService,
  tokenService: joseTokenService,
  usersRepository,
});

const signUpUseCase = makeSignUpUseCase({
  passwordService: bcryptPasswordService,
  usersRepository,
});

export { authMiddleware, signInUseCase, signUpUseCase };
