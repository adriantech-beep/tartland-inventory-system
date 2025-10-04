import { useQuery } from "@tanstack/react-query";
import { getProductionLog } from "../services/apiProductionLog";

export const useGetProductionLog = () => {
  const { data, isLoading } = useQuery({
    queryFn: getProductionLog,
    queryKey: ["productionLogs"],
  });

  return { data, isLoading };
};
