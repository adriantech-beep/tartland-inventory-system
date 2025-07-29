import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editOrder } from "../services/apiOrders";

export const useEditOrder = (setEditId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      toast.success("Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
      setEditId(null);
    },
    onError: (err) => {
      if (err.response?.status === 422) {
        toast.error(err.response.data?.message);
      } else {
        toast.error("Failed to update order");
      }
    },
  });
};
