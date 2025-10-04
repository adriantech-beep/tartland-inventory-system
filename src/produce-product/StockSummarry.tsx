const StockSummary = ({ sorted }: any) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-stone-200">
      <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-1">
        <span>📊</span> <span>Current Stock Summary</span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
        {sorted.map((stock: any) => (
          <div
            key={stock._id}
            className="flex justify-between items-center bg-stone-50 p-2 rounded-md border border-stone-200"
          >
            <span className="truncate">{stock.name}</span>
            <span className="font-semibold text-stone-800">
              {stock.totalUnits.toFixed(2)} units
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockSummary;
