import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const createMaterialSettings = async (material) => {
  try {
    const { data } = await axiosInstance.post("/api/materials", material);
    return data;
  } catch (err) {
    if (err.response?.status === 422) {
      toast.error(err.response.data?.message || "Material already exists.");
    }
    throw err;
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

export const updateMaterialSettings = async ({ id, ...material }) => {
  const { data } = await axiosInstance.put(`/api/materials/${id}`, material);
  return data;
};

export const deleteMaterialSetting = async (id) => {
  const { data } = await axiosInstance.delete(`/api/materials/${id}`);
  return data;
};
