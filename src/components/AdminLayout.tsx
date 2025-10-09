import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.tsx";
import { ModeToggle } from "./ModeToggle";
import Account from "@/account/Account";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="w-full col-span-10 row-span-11 col-start-3 row-start-2 overflow-y-scroll p-2">
        <div className="flex items-center gap-2 justify-end mb-2">
          <Account />
          <ModeToggle />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
