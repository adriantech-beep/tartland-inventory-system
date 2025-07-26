import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAddInboundLog } from "../services/apiInboundLog";

export const useAddInboundLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddInboundLog,
    onSuccess: () => {
      toast.success("New inventory item created");
      queryClient.invalidateQueries({ queryKey: ["inboundlogs"] });
    },
    onError: (err) => {
      if (err.response?.status !== 422) {
        toast.error(err.response.data?.message);
      }
    },
  });
};
