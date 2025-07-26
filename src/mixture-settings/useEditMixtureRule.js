import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editMixturerule } from "../services/apiMixtureRule";

export const useEditMixtureRule = (setEditId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMixturerule,
    onSuccess: () => {
      toast.success("Mixture rule updated successfully");
      queryClient.invalidateQueries({ queryKey: ["mixturerules"] });
      setEditId(null);
    },
    onError: (err) => {
      if (err.response?.status === 422) {
        toast.error(
          err.response.data?.message || "Mixture name already exists"
        );
      } else {
        toast.error("Failed to update mixture");
      }
    },
  });
};
