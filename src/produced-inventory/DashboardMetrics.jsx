import DashboardMetricsList from "../components/DashboardMetricsList";
import { useGetProductsProduced } from "./useGetProductsProduced";

const DashboardMetrics = () => {
  const { data: producedProducts = [] } = useGetProductsProduced();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-4 p-2">
      {producedProducts.map((produced) => (
        <DashboardMetricsList key={produced.id} produced={produced} />
      ))}
    </section>
  );
};

export default DashboardMetrics;
