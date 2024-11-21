import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
  FaSearch,
  FaUser,
  FaCaretDown,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { paginationItems } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axiosCongig";
import toast, { Toaster } from "react-hot-toast";
import { updateLoginState, updateUser } from "../../../redux/slices/userSlice";

const HeaderBottom = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const userDetails = useSelector((state) => state.user.userInfo);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [setShowSearchBar] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref?.current?.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  useEffect(() => {
    const getWishlistItems = async () => {
      try {
        const response = await axiosInstance.get(
          "/product/getAllWishlistItems"
        );
        console.log(response);
      } catch (error) {
        console.log("ERROR IN FETCHING WISHLIST ITEMS", error);
      }
    };
    getWishlistItems();
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleSignOut = async () => {
    if (!userDetails) {
      navigate("/signin");
    }
    try {
      const response = await axiosInstance.post("/user/logout");
      if (response.status === 200) {
        dispatch(updateLoginState(false));
        dispatch(updateUser(null));
      }

      toast.success("User Logout successfully", {
        position: "top-right",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <Toaster />
      <div className="container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full pb-4 lg:pb-0 h-full lg:h-24 px-2">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">All Categories</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 z-50 bg-[#262626] rounded-md w-auto text-[#767676] h-auto p-4 pb-6"
              >
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Accessories
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Furniture
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Electronics
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Clothes
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Bags
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Home appliances
                </li>
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.productName
                            .toLowerCase()
                            .split(" ")
                            .join("")}`,
                          {
                            state: { item: item },
                          }
                        ) &
                        setShowSearchBar(true) &
                        setSearchQuery("")
                      }
                      key={item._id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                    >
                      <img className="w-24" src={item.img} alt="productImg" />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">
                          {item.productName}
                        </p>
                        <p className="text-xs">{item.des}</p>
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            ${item.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className=" px-4 max-md:w-full flex gap-4 mt-2 lg:mt-0  pr-6 cursor-pointer relative">
            <div className="flex w-full justify-between items-center">
              <div className="w-full lg:w-auto">
                Hi,{" "}
                <span className="font-medium sm:text-xl">
                  {userDetails?.name}
                </span>
              </div>
            </div>

            <div className="flex gap-4 w-full lg:w-auto justify-end items-center">
              {/* User Icon and Dropdown */}
              <div
                onClick={() => setShowUser(!showUser)}
                className="flex items-center"
              >
                <FaUser className="w-5 h-5" />
                <FaCaretDown />
              </div>
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-10 right-0 w-44 z-50 rounded-md bg-[#262626] text-[#767676] h-auto p-4 pb-6 border"
                >
                  <Link>
                    <li
                      className="text-gray-400 px-4 py-1 border-b-[1px] font-normal border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </li>
                  </Link>
                  <Link to="/signup">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Register
                    </li>
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                  >
                    Profile
                  </Link>
                </motion.ul>
              )}

              {/* Wishlist */}
              <Link to="/wishlist">
                <div className="relative">
                  <FaHeart className="w-6 h-6" />
                  <span className="absolute top-[-5px] right-[-8px] text-xs w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white">
                    {userDetails?.wishlist?.length || 0}
                  </span>
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingCart className="w-6 h-6" />
                  <span className="absolute top-[-5px] right-[-8px] text-xs w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white">
                    {cartItems?.length || 0}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
