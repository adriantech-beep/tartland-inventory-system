import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMaterialSetting } from "../services/apiMaterialSettings";
import { toast } from "sonner";

export const useDeleteMaterialSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMaterialSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialsettings"] });
      toast("Material successfully deleted");
    },
    onError: () => {
      toast("Failed to delete material");
    },
  });
};
