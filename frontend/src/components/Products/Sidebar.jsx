/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  customerRating,
  discount,
  productsBrand,
  productsPriceRange,
} from "../../constants/sortingAndFiltering";
import axiosInstance from "../../axiosCongig";
import { useDispatch } from "react-redux";
import { updateProductsArray } from "../../redux/slices/productSlice";

const initialFilterOptions = {
  sortbyprice: null,
  sortbyrating: null,
  brands: [],
  types: [],
  discount: null,
};

const Sidebar = ({ filterOptions, setFilterOptions }) => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

  const handlePriceChange = (price) => {
    setFilterOptions({
      ...filterOptions,
      sortbyprice: { min: price.min, max: price.max },
    });
  };

  const handleRatingChange = (rating) => {
    setFilterOptions({
      ...filterOptions,
      sortbyrating: rating.value,
    });
  };

  const handleBrandChange = (brand) => {
    const isSelected = filterOptions.brands.includes(brand);
    const updatedBrands = isSelected
      ? filterOptions.brands.filter((b) => b !== brand)
      : [...filterOptions.brands, brand];
    setFilterOptions({
      ...filterOptions,
      brands: updatedBrands,
    });
  };

  const handleDiscountChange = (discount) => {
    setFilterOptions({
      ...filterOptions,
      discount: discount.value,
    });
  };

  const handleResetFilters = () => {
    setFilterOptions(initialFilterOptions);
  };

  useEffect(() => {
    const getFilteredData = async () => {
      try {
        const updatedProducts = await axiosInstance.get(
          `/product/get-all-products`,
          {
            params: filterOptions,
          }
        );
        dispatch(updateProductsArray(updatedProducts?.data?.products));
      } catch (error) {
        console.log("Error during filtering data", error);
      }
    };
    getFilteredData();
  }, [dispatch, filterOptions]);

  return (
    <div>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-4 lg:hidden"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters Container */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } lg:block bg-white p-4 lg:p-6 shadow-md`}
      >
        <h2 className="font-semibold text-lg mb-4">Filters</h2>

        {/* Filters in Grid Layout */}
        <div className="grid grid-cols-1 gap-4">
          {/* Price Filter */}
          <div>
            <h3 className="font-medium mb-2">Price Based</h3>
            <div className="space-y-1">
              {productsPriceRange.map((price) => (
                <label key={price.label} className="block">
                  <input
                    type="radio"
                    name="sortbyprice"
                    value={price.label}
                    className="mr-2"
                    checked={
                      filterOptions.sortbyprice &&
                      filterOptions.sortbyprice.min === price.min &&
                      filterOptions.sortbyprice.max === price.max
                    }
                    onChange={() => handlePriceChange(price)}
                  />
                  {price.label}
                </label>
              ))}
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div>
            <h3 className="font-medium mb-2">Customer Rating</h3>
            <div className="space-y-1">
              {customerRating.map((rating) => (
                <label key={rating.label} className="block">
                  <input
                    type="radio"
                    name="sortbyrating"
                    value={rating.label}
                    className="mr-2"
                    checked={filterOptions.sortbyrating === rating.value}
                    onChange={() => handleRatingChange(rating)}
                  />
                  {rating.label}
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filtering */}
          <div>
            <h3 className="font-medium mb-2">Product Brand</h3>
            <div className="space-y-1">
              {productsBrand.map((brand) => (
                <label className="block" key={brand}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={brand}
                    checked={filterOptions.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Discount Filtering */}
          <div>
            <h3 className="font-medium mb-2">Discount</h3>
            <div className="space-y-1">
              {discount.map((discountItem) => (
                <label key={discountItem.label} className="block">
                  <input
                    type="radio"
                    name="sortbydiscount"
                    className="mr-2"
                    value={discountItem.value}
                    checked={filterOptions.discount === discountItem.value}
                    onChange={() => handleDiscountChange(discountItem)}
                  />
                  {discountItem.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons for Apply and Reset */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4">
          Apply Filters
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md w-full mt-2"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
