import { z } from "zod";

export const orderFormSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().min(1, "Customer name is required"),
  flavorName: z.string().min(1, "Flavor is required"),
  bundleCount: z.number().min(1, "Bundle count is required"),
  createdAt: z.string().optional(),
});

export type OrderForm = z.infer<typeof orderFormSchema>;
