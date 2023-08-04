import { createBrowserRouter } from "react-router-dom";
import DashboardProduct from "../admin/DashBoard";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/home/Home";
import ProductDetail from "../pages/productDetail/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "products", Component: DashboardProduct }],
  },
]);

export default router;
