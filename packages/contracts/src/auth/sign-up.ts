import { z } from 'zod';

import type { ContractUser } from '../users/public-user.js';

const signUpRequestSchema = z.object({
  email: z
    .email({
      message: 'Please enter a valid email address',
    })
    .trim()
    .max(255, {
      message: 'Email cannot exceed 255 characters',
    }),

  password: z
    .string({
      message: 'Password is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(24, {
      message: 'Password cannot exceed 24 characters',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number',
    }),
});

type SignUpRequest = z.infer<typeof signUpRequestSchema>;

type SignUpResponse = {
  data: ContractUser;
  success: true;
};

export { signUpRequestSchema };
export type { SignUpRequest, SignUpResponse };
