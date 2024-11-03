import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/Breadcrumbs";
import ItemCard from "./ItemCard";
import { updateCartItems } from "../../redux/slices/cartSlice";
import { emptyCart } from "../../assets/images";
import axiosInstance from "../../axiosCongig";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axiosInstance.get("/cart/getAllCartItems");
        dispatch(updateCartItems(response?.data));
      } catch (error) {
        console.log("ERROR IN CART PAGE", error);
      }
    };
    getCartItems();
  }, [dispatch]);

  // Calculate subtotal and total amount
  useEffect(() => {
    let price = 0;
    cartItems?.forEach((item) => {
      const itemPrice = item.productId.price;
      const discount = (itemPrice * item.productId.discountPercentage) / 100;
      const discountedPrice = itemPrice - discount;
      price += discountedPrice * item.quantity;
    });
    setTotalAmt(price);
  }, [cartItems]);

  // Set shipping charge based on total amount
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const resetCart = async () => {
    try {
      const response = await axiosInstance.post("/cart/resetCart");
      dispatch(updateCartItems(response?.data?.updatedData?.cartItem));
    } catch (error) {
      console.log("Cart reset", error);
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {cartItems?.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] grid grid-cols-6 gap-10 place-content-center px-6 text-lg font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {cartItems?.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>

          <button
            onClick={resetCart}
            className="flex items-center gap-2 py-3 px-8 bg-red-600 text-white font-semibold uppercase rounded-lg shadow-lg mb-4 hover:bg-red-700 duration-75 transform hover:scale-105"
          >
            <FiRefreshCcw className="text-xl" />
            Reset Cart
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-8 px-6 items-center gap-4 mdl:gap-0 bg-gray-50 rounded-lg shadow-md">
            <div className="flex items-center justify-center gap-4 w-full mdl:w-auto">
              <input
                className="w-52 h-10 px-4 border border-gray-300 rounded-lg text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                type="text"
                placeholder="Enter Coupon Code"
              />
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl transform hover:scale-105 transition duration-200 ease-in-out">
                Apply Coupon
              </button>
            </div>
            <button className="mt-6 text-lg font-semibold text-indigo-600 bg-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-100 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
              Update Cart
            </button>
          </div>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ₹{totalAmt.toFixed(2)}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ₹{shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ₹{(totalAmt + shippingCharge).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/products">
              <button className="bg-[#262626] rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
