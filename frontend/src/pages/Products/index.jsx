import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../../components/Products/ProductGrid";
import ProductNav from "../../components/Products/ProductNav";
import Sidebar from "../../components/Products/Sidebar";
import { useEffect } from "react";
import axios from "axios";
import { updateCartItems } from "../../redux/slices/cartSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/product/get-products`
        );
        if (response.status === 200) {
          dispatch(updateCartItems(response?.data?.products));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductsData();
  }, []);
  console.log(products);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProductNav />
      <div className="flex">
        <Sidebar />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Products;
