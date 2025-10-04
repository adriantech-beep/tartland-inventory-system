import axiosInstance from "./axiosInstance";
import type {
  ProducePayload,
  ProductionLog,
} from "@/production/utils/produceProduct";
import axios from "axios";

export const createProduction = async (
  production: ProducePayload
): Promise<ProductionLog> => {
  try {
    const { data } = await axiosInstance.post<ProductionLog>(
      "/api/production-log",
      production
    );
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw new Error("Unexpected error while creating production");
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

export const deleteProductionLog = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/production-log/${id}`);
  return data;
};

export const editProductionLog = async ({
  id,
  payload,
}: {
  id: string;
  payload: ProducePayload;
}) => {
  const { data } = await axiosInstance.put(
    `/api/production-log/${id}`,
    payload
  );
  return data;
};
