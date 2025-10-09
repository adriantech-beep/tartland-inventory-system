import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editOrder } from "../services/apiOrders";

export const useEditOrder = (onEditDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      toast("Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
      if (onEditDone) onEditDone();
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 422
          ? "Validation failed. Please check your inputs."
          : "Failed to update order");
      toast(message);
    },
  });
};
