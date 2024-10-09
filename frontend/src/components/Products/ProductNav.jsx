import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";

const ProductNav = () => {
  const sortByArray = [
    "Featured",
    "Top Rated",
    "Rating - High to Low",
    "Rating - Low to High",
    "Price - Low to High",
    "Price - High to Low",
    "Name - A to Z",
    "Name - Z to A",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [sortByValue, setSortByValue] = useState("Featured");
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-gray-700">Accessories Store</div>
        <div className="flex items-center gap-4 relative">
          <div className="flex items-center gap-2">
            <div className="text-gray-400">Sort By</div>
            <div
              className="flex font-medium items-center cursor-pointer transition duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{sortByValue}</span>
              {isOpen ? (
                <IoIosArrowUp className="text-xl" />
              ) : (
                <IoIosArrowDown className="text-xl" />
              )}
            </div>
          </div>
          <div>
            {isOpen && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-14 right-0 w-max z-50 rounded-md bg-[#262626] text-[#767676] h-auto p-4 pb-6 border"
              >
                <div>
                  {sortByArray.map((item) => (
                    <li
                      key={item}
                      onClick={() => {
                        setSortByValue(item);
                        setIsOpen(false);
                      }}
                      className="text-gray-400 px-2 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </div>
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProductNav;
