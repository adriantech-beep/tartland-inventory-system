import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editProductionLog } from "../services/apiProductionLog";

export const useEditProductionLog = (setEditId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProductionLog,
    onSuccess: () => {
      toast.success("Production log updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productionlogs"] });
      setEditId(null);
    },
    onError: (err) => {
      if (err.response?.status === 422) {
        toast.error(err.response.data?.message);
      } else {
        toast.error("Failed to update production");
      }
    },
  });
};
