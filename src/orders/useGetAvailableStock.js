import { useQuery } from "@tanstack/react-query";
import { getAvailableStock } from "../services/apiAvailbleStock";

export const useGetAvailableStock = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAvailableStock,
    queryKey: ["stocks"],
  });

  return { data, isLoading };
};
