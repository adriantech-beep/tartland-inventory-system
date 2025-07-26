import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const createInventory = async (inventory) => {
  try {
    const { data } = await axiosInstance.post("/api/inventory", inventory);
    return data;
  } catch (err) {
    if (err.response?.status === 422) {
      toast.error(err.response.data?.message || "Creating inventory failed.");
    }
    throw err;
  }
};

export const getInventory = async () => {
  try {
    const { data } = await axiosInstance.get("/api/inventory");
    return data.inventory;
  } catch (err) {
    console.error("Failed to fetch inventory:", err);
    return [];
  }
};

export const deleteInventory = async (id) => {
  const { data } = await axiosInstance.delete(`/api/inventory/${id}`);
  return data;
};

export const editInventory = async ({ id, ...inventory }) => {
  const { data } = await axiosInstance.put(`/api/inventory/${id}`, inventory);
  return data;
};

export const getSummaryTotal = async () => {
  try {
    const { data } = await axiosInstance.get("/api/inventory/summary");
    return data.summary;
  } catch (err) {
    console.error("Failed to fetch inventory:", err);
    return [];
  }
};
