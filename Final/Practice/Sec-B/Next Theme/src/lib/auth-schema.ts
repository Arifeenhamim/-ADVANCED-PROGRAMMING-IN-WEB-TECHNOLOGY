import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Enter your university email or employee ID.")
    .refine(
      (value) => !value.includes("@") || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Enter a valid email address or employee ID.",
    ),
  password: z.string().min(1, "Enter your password."),
});

export const authSessionSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  tokenType: z.literal("Bearer"),
  expiresIn: z.number().positive(),
  refreshTokenExpiresAt: z.string().min(1),
  sessionId: z.string().min(1),
  user: z.object({
    id: z.string(),
    email: z.string().optional(),
    name: z.string().optional(),
    roles: z.array(z.string()),
    permissions: z.array(z.string()),
    rolePermissions: z.record(z.string(), z.array(z.string())).optional(),
  }),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type AuthSession = z.infer<typeof authSessionSchema>;
