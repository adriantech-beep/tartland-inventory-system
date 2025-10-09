import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createInventory } from "../services/apiInventory";

export const useCreateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      toast.success("New inventory item created");
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (err) => {
      if (err.response?.status !== 422) {
        toast.error(err.response.data?.message);
      }
    },
  });
};
