import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMaterialSettings } from "../services/apiMaterialSettings";
import { toast } from "sonner";

export const useEditMaterialSettings = (onEditDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMaterialSettings,
    onSuccess: () => {
      toast.success("Material updated successfully");
      queryClient.invalidateQueries({ queryKey: ["materialsettings"] });
      if (onEditDone) onEditDone();
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 422
          ? "Validation failed. Please check your inputs."
          : "Failed to update material");
      toast.error(message);
    },
  });
};
