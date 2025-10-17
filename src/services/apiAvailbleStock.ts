import { apiRequest } from "./utils/apiHelper";

export const getAvailableStock = async () => {
  const data = await apiRequest<{ available: any }>(
    "get",
    "/api/available-stock"
  );
  return data.available;
};
