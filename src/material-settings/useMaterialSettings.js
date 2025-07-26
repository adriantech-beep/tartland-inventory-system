import { useQuery } from "@tanstack/react-query";
import { getMaterialSettings } from "../services/apiMaterialSettings";

export const useMaterialSettings = () => {
  const { data, isLoading } = useQuery({
    queryFn: getMaterialSettings,
    queryKey: ["materialsettings"],
  });

  return { data, isLoading };
};
