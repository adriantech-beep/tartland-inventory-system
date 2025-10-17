import type { CompanySettingsForm } from "@/company-settings/companySettingsSchema";
import { objectToFormData } from "./utils/formDataHelper";
import { apiRequest } from "./utils/apiHelper";

export const createCompanyProfile = async (settings: CompanySettingsForm) => {
  const formData = objectToFormData(settings);
  return apiRequest("post", "/api/company/create-company-profile", formData);
};

export const getCompanyProfile = async () => {
  const data = await apiRequest<{ companySettings: any }>(
    "get",
    "/api/company/get-company-profile"
  );
  return data.companySettings;
};

export const editCompanyProfile = async ({
  id,
  values,
}: {
  id: string;
  values: CompanySettingsForm;
}) => {
  const formData = objectToFormData(values);
  return apiRequest("put", `/api/company/edit-company-profile/${id}`, formData);
};
