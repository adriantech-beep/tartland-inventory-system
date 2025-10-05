import { createAddInboundLog } from "@/services/apiInboundLog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useAddInboundLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddInboundLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inboundlogs"] });
      toast("Inbound logs successfully created");
    },
    onError: (err: AxiosError<any>) => {
      const message =
        err.response?.data?.message || "Failed to create inboundlogs";
      toast(message);
    },
  });
};
