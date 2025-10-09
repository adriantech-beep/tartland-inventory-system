import TableHead from "../components/TableHead";
import { stockCountHeadings } from "../constant/stockCountHeadings";
import { useGetSummaryTotal } from "./useGetSummaryTotal";

const statusColors = {
  HIGH: "text-yellow-400",
  MEDIUM: "text-green-400",
  LOW: "text-red-400",
};

const getStatus = (total: number) => {
  if (total >= 2000) return "HIGH";
  if (total >= 1000) return "MEDIUM";
  return "LOW";
};

const StockCount = () => {
  const { data: stocks = [], isLoading } = useGetSummaryTotal();

  console.log(stocks);
  const sortedStocks = [...stocks].sort((a, b) => a.name.localeCompare(b.name));

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-xl text-stone-800 mb-4 font-semibold">Stock Count</h3>
      {isLoading ? (
        <p className="text-stone-800">Loading stock list...</p>
      ) : sortedStocks.length === 0 ? (
        <p className="text-stone-800">There is no available stocks</p>
      ) : (
        <table className="w-full text-sm text-left text-stone-800">
          <thead className="text-xs uppercase text-gray-400">
            <tr>
              {stockCountHeadings.map((name, i) => (
                <TableHead name={name} key={i} />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedStocks.map((stock, i) => {
              const status = getStatus(stock.totalUnits);
              return (
                <tr key={stock._id} className="border-t border-gray-200">
                  <td className="py-2">#{String(i + 1).padStart(3, "0")}</td>
                  <td className="py-2">{stock.name}</td>
                  <td className="py-2">{stock.totalBoxes}</td>
                  <td className={`py-2 font-bold ${statusColors[status]}`}>
                    {status}
                  </td>
                  <td className="py-2">{stock.totalUnits.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockCount;
