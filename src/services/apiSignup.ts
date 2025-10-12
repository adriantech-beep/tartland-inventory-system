import axiosInstance from "./axiosInstance";

export const signupUser = async (user: unknown) => {
  const { data } = await axiosInstance.post("/api/auth/user-signup", user);

  return data;
};
