import DashboardMetricsList from "../components/DashboardMetricsList";
import { useGetAvailableStock } from "../orders/useGetAvailableStock";

const DashboardMetrics = () => {
  const { data: availableStock = [] } = useGetAvailableStock();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-4 p-2">
      {availableStock.map((available) => (
        <DashboardMetricsList key={available.id} available={available} />
      ))}
    </section>
  );
};

export default DashboardMetrics;
