import axiosInstance from "./axiosInstance";

export const getAvailableStock = async () => {
  try {
    const { data } = await axiosInstance.get("/api/available-stock");
    return data.available;
  } catch (err) {
    console.error("Failed to fetch available stocks:", err);
    return [];
  }
};
