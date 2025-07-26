import { useQuery } from "@tanstack/react-query";
import { getSummaryTotal } from "../services/apiInventory";

export const useGetSummaryTotal = () => {
  const { data, isLoading } = useQuery({
    queryFn: getSummaryTotal,
    queryKey: ["summary"],
  });

  return { data, isLoading };
};
