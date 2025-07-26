import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import OrdersPage from "./pages/OrdersPage";
import MaterialSettingsPage from "./pages/MaterialSettingsPage";
import AddProductPage from "./pages/AddProductPage";
import MixtureSettingsPage from "./pages/MixtureSettingsPage";
import ProduceProductPage from "./pages/ProduceProductPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="mixture-settings" element={<MixtureSettingsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}
export default App;
