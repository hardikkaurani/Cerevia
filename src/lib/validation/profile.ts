import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters long' })
    .max(100, { message: 'Full name cannot exceed 100 characters' })
    .optional(),
  avatar: z
    .string()
    .url({ message: 'Avatar must be a valid URL' })
    .optional()
    .or(z.literal(''))
    .or(z.null()),
  bio: z
    .string()
    .max(500, { message: 'Bio cannot exceed 500 characters' })
    .optional()
    .or(z.literal(''))
    .or(z.null()),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
