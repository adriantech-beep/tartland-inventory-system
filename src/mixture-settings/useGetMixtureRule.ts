import { getMixtureRule } from "@/services/apiMixtureRule";
import { useQuery } from "@tanstack/react-query";

export const useGetMixtureRule = () => {
  const { data, isLoading } = useQuery({
    queryFn: getMixtureRule,
    queryKey: ["mixturerules"],
  });

  return { data, isLoading };
};
