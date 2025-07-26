import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const createOrders = async (order) => {
  try {
    const { data } = await axiosInstance.post("/api/orders", order);
    return data;
  } catch (err) {
    if (err.response?.status === 422) {
      toast.error(err.response.data?.message);
    }
    throw err;
  }
};
