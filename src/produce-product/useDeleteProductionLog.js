import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteProductionLog } from "../services/apiProductionLog";

export const useDeleteProductionLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductionLog,
    onSuccess: () => {
      queryClient.invalidateQueries(["summary"]); // 🔁 Refresh inventory summary
      queryClient.invalidateQueries(["productionlogs"]);
      toast.success("Production log successfully deleted");
    },
    onError: () => {
      toast.error("Failed to delete production list");
    },
  });
};
