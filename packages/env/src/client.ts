import { z } from "zod";
export const frontendEnv = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  
}).parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

