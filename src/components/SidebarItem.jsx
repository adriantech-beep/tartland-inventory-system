import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-blue-600 text-raspberry font-semibold"
            : "text-cocoa dark:text-stone-800 hover:bg-blue-100 dark:hover:bg-blue-200"
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
};

export default SidebarItem;
