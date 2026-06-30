import { usersRepository } from '../users/users.repository.js';
import { bcryptPasswordService } from './services/bcrypt-password.service.js';
import { joseTokenService } from './services/jose-token.service.js';
import { makeGetCurrentUserUseCase } from './use-cases/get-current-user.use-case.js';
import { makeSignInUseCase } from './use-cases/sign-in.use-case.js';
import { makeSignUpUseCase } from './use-cases/sign-up.use-case.js';

const getCurrentUserUseCase = makeGetCurrentUserUseCase({
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

export { getCurrentUserUseCase, signInUseCase, signUpUseCase };
