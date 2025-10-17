import type { AddInboundPayload } from "@/production/utils/addProduct";
import { apiRequest } from "./utils/apiHelper";
import { objectToFormData } from "./utils/formDataHelper";

export const createAddInboundLog = async (inboundLog: AddInboundPayload) => {
  const data = await apiRequest("post", "/api/inbound-log", inboundLog);
  return data;
};

export const getInboundLog = async () => {
  const data = await apiRequest<{ inboundLog: any }>("get", "/api/inbound-log");
  return data.inboundLog;
};

export const deleteInboundLog = async (id: string) => {
  const data = await apiRequest("delete", `/api/inbound-log/${id}`);
  return data;
};

export const editInboundLog = async ({
  id,
  payload,
}: {
  id: string;
  payload: AddInboundPayload;
}) => {
  const formData = objectToFormData(payload);

  return apiRequest("put", `/api/inbound-log/${id}`, formData);
};
