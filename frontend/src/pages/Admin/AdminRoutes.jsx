import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import AdminDashboardOrders from "./AdminDashboardOrders";
import AdminDashboardSellers from "./AdminDashboardSellers";
import AdminDashboardUsers from "./AdminDashboardUsers";
import AdminDashboardProducts from "./AdminDashboardProducts";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const userInfo = useSelector((state) => state?.user?.userInfo);

  if (userInfo?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="orders" element={<AdminDashboardOrders />} />
      <Route path="sellers" element={<AdminDashboardSellers />} />
      <Route path="users" element={<AdminDashboardUsers />} />
      <Route path="products" element={<AdminDashboardProducts />} />
      {/* Handle any unknown admin routes */}
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;
