import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateMaterialSettings } from "../services/apiMaterialSettings";

export const useEditMaterialSettings = (setEditId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMaterialSettings,
    onSuccess: () => {
      toast.success("Material updated successfully");
      queryClient.invalidateQueries({ queryKey: ["materialsettings"] });
      setEditId(null);
    },
    onError: (err) => {
      if (err.response?.status === 422) {
        toast.error(
          err.response.data?.message || "Material name already exists"
        );
      } else {
        toast.error("Failed to update material");
      }
    },
  });
};
