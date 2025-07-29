import axiosInstance from "./axiosInstance";

export const createOrders = async (order) => {
  const { data } = await axiosInstance.post("/api/orders", order);
  return data;
};

export const getOrders = async () => {
  try {
    const { data } = await axiosInstance.get("/api/orders");
    return data.orders;
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    return [];
  }
};

export const deleteOrder = async (id) => {
  const { data } = await axiosInstance.delete(`/api/orders/${id}`);
  return data;
};

export const editOrder = async ({ id, ...order }) => {
  const { data } = await axiosInstance.put(`/api/orders/${id}`, order);
  return data;
};
