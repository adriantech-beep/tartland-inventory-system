import { z } from "zod";

export const editUserSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  avatar: z
    .any()
    .refine((file) => {
      if (!file) return true;
      return file instanceof File && file.size <= 5 * 1024 * 1024;
    }, "Avatar must be an image under 5MB")
    .optional(),
});

export type EditUserForm = z.infer<typeof editUserSchema>;
