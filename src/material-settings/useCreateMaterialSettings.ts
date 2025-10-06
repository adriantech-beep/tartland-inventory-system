import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMaterialSettings } from "../services/apiMaterialSettings";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateMaterialSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMaterialSettings,
    onSuccess: () => {
      toast("Material created");
      queryClient.invalidateQueries({ queryKey: ["materialsettings"] });
    },
    onError: (err: AxiosError<any>) => {
      const message =
        err.response?.data?.message || "Failed to create material";
      toast(message);
    },
  });
};
