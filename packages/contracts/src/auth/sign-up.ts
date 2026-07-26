import { z } from 'zod';

import type { ContractUser } from '../users/user.js';

const signUpRequestSchema = z.object({
  email: z
    .email({
      error: 'Please enter a valid email address',
    })
    .trim()
    .max(255, {
      error: 'Email cannot exceed 255 characters',
    }),

  password: z
    .string({
      error: 'Password is required',
    })
    .min(8, {
      error: 'Password must be at least 8 characters long',
    })
    .max(24, {
      error: 'Password cannot exceed 24 characters',
    })
    .regex(/[A-Z]/, {
      error: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, {
      error: 'Password must contain at least one number',
    }),
});

type SignUpRequest = z.infer<typeof signUpRequestSchema>;

type SignUpResponse = {
  data: ContractUser;
  success: true;
};

export { signUpRequestSchema };
export type { SignUpRequest, SignUpResponse };
