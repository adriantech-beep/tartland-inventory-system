import type { CredentialResponse } from "@react-oauth/google";
import axiosInstance from "./axiosInstance";

export type GoogleLoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
};

export const loginGoogle = async (
  user: CredentialResponse
): Promise<GoogleLoginResponse> => {
  const { data } = await axiosInstance.post<GoogleLoginResponse>(
    "api/auth/google",
    { token: user.credential }
  );
  return data;
};
