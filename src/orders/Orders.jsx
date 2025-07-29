import { useState } from "react";
import { useGetProductsProduced } from "../produced-inventory/useGetProductsProduced";
import Select from "../components/Select";
import { useCreateOrder } from "./useCreateOrder";
import { useGetAvailableStock } from "./useGetAvailableStock";
import { useGetOrders } from "./useGetOrders";
import { orderHeadings } from "../constant/orderHeadings";
import TableHead from "../components/TableHead";
import { dateFormatter } from "../helpers/dateFormatter";
import { useDeleteOrder } from "./useDeleteOrder";
import { useEditOrder } from "./useEditOrder";

const Orders = () => {
  const [editId, setEditId] = useState(null);
  const { data: productsProduced = [] } = useGetProductsProduced();
  const { mutate: createOrder } = useCreateOrder();
  const { data: orders, isLoading } = useGetOrders();
  const { data: availableStock = [] } = useGetAvailableStock();
  const { mutate: deleteOrder } = useDeleteOrder();
  const { mutate: editOrder } = useEditOrder(setEditId);

  const [form, setForm] = useState({
    customerName: "",
    flavorName: "",
    bundleCount: "",
  });

  const flavorOptions = productsProduced.map((product) => ({
    value: product.flavor,
    label: product.flavor,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      customerName: form.customerName,
      flavorName: form.flavorName,
      bundleCount: parseInt(form.bundleCount),
    };

    if (editId) {
      editOrder({ id: editId, ...payload });
      setEditId(null);
    } else {
      createOrder(payload);
    }

    setForm({
      customerName: "",
      flavorName: "",
      bundleCount: "",
    });
  };

  const handleEdit = (order) => {
    setForm({
      customerName: order.customerName,
      flavorName: order.flavorName,
      bundleCount: parseInt(order.bundleCount),
    });
    setEditId(order.id);
  };

  const handleCancel = () => {
    setForm({
      customerName: "",
      flavorName: "",
      bundleCount: "",
    });
    setEditId(null);
  };

  return (
    <div className="w-full mx-auto px-4 py-6 space-y-6 bg-stone-200">
      <div className="bg-white shadow-md rounded-xl p-4 border border-stone-200">
        <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-1">
          <span>📊</span> <span>Current Produced Stock Summary</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
          {availableStock.map((stock) => (
            <div
              key={stock.flavor}
              className="flex justify-between items-center bg-stone-50 p-2 rounded-md border border-stone-200"
            >
              <span className="truncate">{stock.flavor}</span>
              <span className="font-semibold text-stone-800">
                {stock.availableBundles} bundles
              </span>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto flex flex-col items-center gap-4 bg-white p-6 rounded-md shadow-md space-y-4 "
      >
        <div className="w-full mx-auto flex  gap-4">
          <input
            className="border p-2 rounded-md text-sm w-3xs text-stone-950"
            type="text"
            placeholder="Customer/Dealer name"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          />
          <Select
            label="Choose primary flakes"
            value={form.flavorName}
            onChange={(e) => setForm({ ...form, flavorName: e.target.value })}
            options={flavorOptions}
          />
          <input
            className="border p-2 rounded-md text-sm w-3xs text-stone-950"
            type="number"
            placeholder="Bundle Count"
            value={form.bundleCount}
            onChange={(e) => setForm({ ...form, bundleCount: e.target.value })}
          />
        </div>
        <div className="flex w-full gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 text-sm"
          >
            {editId ? "Edit order" : "Submit"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm bg-red-500 px-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="w-full overflow-x-auto border rounded-md bg-white shadow-lg">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              {orderHeadings.map((name, i) => (
                <TableHead name={name} key={i} />
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  Loading order logs...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No data found...
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="w-full border-t border-b border-stone-300 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-2 text-stone-800">
                    {dateFormatter(order.createdAt)}
                  </td>
                  <td className="p-2 text-stone-800">{order.customerName}</td>
                  <td className="p-2 text-stone-800">{order.flavorName}</td>
                  <td className="p-2 text-stone-800">{order.bundleCount}</td>

                  <td className="p-2 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit?.(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => deleteOrder?.(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Orders;
