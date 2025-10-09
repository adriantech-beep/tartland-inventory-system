import { getAvailableStock } from "@/services/apiAvailbleStock";
import { useQuery } from "@tanstack/react-query";

export const useGetAvailableStock = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAvailableStock,
    queryKey: ["stocks"],
  });

  return { data, isLoading };
};
