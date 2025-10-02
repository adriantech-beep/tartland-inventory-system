import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BadgePlus,
  Candy,
  ListOrdered,
  Settings2,
  Blend,
  PackageSearch,
  LogOutIcon,
  Settings,
} from "lucide-react";

const sidebarGroups = [
  {
    label: "Menu",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Settings", url: "/", icon: Settings },
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
      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-gray-100 font-semibold"
          : "text-muted-foreground hover:bg-muted/10"
      }`
    }
  >
    <Icon size={18} />
    <span>{title}</span>
  </NavLink>
);

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <img src="/logo.png" alt="App Logo" className="h-8 w-8" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex items-center"
                  >
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

      {/* <SidebarFooter>
        <button className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors w-full text-left">
        <LogOutIcon size={18} />
        Logout
        </button>
        </SidebarFooter> */}
    </Sidebar>
  );
};

export default AppSidebar;
