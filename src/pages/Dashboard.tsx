import DashboardMetricsList from "@/components/DashboardMetricsList";
import Welcome from "@/components/Welcome";
import MonthlySalesSummary from "@/sales-data/MonthlySalesSummary";
import LowStockProduct from "@/stocks-inventory/LowStockProduct";
import StockCount from "@/stocks-inventory/StockCount";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Welcome />
      <DashboardMetricsList />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StockCount />
        <LowStockProduct />
      </div>
      <div>
        <MonthlySalesSummary />
      </div>
    </div>
  );
};

export default Dashboard;
