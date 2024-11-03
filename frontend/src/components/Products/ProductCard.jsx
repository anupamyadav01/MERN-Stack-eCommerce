/* eslint-disable react/prop-types */
import { RiHeart3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../axiosCongig";
import { useDispatch } from "react-redux";
import { updateCartItems } from "../../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await axiosInstance.post(`/cart/add-to-cart`, {
        productId,
        quantity: 1,
      });

      dispatch(updateCartItems(response?.data?.user?.cartItem));
      if (response.statusCode === 200) {
        toast.success("Product added to cart", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        toast.error("Please login to add to cart", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    }
  };

  return (
    <div className="max-w-sm w-full bg-[#F5F7FA] rounded-2xl shadow-md px-6 py-8 relative">
      <Toaster />
      {/* Product ID */}
      <div className="absolute top-2 right-4 text-xs text-gray-400 border">
        {product?._id}
      </div>
      {/* Product Image */}
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => showProductDetails(product?._id)}
      >
        <img
          className="w-60 h-64 object-cover"
          src={product?.productImage}
          alt={product?.title}
        />
      </div>
      {/* Wishlist and Compare Icons */}
      <div className="absolute top-10 right-6 flex flex-col items-center space-y-2">
        <RiHeart3Fill className="text-[#5C5F80] hover:scale-105 hover:text-pink-600 hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#EDEFF3] p-2 rounded-full w-12 h-12 shadow-md" />
      </div>
      {/* Product Title */}
      <h2 className="text-lg font-medium text-gray-900 mt-4">
        {product?.title}
      </h2>
      {/* Rating and Reviews */}
      <div className="flex items-center mt-2">
        <StarRatings
          rating={product?.rating}
          starRatedColor="gold"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
          isSelectable={false}
        />
        <span className="ml-2 text-gray-600 text-sm">
          ({product?.ratings?.length})
        </span>
      </div>
      {/* Price and Discount */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="text-base text-gray-400 flex gap-1">
            <span className="line-through">${product?.price - 100}</span>
            <span className="text-[10px] text-gray-900 font-medium bg-blue-100 px-2 rounded-sm">
              -10%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 tracking-wider border">
            ${product?.price}
          </div>
        </div>
        <div>
          {/* Add to Cart Button */}
          <button
            className="relative bg-[#2667ff] hover:bg-[#2158d8] hover:scale-105 transition duration-200 text-white p-3 rounded shadow-md"
            onClick={() => handleAddToCart(product._id)}
          >
            {/* Cart Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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
    </div>
  );
};

export default ProductCard;
