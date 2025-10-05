import { editInboundLog } from "@/services/apiInboundLog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditInboundLog = (onEditDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editInboundLog,
    onSuccess: () => {
      toast("Inboundlog updated successfully");
      queryClient.invalidateQueries({ queryKey: ["inboundlogs"] });
      if (onEditDone) onEditDone();
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 422
          ? "Validation failed. Please check inputs."
          : "Failed to update inboundlog");
      toast(message);
    },
  });
};
