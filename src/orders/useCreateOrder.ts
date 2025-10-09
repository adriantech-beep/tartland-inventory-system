import { createOrders } from "@/services/apiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrders,
    onSuccess: () => {
      toast("New order created");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    },
    onError: (err: AxiosError<any>) => {
      const message = err.response?.data?.message || "Failed to create order";
      toast(message);
    },
  });
};
