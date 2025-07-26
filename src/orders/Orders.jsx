import { useState } from "react";
import { useGetProductsProduced } from "../produced-inventory/useGetProductsProduced";
import Select from "../components/Select";
import { useCreateOrder } from "./useCreateOrder";

const Orders = () => {
  const { data: productsProduced = [] } = useGetProductsProduced();
  const { mutate: createOrder } = useCreateOrder();
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
      bundleCount: form.bundleCount,
    };
    createOrder(payload);
  };
  return (
    <div className="w-full mx-auto px-4 py-6 space-y-6 bg-stone-200">
      <div className="bg-white shadow-md rounded-xl p-4 border border-stone-200">
        <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-1">
          <span>📊</span> <span>Current Produced Stock Summary</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
          {productsProduced.map((stock) => (
            <div
              key={stock.flavor}
              className="flex justify-between items-center bg-stone-50 p-2 rounded-md border border-stone-200"
            >
              <span className="truncate">{stock.flavor}</span>
              <span className="font-semibold text-stone-800">
                {stock.totalBundles} bundles
              </span>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto flex items-center gap-4 bg-white p-6 rounded-md shadow-md space-y-4 "
      >
        <input
          className="border p-2 rounded-md text-sm w-3xs text-stone-950"
          type="text"
          placeholder="Customer/Dealer name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        />
        <Select
          label="Choose primary flakes"
          value={form.flavorName?.valueOf || ""}
          onChange={(e) => {
            const selected = flavorOptions.find(
              (opt) => opt.value === e.target.value
            );
            setForm({ ...form, flavorName: selected });
          }}
          options={flavorOptions}
        />
        <input
          className="border p-2 rounded-md text-sm w-3xs text-stone-950"
          type="number"
          placeholder="Bundle Count"
          value={form.bundleCount}
          onChange={(e) => setForm({ ...form, bundleCount: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Orders;
