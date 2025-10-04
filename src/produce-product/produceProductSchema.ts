import { z } from "zod";

export const produceProductSchema = z.object({
  selectedMixture: z.object({
    id: z.string(),
    flavor: z.string(),
    mixtureCount: z.number(),
    material: z.any(),
    jarMaterial: z.any(),
  }),
  mixtureCount: z
    .string()
    .min(1, "Mixture count is required")
    .regex(/^\d+$/, "Must be a number"),
});

export type ProduceProductForm = z.infer<typeof produceProductSchema>;
