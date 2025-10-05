import { getMaterialSettings } from "@/services/apiMaterialSettings";
import { useQuery } from "@tanstack/react-query";

export const useMaterialSettings = () => {
  const { data, isLoading } = useQuery({
    queryFn: getMaterialSettings,
    queryKey: ["materialsettings"],
  });

  return { data, isLoading };
};
