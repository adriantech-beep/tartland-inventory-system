import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editInventory } from "../services/apiInventory";

export const useEditInventory = (setEditId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editInventory,
    onSuccess: () => {
      toast.success("Inventory list updated successfully");
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      setEditId(null);
    },
    onError: (err) => {
      if (err.response?.status === 422) {
        toast.error("Failed to update inventory list");
      }
    },
  });
};
