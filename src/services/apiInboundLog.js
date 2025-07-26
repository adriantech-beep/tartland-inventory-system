import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const createAddInboundLog = async (inboundLog) => {
  try {
    const { data } = await axiosInstance.post("/api/inbound-log", inboundLog);
    return data;
  } catch (err) {
    if (err.response?.status === 400) {
      toast.error(err.response.data?.message || "Creating inventory failed.");
    }
    throw err;
  }
};

export const getInboundLog = async () => {
  try {
    const { data } = await axiosInstance.get("/api/inbound-log");
    return data.inboundLog;
  } catch (err) {
    console.error("Failed to fetch inventory for inbound logs:", err);
    return [];
  }
};

export const deleteInboundLog = async (id) => {
  const { data } = await axiosInstance.delete(`/api/inbound-log/${id}`);
  return data;
};
