/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItems } from "../../../redux/slices/cartSlice";

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
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Available Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
