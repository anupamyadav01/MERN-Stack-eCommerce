/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  customerRating,
  discount,
  productsBrand,
  productsPriceRange,
  productsType,
} from "../../constants/sortingAndFiltering";
import axiosInstance from "../../axiosCongig";

const Sidebar = ({ filterOptions, setFilterOptions }) => {
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

  const handleProductTypeChange = (type) => {
    const isTypeSelected = filterOptions.types.includes(type);
    const updatedProductTypes = isTypeSelected
      ? filterOptions.types.filter((t) => t !== type)
      : [...filterOptions.types, type];

    setFilterOptions({
      ...filterOptions,
      types: updatedProductTypes,
    });
  };

  const handleDiscountChange = (discount) => {
    setFilterOptions({
      ...filterOptions,
      discount: discount.value,
    });
  };
  console.log(filterOptions);

  useEffect(() => {
    const getFilteredData = async () => {
      try {
        const response = await axiosInstance.get(`/product/get-all-products`, {
          params: filterOptions,
        });
        console.log(response);
      } catch (error) {
        console.log("error during filtering data", error);
      }
    };
    getFilteredData();
  }, [filterOptions]);

  return (
    <div className="w-64 bg-white p-6 shadow-md lg:block">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Based</h3>
        <div className="space-y-1">
          {productsPriceRange.map((price) => (
            <label key={price.label} className="block">
              <input
                type="radio"
                name="sortbyprice"
                value={price.label}
                className="mr-2"
                onChange={() => handlePriceChange(price)}
              />{" "}
              {price.label}
            </label>
          ))}
        </div>
      </div>

      {/* Customer rating filter  */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Customer Rating</h3>
        <div className="space-y-1">
          {customerRating.map((rating) => (
            <label key={rating.label} className="block">
              <input
                type="radio"
                name="sortbyrating"
                value={rating.label}
                className="mr-2"
                onChange={() => handleRatingChange(rating)}
              />{" "}
              {rating.label}
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filtering */}
      <div className="mb-6">
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

      {/* Product Type Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Product Type</h3>
        <div className="space-y-1">
          {productsType.map((type) => (
            <label className="block" key={type}>
              <input
                type="checkbox"
                className="mr-2"
                value={type}
                checked={filterOptions.types.includes(type)}
                onChange={() => handleProductTypeChange(type)}
              />{" "}
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Discount Filtering */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Discount</h3>
        <div className="space-y-1">
          {discount.map((discount) => (
            <label key={discount.label} className="block">
              <input
                type="radio"
                name="sortbydiscount"
                className="mr-2"
                value={discount.value}
                onChange={() => handleDiscountChange(discount)}
              />{" "}
              {discount.label}
            </label>
          ))}
        </div>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4">
        Apply Filters
      </button>

      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md w-full mt-2"
        onClick={() => setFilterOptions({})}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;
