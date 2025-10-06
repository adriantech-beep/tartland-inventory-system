import axiosInstance from "./axiosInstance";
import type { MaterialSettingsForm } from "@/material-settings/materialSettingsSchema";
import axios from "axios";

export const createMaterialSettings = async (
  material: MaterialSettingsForm
) => {
  try {
    const { data } = await axiosInstance.post("/api/materials", material);
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw new Error("Unexpected error while creating production");
  }
};

export const getMaterialSettings = async () => {
  try {
    const { data } = await axiosInstance.get("/api/materials");
    return data.materials;
  } catch (err) {
    console.error("Failed to fetch material settings:", err);
    return [];
  }
};

export const updateMaterialSettings = async ({
  id,
  values,
}: {
  id: string;
  values: MaterialSettingsForm;
}) => {
  const { data } = await axiosInstance.put(`/api/materials/${id}`, values);
  return data;
};

export const deleteMaterialSetting = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/materials/${id}`);
  return data;
};
