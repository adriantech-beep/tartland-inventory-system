import { loginUser } from "@/services/apiLogin";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast("Login successful");
      navigate("/dashboard");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      if (error.response?.status === 403) {
        toast(error.response.data?.message);
      } else {
        toast("Login failed.");
      }
    },
  });
};
