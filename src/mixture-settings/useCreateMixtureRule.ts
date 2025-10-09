import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMixtureRule } from "../services/apiMixtureRule";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateMixtureRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMixtureRule,
    onSuccess: () => {
      toast("Mixture rule created");
      queryClient.invalidateQueries({ queryKey: ["mixturerules"] });
    },
    onError: (err: AxiosError<any>) => {
      const message =
        err.response?.data?.message || "Failed to create material";
      toast(message);
    },
  });
};
