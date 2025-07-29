import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/apiOrders";

export const useGetOrders = () => {
  const { data, isLoading } = useQuery({
    queryFn: getOrders,
    queryKey: ["orders"],
  });

  return { data, isLoading };
};
