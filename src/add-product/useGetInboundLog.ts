import { useQuery } from "@tanstack/react-query";
import { getInboundLog } from "../services/apiInboundLog";

export const useGetInboundLogs = () => {
  const { data, isLoading } = useQuery({
    queryFn: getInboundLog,
    queryKey: ["inboundlogs"],
  });

  return { data, isLoading };
};
