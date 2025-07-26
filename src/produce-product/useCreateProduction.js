import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createProduction } from "../services/apiProductionLog";

export const useCreateProduction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduction,
    onSuccess: () => {
      toast.success("Production created");
      queryClient.invalidateQueries(["summary"]); // ✅ triggers refetch
      queryClient.invalidateQueries(["productionlogs"]);
    },
    onError: (err) => {
      if (err.response?.status !== 422) {
        toast.error(err.response.data?.message);
      }
    },
  });
};
