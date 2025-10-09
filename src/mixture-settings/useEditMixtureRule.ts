import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMixturerule } from "../services/apiMixtureRule";
import { toast } from "sonner";

export const useEditMixtureRule = (onEditDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMixturerule,
    onSuccess: () => {
      toast("Mixture rule updated successfully");
      queryClient.invalidateQueries({ queryKey: ["mixturerules"] });
      if (onEditDone) onEditDone();
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 422
          ? "Validation failed. Please check your inputs."
          : "Failed to update material");
      toast(message);
    },
  });
};
