import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProductionLog } from "@/services/apiProductionLog";
import { toast } from "sonner";

export const useEditProductionLog = (onEditDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProductionLog,
    onSuccess: () => {
      toast("Production log updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productionlogs"] });
      if (onEditDone) onEditDone();
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 422
          ? "Validation failed. Please check inputs."
          : "Failed to update production log");
      toast(message);
    },
  });
};
