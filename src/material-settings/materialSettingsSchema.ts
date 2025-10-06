import { z } from "zod";

export const materialSettingsSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Material name is required"),
  perBox: z.number().positive("Must be greater than zero"),
  perGrams: z.number().positive("Must be greater than zero"),
  rawMaterialCategory: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
});

export type MaterialSettingsForm = z.infer<typeof materialSettingsSchema>;
