import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createOrders } from "../services/apiOrders";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrders,
    onSuccess: () => {
      toast.success("New order created");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      if (err.response?.status !== 422) {
        toast.error(err.response.data?.message);
      }
    },
  });
};
