import { z } from "zod";

export const addProductSchema = z.object({
  rawMaterialDetails: z.object({
    id: z.string(),
    name: z.string(),
    perGrams: z.number(),
    perBox: z.number(),
  }),
  boxCount: z
    .string()
    .min(1, "Box count is required")
    .regex(/^\d+$/, "Must be a number"),
});

export type AddProductForm = z.infer<typeof addProductSchema>;
