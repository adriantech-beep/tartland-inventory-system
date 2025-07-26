import axiosInstance from "./axiosInstance";

export const getProductsProduced = async () => {
  try {
    const { data } = await axiosInstance.get("/api/inventory-produced");
    return data.produced;
  } catch (err) {
    console.error("Failed to fetch production logs:", err);
    return [];
  }
};
