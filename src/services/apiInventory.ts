import axiosInstance from "./axiosInstance";
import axios from "axios";

export const createInventory = async (inventory: any) => {
  try {
    const { data } = await axiosInstance.post("/api/inventory", inventory);
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw new Error("Unexpected error while fetching inventory");
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

export const deleteInventory = async (id: string) => {
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
