import axiosInstance from "../axiosInstance";

export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config: Record<string, any> = {}
): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>({
      method,
      url,
      data,
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
        ...config.headers,
      },
      ...config,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(error.response.data?.message || "Request failed");
    }
    if (error.request) {
      throw new Error("No response from server");
    }
    throw new Error(error.message);
  }
};
