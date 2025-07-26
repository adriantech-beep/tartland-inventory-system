import { useGetSummaryTotal } from "./useGetSummaryTotal";

const getStatus = (total) => {
  if (total <= 5) return "Consider restocking";
  return null;
};

const LowStockProduct = () => {
  const { data: stocks = [], isLoading } = useGetSummaryTotal();

  // Filter only those with low stock
  const lowStockItems = stocks.filter((stock) => getStatus(stock.totalBoxes));

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-xl text-stone-900 mb-4 font-semibold">Low Stock</h3>
      {lowStockItems.length === 0 ? (
        <p className="text-sm text-stone-600">All stocks are sufficient.</p>
      ) : (
        <ul className="space-y-2">
          {lowStockItems.map((stock) => {
            const status = getStatus(stock.totalBoxes);
            return (
              <li
                key={stock._id}
                className="flex justify-between text-stone-900 border-b border-stone-800 pb-1"
              >
                <span>{stock.name}</span>
                <span className="text-red-500 font-medium">
                  {stock.totalBoxes} left — {status}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LowStockProduct;
