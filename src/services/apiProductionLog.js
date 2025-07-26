import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const createProduction = async (production) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/production-log",
      production
    );
    return data;
  } catch (err) {
    if (err.response?.status === 422) {
      toast.error(err.response?.data?.message);
    }
    throw err;
  }
};

export const getProductionLog = async () => {
  try {
    const { data } = await axiosInstance.get("/api/production-log");
    return data.productionLog;
  } catch (err) {
    console.error("Failed to fetch production logs:", err);
    return [];
  }
};

export const deleteProductionLog = async (id) => {
  const { data } = await axiosInstance.delete(`/api/production-log/${id}`);
  return data;
};

export const editProductionLog = async ({ id, ...production }) => {
  const { data } = await axiosInstance.put(
    `/api/production-log/${id}`,
    production
  );
  return data;
};
