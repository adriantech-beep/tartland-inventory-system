import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductionLog } from "../services/apiProductionLog";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useDeleteProductionLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductionLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["productionlogs"] });
      toast("Production log successfully deleted");
    },
    onError: (err: AxiosError<any>) => {
      const message =
        err.response?.data?.message || "Failed to delete production log";
      toast(message);
    },
  });
};
