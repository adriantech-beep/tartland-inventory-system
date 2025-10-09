import { z } from "zod";

const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  perGrams: z.number().positive("Must be greater than zero"),
  perBox: z.number().positive("Must be greater than zero"),
});

export const mixtureRuleSchema = z.object({
  id: z.string().optional(),
  flavor: z.string().min(1, "flavor name is required"),
  mixtureCount: z.number().optional(),
  primaryFlavorName: z
    .object({
      material: materialSchema,
    })
    .nullable(),
  bagsPerMixtureForPrimary: z.number(),
  secondaryFlavorName: z
    .object({
      material: materialSchema,
    })
    .nullable(),
  bagsPerMixtureForSecondary: z.number(),
  jarMaterial: z
    .object({
      material: materialSchema,
    })
    .nullable(),
});

export type MixtureRuleForm = z.infer<typeof mixtureRuleSchema>;
