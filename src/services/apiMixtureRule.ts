import axios from "axios";
import axiosInstance from "./axiosInstance";
import type { MixtureRuleData } from "@/mixture-settings/MixtureRuleTable";
import type { MixtureRuleForm } from "@/mixture-settings/mixtureRuleSchema";

export type CreateMixtureRulePayload = Omit<
  MixtureRuleData,
  "id" | "createdAt" | "updatedAt"
>;

export const createMixtureRule = async (mixture: CreateMixtureRulePayload) => {
  try {
    const { data } = await axiosInstance.post("/api/mixture-rules", mixture);
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw new Error("Unexpected error while creating mixture rule");
  }
};

export const getMixtureRule = async () => {
  try {
    const { data } = await axiosInstance.get("/api/mixture-rules");
    return data.mixture;
  } catch (err) {
    console.error("Failed to fetch material settings:", err);
    return [];
  }
};

export const editMixturerule = async ({
  id,
  values,
}: {
  id: string;
  values: MixtureRuleForm;
}) => {
  const { data } = await axiosInstance.put(`/api/mixture-rules/${id}`, values);
  return data;
};

export const deleteMixtureRule = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/mixture-rules/${id}`);
  return data;
};
