import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventory } from "../services/apiInventory";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      toast("New inventory item created");
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (err: AxiosError<any>) => {
      const message =
        err.response?.data?.message || "Failed to create inventory";
      toast(message);
    },
  });
};
