import { useQuery } from "@tanstack/react-query";
import { getProductsProduced } from "../services/apiProductsProduced";

export const useGetProductsProduced = () => {
  const { data, isLoading } = useQuery({
    queryFn: getProductsProduced,
    queryKey: ["produced"],
  });

  return { data, isLoading };
};
