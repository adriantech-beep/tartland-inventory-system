import { getProductsProduced } from "@/services/apiProductsProduced";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsProduced = () => {
  const { data, isLoading } = useQuery({
    queryFn: getProductsProduced,
    queryKey: ["produced"],
  });

  return { data, isLoading };
};
