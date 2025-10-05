import type { AddProductForm } from "@/add-product/addProductSchema";

export interface AddInboundPayload {
  id?: string | null | undefined;
  rawMaterial: {
    id: string;
    name: string;
    perGrams: number;
    perBox: number;
  };
  boxCount: number;
  totalUnits: number;
  inboundDate: Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface AddProductionLog extends AddInboundPayload {
  id?: string;
  createdAt: string;
  updatedAt?: string;
}

export function createAddProduct(
  formData: AddProductForm
): AddInboundPayload | null {
  const selectedMaterial = formData.rawMaterialDetails;
  if (!selectedMaterial?.id) return null;

  const boxCount = parseInt(formData.boxCount, 10);
  if (isNaN(boxCount) || boxCount <= 0) return null;

  const totalUnits = selectedMaterial.perBox * boxCount;

  return {
    rawMaterial: selectedMaterial,
    boxCount,
    totalUnits,
    inboundDate: new Date(),
  };
}
