import { useQuery } from "@tanstack/react-query";
import { getMixtureRule } from "../services/apiMixtureRule";

export const useGetMixtureRule = () => {
  const { data, isLoading } = useQuery({
    queryFn: getMixtureRule,
    queryKey: ["mixturerules"],
  });

  return { data, isLoading };
};
