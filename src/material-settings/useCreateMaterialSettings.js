import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMaterialSettings } from "../services/apiMaterialSettings";
import { toast } from "react-toastify";

export const useCreateMaterialSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMaterialSettings,
    onSuccess: () => {
      toast.success("Material created");
      queryClient.invalidateQueries({ queryKey: ["materialsettings"] });
    },
    onError: (err) => {
      if (err.response?.status !== 422) {
        toast.error(
          err.response.data?.message || "Product name already exists"
        );
      }
    },
  });
};
