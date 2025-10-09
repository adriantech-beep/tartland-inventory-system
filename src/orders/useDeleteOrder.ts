import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "../services/apiOrders";
import { toast } from "sonner";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
      toast("Order successfully deleted");
    },
    onError: () => {
      toast("Failed to delete order");
    },
  });
};
