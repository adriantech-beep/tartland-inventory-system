import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteInventory } from "../services/apiInventory";

export const useDeleteInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventories"]);
      toast.success("Inventory list successfully deleted");
    },
    onError: () => {
      toast.error("Failed to delete inventory list");
    },
  });
};
