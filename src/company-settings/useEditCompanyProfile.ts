import { editCompanyProfile } from "@/services/apiCompanySettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditCompanyProfile = (onEditDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCompanyProfile,
    onSuccess: () => {
      toast("Company profile info updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      if (onEditDone) onEditDone();
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 422
          ? "Validation failed. Please check inputs."
          : "Failed to update company profile info");
      toast(message);
    },
  });
};
