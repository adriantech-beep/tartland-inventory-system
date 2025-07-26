import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMaterialSetting } from "../services/apiMaterialSettings";
import { toast } from "react-toastify";

export const useDeleteMaterialSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMaterialSetting,
    onSuccess: () => {
      queryClient.invalidateQueries(["materialsettings"]);
      toast.success("Material successfully deleted");
    },
    onError: () => {
      toast.error("Failed to delete material");
    },
  });
};
