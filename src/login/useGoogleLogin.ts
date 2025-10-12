import { loginGoogle, type GoogleLoginResponse } from "@/services/apiGoogle";
import type { CredentialResponse } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useGoogle = () => {
  const navigate = useNavigate();

  return useMutation<
    GoogleLoginResponse,
    AxiosError<{ message?: string }>,
    CredentialResponse
  >({
    mutationFn: loginGoogle,
    onSuccess: (res: { token: string; user: any }) => {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast("Login successful");
      navigate("/dashboard");
    },
    onError: (err: any) => {
      if (err.response?.status === 403) {
        toast(err.response.data?.message);
      } else {
        toast("Login failed.");
      }
    },
  });
};
