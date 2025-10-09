import PureFlakesImg from "@/assets/pure-flakes.png";
import ChocoFlakesImg from "@/assets/choco-flakes.png";
import { useGetAvailableStock } from "@/orders/useGetAvailableStock";

const DashboardMetricsList = () => {
  const { data: available = [] } = useGetAvailableStock();

  const getImageForFlavor = (flavor: string) => {
    switch (flavor) {
      case "Pure Crunch":
        return PureFlakesImg;
      case "Choco Crunch":
        return ChocoFlakesImg;
      default:
        return PureFlakesImg;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {available.map((item: { flavor: any; availableBundles: any }) => {
        const { flavor, availableBundles } = item;
        const imagePath = getImageForFlavor(flavor);

        return (
          <div
            key={flavor}
            className="flex items-center justify-between p-5 rounded-2xl bg-white border border-cocoa/10 shadow hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-evenly w-full">
              <div className="max-w-24">
                <img
                  src={imagePath}
                  alt={flavor}
                  className="object-contain w-full h-auto"
                />
              </div>
              <p className="text-sm font-display text-cocoa dark:text-stone-800">
                {flavor}
              </p>
              <p className="text-2xl font-bold text-cocoa dark:text-stone-800 font-sans">
                {availableBundles}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardMetricsList;
