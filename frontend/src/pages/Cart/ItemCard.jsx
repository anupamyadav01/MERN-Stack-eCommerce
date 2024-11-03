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
  // const product = useSelector((state) => state.cart.cartItems);
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
    <div className="w-full grid grid-cols-6 gap-10 mb-4 border py-2">
      <div className="flex col-span-2 items-center gap-4 ml-4">
        <img
          className="w-40 h-40"
          src={productId.productImage}
          alt={productId.title}
        />
        <h1 className="font-titleFont font-semibold">{productId.title}</h1>
      </div>
      <div className="col-span-3 flex items-center justify-between py-4 gap-6">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${productId.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => dispatch(decreaseQuantity({ _id: item._id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{quantity}</p>
          <span
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>$ {quantity * productId.price}</p>
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <button
          className="flex items-center justify-center gap-2 border border-black bg-black text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => removeItem(item?.productId?._id)}
        >
          <RiDeleteBin6Line className="text-2xl" />
          <span className="text-lg font-semibold">Remove Item</span>
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
