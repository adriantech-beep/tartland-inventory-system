import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createMixtureRule } from "../services/apiMixtureRule";

export const useCreateMixtureRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMixtureRule,
    onSuccess: () => {
      toast.success("Mixture rule created");
      queryClient.invalidateQueries({ queryKey: ["mixturerules"] });
    },
    onError: (err) => {
      if (err.response?.status !== 422) {
        toast.error(
          err.response.data?.message || "Mixture flavor name already exists"
        );
      }
    },
  });
};
