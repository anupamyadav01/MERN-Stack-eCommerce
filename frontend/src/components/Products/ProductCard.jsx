/* eslint-disable react/prop-types */
import { RiHeart3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../axiosCongig";
import { useState, useEffect } from "react";

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time for the skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const showProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (prodId) => {
    console.log(prodId);

    try {
      await axiosInstance.post(`/product/addToCart/${prodId}`, {
        productId: prodId,
      });
      toast.success("Product added to cart successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.log("ERROR FROM ADD TO CART", error);
    }
  };

  if (isLoading) {
    // Skeleton Loader
    return (
      <div className="max-w-sm w-full bg-[#F5F7FA] rounded-xl shadow-md px-4 py-6 sm:px-6 sm:py-8 relative animate-pulse">
        <div className="w-full h-48 sm:w-60 sm:h-64 bg-gray-300 rounded-lg"></div>
        <div className="mt-4 h-4 w-3/4 bg-gray-300 rounded"></div>
        <div className="mt-2 h-3 w-1/2 bg-gray-300 rounded"></div>
        <div className="mt-4 flex items-center space-x-4">
          <div className="h-6 w-12 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
        <div className="mt-4 h-8 w-1/3 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full bg-[#F5F7FA] rounded-xl shadow-md px-4 py-6 sm:px-6 sm:py-8 relative">
      <Toaster />
      {/* Product ID */}
      <div className="absolute top-2 right-4 text-xs text-gray-400">
        {product?._id}
      </div>
      {/* Product Image */}
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => showProductDetails(product?._id)}
      >
        <img
          className="w-full h-48 object-cover rounded-lg sm:w-60 sm:h-64"
          src={product?.productImage}
          alt={product?.title}
        />
      </div>
      {/* Wishlist */}
      <div className="absolute top-8 right-4 flex flex-col items-center space-y-2">
        <RiHeart3Fill className="text-[#5C5F80] hover:text-pink-600 transition-all duration-300 cursor-pointer bg-[#EDEFF3] p-2 rounded-full w-10 h-10 shadow-md sm:w-12 sm:h-12" />
      </div>
      {/* Product Title */}
      <h2 className="text-sm sm:text-lg font-medium text-gray-900 mt-3 sm:mt-4">
        {product?.title}
      </h2>
      {/* Rating and Reviews */}
      <div className="flex items-center mt-2">
        <StarRatings
          rating={product?.rating}
          starRatedColor="gold"
          numberOfStars={5}
          name="rating"
          starDimension="16px"
          starSpacing="1px"
          isSelectable={false}
        />
        <span className="ml-2 text-gray-600 text-xs sm:text-sm">
          ({product?.ratings?.length})
        </span>
      </div>
      {/* Price and Discount */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="text-xs sm:text-base text-gray-400 flex gap-1">
            <span className="line-through">${product?.price - 100}</span>
            <span className="text-[10px] sm:text-xs text-gray-900 font-medium bg-blue-100 px-2 rounded-sm">
              -10%
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            ${product?.price}
          </div>
        </div>
        {/* Add to Cart Button */}
        <button
          className="bg-[#2667ff] hover:bg-[#2158d8] transition duration-200 text-white p-2 sm:p-3 rounded shadow-md"
          onClick={() => handleAddToCart(product._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
