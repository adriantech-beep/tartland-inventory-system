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
  UserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";

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
      `w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:text-gray-700  ${
        isActive
          ? "bg-blue-500 text-gray-50  font-semibold"
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
    <Sidebar>
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
                    className="hover:bg-blue-200 rounded-md flex items-center"
                  >
                    <SidebarLink
                      to={item.url}
                      icon={item.icon}
                      title={item.title}
                    />
                    {item.title === "Orders" && (
                      <SidebarMenuBadge>5</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <UserRound />
            <span>John Doe</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
