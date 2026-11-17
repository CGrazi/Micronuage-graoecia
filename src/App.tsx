import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { CartProvider } from "@/components/CartContext";
import NotFound from "@/pages/NotFound";
import { routes } from "@/routes";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.Page />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
