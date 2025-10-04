import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const createMixtureRule = async (mixture) => {
  try {
    const { data } = await axiosInstance.post("/api/mixture-rules", mixture);
    return data;
  } catch (err) {
    if (err.response?.status === 422) {
      toast.error(err.response.data?.message || "Material already exists.");
    }
    throw err;
  }
};

export const getMixtureRule = async () => {
  try {
    const { data } = await axiosInstance.get("/api/mixture-rules");
    return data.mixture;
  } catch (err) {
    console.error("Failed to fetch material settings:", err);
    return [];
  }
};

export const editMixturerule = async ({ id, ...mixture }) => {
  const { data } = await axiosInstance.put(`/api/mixture-rules/${id}`, mixture);
  return data;
};

export const deleteMixtureRule = async (id) => {
  const { data } = await axiosInstance.delete(`/api/mixture-rules/${id}`);
  return data;
};
