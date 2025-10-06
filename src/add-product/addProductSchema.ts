import { z } from "zod";

export const addProductSchema = z.object({
  rawMaterialDetails: z.object({
    id: z.string(),
    name: z.string().min(1, "Product name is required"),
    perGrams: z.number().positive("Must be greater than zero"),
    perBox: z.number().positive("Must be greater than zero"),
  }),
  boxCount: z
    .string()
    .min(1, "Box count is required")
    .regex(/^\d+$/, "Must be a number"),
});

export type AddProductForm = z.infer<typeof addProductSchema>;
