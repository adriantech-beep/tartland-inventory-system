import type { CompanySettingsForm } from "@/company-settings/companySettingsSchema";
import axiosInstance from "./axiosInstance";

export const createCompanySettings = async (settings: CompanySettingsForm) => {
  try {
    const formData = new FormData();

    if (settings.companyName)
      formData.append("companyName", settings.companyName);
    if (settings.avatar instanceof File)
      formData.append("avatar", settings.avatar);

    const { data } = await axiosInstance.post(
      "/api/company/create-company-profile",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      console.error("Status code:", error.response.status);
      throw new Error(
        error.response.data?.message ||
          `Request failed with status ${error.response.status}`
      );
    } else if (error.request) {
      console.error("No response received from server:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error in request setup:", error.message);
      throw new Error(error.message);
    }
  }
};

export const getCompanyProfile = async () => {
  try {
    const { data } = await axiosInstance.get(
      "/api/company/get-company-profile"
    );
    return data.companySettings;
  } catch (err) {
    console.error("Failed to fetch company profile:", err);
    return [];
  }
};

export const editCompanyProfile = async ({
  id,
  values,
}: {
  id: string;
  values: CompanySettingsForm;
}) => {
  const formData = new FormData();

  formData.append("companyName", values.companyName || "");

  if (values.avatar instanceof File) {
    formData.append("avatar", values.avatar);
  }

  const { data } = await axiosInstance.put(
    `/api/company/edit-company-profile/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
};
