import { monthlySalesData } from "../constant/monthlySalesData";

const MonthlySalesSummary = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-stone-800 mb-4">
        📈 Monthly Sales Summary--SAMPLE ONLY
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monthlySalesData.map((month, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md border border-stone-200"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              {month.month}
            </h3>

            <div className="text-sm text-stone-700 space-y-1">
              <p>
                🛒 Orders:{" "}
                <span className="font-medium">{month.totalOrders}</span>
              </p>
              <p>
                💰 Revenue:{" "}
                <span className="font-medium">
                  ₱{month.totalRevenue.toLocaleString()}
                </span>
              </p>
              <p>
                🥫 Jars Sold:{" "}
                <span className="font-medium">{month.totalJarsSold}</span>
              </p>
              <p>
                📦 Bundles Sold:{" "}
                <span className="font-medium">{month.totalBundlesSold}</span>
              </p>
            </div>

            <div className="mt-3 text-xs text-stone-600">
              <p className="font-semibold text-stone-800 mb-1">
                🔥 Top Flavors:
              </p>
              <ul className="space-y-1">
                {month.topFlavors.map((flavor, i) => (
                  <li key={i}>
                    • <span className="font-medium">{flavor.flavor}</span> —{" "}
                    {flavor.jars} jars, {flavor.bundles} bundles
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySalesSummary;
