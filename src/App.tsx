import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
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
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CompanySettingsPage from "./pages/CompanySettingsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="company-settings"
                element={<CompanySettingsPage />}
              />
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

            <Route index element={<Navigate to="/login" replace />} />
          </Routes>
        </HashRouter>
        <Toaster position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
