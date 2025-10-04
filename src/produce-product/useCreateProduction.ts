import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduction } from "@/services/apiProductionLog";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateProduction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mixtures"] });
      queryClient.invalidateQueries({ queryKey: ["productionlogs"] });
      toast("Production created successfully");
    },
    onError: (err: AxiosError<any>) => {
      const message =
        err.response?.data?.message || "Failed to create production";
      toast(message);
    },
  });
};
