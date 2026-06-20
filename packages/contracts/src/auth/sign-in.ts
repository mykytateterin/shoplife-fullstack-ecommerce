import { z } from 'zod';

const signInRequestSchema = z.object({
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
    .max(72, {
      message: 'Password cannot exceed 72 characters',
    }),
});

type SignInRequest = z.infer<typeof signInRequestSchema>;

type SignInResponse = {
  success: true;
};

export { signInRequestSchema };
export type { SignInRequest, SignInResponse };
