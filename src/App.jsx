import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/Theme-Provider";

import AdminLayout from "@/components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import OrdersPage from "./pages/OrdersPage";
import AddProductPage from "@/pages/AddProductPage.tsx";
import MixtureSettingsPage from "@/pages/MixtureSettingsPage";
import ProduceProductPage from "@/pages/ProduceProductPage";
import MaterialSettingsPage from "@/pages/MaterialSettingsPage.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HashRouter>
          <Routes>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProductPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="produce" element={<ProduceProductPage />} />

              <Route
                path="material-settings"
                element={<MaterialSettingsPage />}
              />
              <Route
                path="mixture-settings"
                element={<MixtureSettingsPage />}
              />
            </Route>
          </Routes>
        </HashRouter>
        <Toaster position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
