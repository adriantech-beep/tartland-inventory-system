import "@fontsource/audiowide";
import "@fontsource/orbitron/700.css";
import "@fontsource/rajdhani/500.css";
import {
  LayoutDashboard,
  BadgePlus,
  Candy,
  LogOut,
  ListOrdered,
  Settings2,
  Blend,
  PackageSearch,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className="col-span-2 row-span-11 row-start-2
        bg-white
        border-r border-blue-4000 dark:border-blue-600 
        p-6 flex flex-col gap-4 hide-sidebar:static hide-sidebar:translate-x-0 hide-sidebar:h-auto
        "
    >
      <h2 className="text-stone-800 text-lg font-display text-apricot font-bold mb-3">
        Menu
      </h2>

      <nav className="flex flex-col gap-1">
        <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem to="/orders" icon={ListOrdered} label="Orders" />
        <SidebarItem to="/products" icon={Candy} label="Products" />
        <SidebarItem to="/add-product" icon={BadgePlus} label="Add Product" />
        <SidebarItem
          to="/produce"
          icon={PackageSearch}
          label="Produce Product"
        />

        <SidebarItem
          to="/material-settings"
          icon={Settings2}
          label="Material Settings"
        />
        <SidebarItem
          to="/mixture-settings"
          icon={Blend}
          label="Mixture Settings"
        />
      </nav>

      <div className="mt-8 pt-4 border-t border-cocoa border-blue-600">
        <button className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-red-500 hover:bg-apricot/20 dark:hover:bg-red-900/20 transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
