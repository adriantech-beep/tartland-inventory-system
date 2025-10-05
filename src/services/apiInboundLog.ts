import axiosInstance from "./axiosInstance";
import type { AddInboundPayload } from "@/production/utils/addProduct";
import axios from "axios";

export const createAddInboundLog = async (
  inboundLog: AddInboundPayload
): Promise<AddInboundPayload> => {
  try {
    const { data } = await axiosInstance.post<AddInboundPayload>(
      "/api/inbound-log",
      inboundLog
    );
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw new Error("Unexpected error while creating production");
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

export const deleteInboundLog = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/inbound-log/${id}`);
  return data;
};

export const editInboundLog = async ({
  id,
  payload,
}: {
  id: string;
  payload: AddInboundPayload;
}) => {
  const { data } = await axiosInstance.put(`/api/inbound-log/${id}`, payload);
  return data;
};
