import { getActiveUser } from "@/services/apiUser";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getActiveUser,
    retry: false,
  });
};
