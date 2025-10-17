import type { EditUserForm } from "@/account/editUserSchema";
import { apiRequest } from "./utils/apiHelper";
import { objectToFormData } from "./utils/formDataHelper";

export const loginUser = async (user: any) => {
  const data = await apiRequest("post", "/api/auth/user-login", user);
  return data;
};

export const editUser = async ({
  id,
  values,
}: {
  id: string;
  values: EditUserForm;
}) => {
  const formData = objectToFormData(values);

  return apiRequest("put", `/api/auth/user-update/${id}`, formData);
};
