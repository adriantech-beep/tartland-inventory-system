import DashboardMetrics from "../produced-inventory/DashboardMetrics";
import LowStockProduct from "../stocks-inventory/LowStockProduct";
import StockCount from "../stocks-inventory/StockCount";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Welcome />
      <DashboardMetrics />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StockCount />
        <LowStockProduct />
      </div>
    </div>
  );
};

export default Dashboard;
