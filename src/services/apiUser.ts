import axiosInstance from "./axiosInstance";

export const getActiveUser = async () => {
  const { data } = await axiosInstance.get("/api/user/active-user");

  return data.user;
};
