import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteInboundLog } from "../services/apiInboundLog";

export const useDeleteInboundLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInboundLog,
    onSuccess: () => {
      queryClient.invalidateQueries(["inboundlogs"]);
      toast.success("Inbound log successfully deleted");
    },
    onError: () => {
      toast.error("Failed to delete inbound log");
    },
  });
};
