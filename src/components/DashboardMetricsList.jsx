import PureFlakesImg from "../assets/pure-flakes.png";
import ChocoFlakesImg from "../assets/choco-flakes.png";

const DashboardMetricsList = ({ produced }) => {
  const { flavor, totalBundles } = produced;
  console.log(flavor);

  const imagePath = flavor === "Pure Crunch" ? PureFlakesImg : ChocoFlakesImg;
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-cocoa/10 shadow hover:shadow-md transition-all">
      <div className="flex items-center justify-evenly w-full ">
        <div className="max-w-24">
          <img src={imagePath} />
        </div>
        <p className="text-sm font-display text-cocoa dark:text-stone-800">
          {flavor}
        </p>
        <p className="text-2xl font-bold text-cocoa dark:text-stone-800 font-sans ">
          {totalBundles}
        </p>
      </div>
    </div>
  );
};

export default DashboardMetricsList;
