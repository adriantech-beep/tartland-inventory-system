const StockSummary = ({ sorted }: any) => {
  return (
    <div className="w-full mx-auto p-6 bg-card text-card-foreground rounded-xl border border-border shadow-sm space-y-6 transition-colors">
      <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-200 mb-3 flex items-center gap-1">
        <span>📊</span> <span>Current Stock Summary</span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
        {sorted.map((stock: any) => (
          <div
            key={stock._id}
            className="flex justify-between items-center  bg-card  p-2 rounded-md border border-stone-200 transition-colors duration-300"
          >
            <span className="truncate">{stock.name}</span>
            <span className="font-semibold text-stone-800 dark:text-stone-100">
              {stock.totalUnits.toFixed(2)} units
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockSummary;
