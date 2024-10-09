/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const AddProduct = ({ setAddProductVisible }) => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the FileList
    setProductData({ ...productData, productImage: file }); // Store the file in state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each product data to the FormData object
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    try {
      const response = await axios.post(
        `http://localhost:9000/api/product/create-product`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Product added successfully", response.data);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };
  const handleClosePopup = () => {
    setAddProductVisible(false);
  };

  return (
    <div className="container relative bg-white p-8 shadow-md rounded-lg animate-fadeIn">
      <button
        onClick={handleClosePopup}
        className="text-4xl absolute top-3 right-6 text-gray-500 hover:text-gray-700"
      >
        &times; {/* Close icon */}
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Add New Product
      </h2>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Product title"
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Brand</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Brand name"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Product description"
          ></textarea>
        </div>

        {/* Price and Discount */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Price"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">
              Discount Percentage
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={productData.discountPercentage}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Discount %"
            />
          </div>
        </div>

        {/* Rating and Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Available stock"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-600 font-semibold">Category</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Category"
              />
            </div>
          </div>

          {/* Category */}

          {/* Thumbnail */}
          <div className="flex flex-col flex-1">
            <label className="text-gray-600 font-semibold">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              value={productData.thumbnail}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Thumbnail URL"
            />
          </div>
          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Images</label>
            <input
              type="file"
              name="productImage"
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-transform transform hover:scale-105"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
