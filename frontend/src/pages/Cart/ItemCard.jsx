/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const ItemCard = ({ item }) => {
  console.log(item, "item from product card");

  const dispatch = useDispatch();
  return (
    <div className="w-full grid grid-cols-6 gap-10 mb-4 border py-2">
      <div className="flex col-span-2 items-center gap-4 ml-4">
        <img className="w-32 h-32" src={item.productImage} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.title}</h1>
      </div>
      <div className="col-span-3 flex items-center justify-between py-4  gap-6">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => dispatch(decreaseQuantity({ _id: item._id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{1}</p>
          <span
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>$ {1 * item.price}</p>
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <button
          className="flex items-center justify-center gap-2 border border-black bg-black text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => dispatch(removeFromCart({ _id: item._id }))}
        >
          <RiDeleteBin6Line className="text-2xl" />
          <span className="text-lg font-semibold">Remove Item</span>
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
