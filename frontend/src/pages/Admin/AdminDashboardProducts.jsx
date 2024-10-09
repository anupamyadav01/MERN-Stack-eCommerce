import { useState } from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AddProduct from "../../components/Admin/Product/AddProduct";
import AllProducts from "../../components/Admin/Product/AllProducts";
import { FaPlus } from "react-icons/fa";

const AdminDashboardProducts = () => {
  const [isAddProductVisible, setAddProductVisible] = useState(false);

  const handleAddProductClick = () => {
    setAddProductVisible(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <div className="w-[80px] fixed top-1/2 -translate-y-1/2 left-0 shadow-2xl rounded-md overflow-hidden">
          <AdminSideBar />
        </div>
        <div className="flex-1 ml-[80px] p-6 overflow-scroll">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddProductClick}
              className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              <FaPlus className="mr-2" />
              Add Product
            </button>
          </div>
          <AllProducts />
          {isAddProductVisible && (
            <div className="w-full fixed top-20 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="w-[80%] rounded-lg shadow-lg relative container">
                <AddProduct setAddProductVisible={setAddProductVisible} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
