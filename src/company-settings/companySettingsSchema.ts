import { z } from "zod";

export const companySettingsSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .optional(),
  avatar: z
    .any()
    .refine((file) => {
      if (!file) return true;
      return file instanceof File && file.size <= 5 * 1024 * 1024;
    }, "Avatar must be an image under 5MB")
    .optional(),
});

export type CompanySettingsForm = z.infer<typeof companySettingsSchema>;
