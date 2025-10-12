import { getCompanyProfile } from "@/services/apiCompanySettings";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyProfile = () => {
  const { data, isLoading } = useQuery({
    queryFn: getCompanyProfile,
    queryKey: ["companies"],
  });

  return { data, isLoading };
};
