import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInboundLog } from "../services/apiInboundLog";
import { toast } from "sonner";

export const useDeleteInboundLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInboundLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inboundlogs"] });
      toast("Inbound log successfully deleted");
    },
    onError: () => {
      toast("Failed to delete inbound log");
    },
  });
};
