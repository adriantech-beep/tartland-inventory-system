import type { MaterialSettingsForm } from "@/material-settings/materialSettingsSchema";
import { apiRequest } from "./utils/apiHelper";
import { objectToFormData } from "./utils/formDataHelper";

export const createMaterialSettings = async (
  material: MaterialSettingsForm
) => {
  const data = await apiRequest("post", "/api/materials", material);
  return data;
};

export const getMaterialSettings = async () => {
  const data = await apiRequest<{ materials: any }>("get", "/api/materials");
  return data.materials;
};

export const updateMaterialSettings = async ({
  id,
  values,
}: {
  id: string;
  values: MaterialSettingsForm;
}) => {
  const formData = objectToFormData(values);

  return apiRequest("put", `/api/materials/${id}`, formData);
};

export const deleteMaterialSetting = async (id: string) => {
  const data = await apiRequest("delete", `/api/materials/${id}`);
  return data;
};
