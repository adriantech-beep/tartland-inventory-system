import { useGetSummaryTotal } from "./useGetSummaryTotal";

type StockField = {
  _id: string;
  name: string;
  totalBoxes: number;
  totalUnits: number;
};

const getStatus = (total: number) => {
  if (total <= 5) return "Consider restocking";
  return null;
};

const LowStockProduct = () => {
  const { data: stocks = [], isLoading } = useGetSummaryTotal();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-xl text-stone-900 mb-4 font-semibold">Low Stock</h3>
      {stocks.length === 0 ? (
        <p className="text-sm text-stone-600">There are no available stocks</p>
      ) : (
        <ul className="space-y-2">
          {stocks.map((stock: StockField) => {
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
