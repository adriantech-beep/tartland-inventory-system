import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BadgePlus,
  Candy,
  ListOrdered,
  Settings2,
  Blend,
  PackageSearch,
  Settings,
  LogOutIcon,
} from "lucide-react";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { useGetCompanyProfile } from "@/company-settings/useGetCompanyProfile";

const sidebarGroups = [
  {
    label: "Menu",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Settings", url: "/company-settings", icon: Settings },
    ],
  },
  {
    label: "Products Menu",
    items: [
      { title: "Orders", url: "/orders", icon: ListOrdered },
      { title: "Products", url: "/products", icon: Candy },
      { title: "Produce Product", url: "/produce", icon: PackageSearch },
    ],
  },
  {
    label: "Materials and Mixtures",
    items: [
      { title: "Add Raw Materials", url: "/add-product", icon: BadgePlus },
      {
        title: "Material Settings",
        url: "/material-settings",
        icon: Settings2,
      },
      { title: "Mixture Settings", url: "/mixture-settings", icon: Blend },
    ],
  },
];

const SidebarLink = ({
  to,
  icon: Icon,
  title,
}: {
  to: string;
  icon: any;
  title: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-blue-500 text-white font-semibold"
          : "text-muted-foreground hover:bg-muted/10 hover:text-gray-800"
      }`
    }
  >
    <Icon size={18} />
    <span>{title}</span>
  </NavLink>
);

const AppSidebar = () => {
  const { data: companyProfile } = useGetCompanyProfile();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast("Logged out successfully");
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex flex-col items-center gap-2 border-b border-muted/30">
        <div className="flex flex-col items-center gap-2">
          <img
            src={companyProfile?.avatar || "/placeholder-company.png"}
            alt="Company Avatar"
            className="h-12 w-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {companyProfile?.companyName || "Your Company"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {companyProfile?.industry || "Set your profile"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarLink
                      to={item.url}
                      icon={item.icon}
                      title={item.title}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 w-full justify-center"
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
