import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteMixtureRule } from "../services/apiMixtureRule";

export const useDeleteMixtureRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMixtureRule,
    onSuccess: () => {
      queryClient.invalidateQueries(["mixturerules"]);
      toast.success("Mixture rule successfully deleted");
    },
    onError: () => {
      toast.error("Failed to delete mixture rule");
    },
  });
};
