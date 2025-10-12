import { signupUser } from "@/services/apiSignup";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast("Signup successful");
      navigate("/login");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      if (error.response?.status === 403) {
        toast(error.response.data?.message);
      } else {
        toast("Signup failed.");
      }
    },
  });
};
