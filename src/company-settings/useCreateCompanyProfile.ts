import { createCompanyProfile } from "@/services/apiCompanySettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateCompanyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompanyProfile,
    onSuccess: () => {
      toast("New company settings created");
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
    onError: (err: AxiosError<any>) => {
      const message =
        err.response?.data?.message || "Failed to create company settings";
      toast(message);
    },
  });
};
