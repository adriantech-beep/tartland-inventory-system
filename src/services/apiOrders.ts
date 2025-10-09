import type { OrderForm } from "@/orders/ordersSchema";
import axiosInstance from "./axiosInstance";

export const createOrders = async (order: OrderForm) => {
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

export const deleteOrder = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/orders/${id}`);
  return data;
};

export const editOrder = async ({
  id,
  values,
}: {
  id: string;
  values: OrderForm;
}) => {
  const { data } = await axiosInstance.put(`/api/orders/${id}`, values);
  return data;
};
