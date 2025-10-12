import { editUser } from "@/services/apiLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditUser = (onEditDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      toast("User info updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (onEditDone) onEditDone();
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 422
          ? "Validation failed. Please check inputs."
          : "Failed to update user info");
      toast(message);
    },
  });
};
