import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.url({ error: 'VITE_API_URL is not a valid URL' }),
});

const env = envSchema.parse(import.meta.env);

export { env };
