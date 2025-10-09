import { useQuery } from "@tanstack/react-query";
import { getInventory } from "../services/apiInventory";

export const useGetInventory = () => {
  const { data, isLoading } = useQuery({
    queryFn: getInventory,
    queryKey: ["inventories"],
  });

  return { data, isLoading };
};
