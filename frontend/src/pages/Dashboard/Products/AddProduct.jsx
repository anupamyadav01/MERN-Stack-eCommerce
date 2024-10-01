import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
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
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/product/add-product`,
        productData,
        {
          withCredentials: true,
        }
      );
      console.log("Product added successfully", response.data);
      // Reset form after successful submission
      // setProductData({
      //   title: "",
      //   description: "",
      //   price: "",
      //   discountPercentage: "",
      //   rating: "",
      //   stock: "",
      //   brand: "",
      //   category: "",
      //   thumbnail: "",
      //   images: [],
      // });
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="text-gray-600 font-semibold">Rating</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={productData.rating}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Rating (out of 5)"
            />
          </div>

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
        </div>

        {/* Category */}
        <div className="flex flex-col">
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

        {/* Thumbnail */}
        <div className="flex flex-col">
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
            multiple
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex mt-4 space-x-4">
            {productData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product"
                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
              />
            ))}
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