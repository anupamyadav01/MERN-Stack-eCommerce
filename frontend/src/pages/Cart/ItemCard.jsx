/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  increaseQuantity,
  decreaseQuantity,
  updateCartItems,
} from "../../redux/slices/cartSlice";
import axiosInstance from "../../axiosCongig";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const removeItem = async (itemId) => {
    try {
      const response = await axiosInstance.post("/cart/removeItem", { itemId });
      dispatch(updateCartItems(response?.data?.updatedData?.cartItem));
    } catch (error) {
      console.log("ERROR FROM REMOVE ITEM", error);
    }
  };

  const { productId, quantity } = item;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 lg:grid-cols-6 gap-4 md:gap-6 py-4 px-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {/* Product Image and Title */}
      <div className="col-span-1 sm:col-span-2 flex items-center gap-4">
        <img
          className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-md border border-gray-200 shadow-sm"
          src={productId?.productImage}
          alt={productId?.title}
        />
        <h1 className="font-semibold text-sm md:text-lg lg:text-xl text-gray-800">
          {productId?.title}
        </h1>
      </div>

      {/* Price, Quantity, and Subtotal */}
      <div className="col-span-3 flex flex-col md:flex-row items-center justify-between text-center sm:text-left py-2 sm:py-0 gap-4 md:gap-6">
        <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-600">
          ₹{productId?.price}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(decreaseQuantity({ _id: item._id }))}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-800 font-bold rounded-md hover:bg-gray-200 active:bg-gray-300 transition"
          >
            -
          </button>
          <span className="text-sm md:text-base font-medium text-gray-700">
            {quantity}
          </span>
          <button
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-800 font-bold rounded-md hover:bg-gray-200 active:bg-gray-300 transition"
          >
            +
          </button>
        </div>

        <p className="text-sm md:text-base lg:text-lg font-bold text-gray-800">
          ₹{(quantity * productId?.price)?.toFixed(2)}
        </p>
      </div>

      {/* Remove Item */}
      <div className="col-span-1 flex items-center justify-center">
        <button
          onClick={() => removeItem(item?.productId?._id)}
          className="flex items-center gap-2 bg-red-500 text-white text-sm md:text-base px-4 py-2 rounded-md hover:bg-red-600 active:bg-red-700 transition-all duration-200 shadow-sm transform hover:scale-105"
        >
          <RiDeleteBin6Line className="text-lg md:text-xl" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
