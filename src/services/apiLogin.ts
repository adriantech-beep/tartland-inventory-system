import type { EditUserForm } from "@/account/editUserSchema";
import axiosInstance from "./axiosInstance";

export const loginUser = async (user: unknown) => {
  const { data } = await axiosInstance.post("/api/auth/user-login", user);

  return data;
};

export const editUser = async ({
  id,
  values,
}: {
  id: string;
  values: EditUserForm;
}) => {
  const formData = new FormData();

  if (values.name) formData.append("name", values.name);
  if (values.email) formData.append("email", values.email);
  if (values.avatar instanceof File) formData.append("avatar", values.avatar);

  const { data } = await axiosInstance.put(
    `/api/auth/user-update/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
};
