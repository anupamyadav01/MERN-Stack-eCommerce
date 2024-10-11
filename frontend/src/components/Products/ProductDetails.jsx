import { useEffect, useState } from "react";
import ProductReviews from "./ProductReviews";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosCongig";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      console.log(productId + " inside products detail");
      try {
        const response = await axiosInstance.get(`/product/${productId}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setProduct(response?.data?.product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, [productId]);

  const addToWishlist = async () => {
    try {
      const response = await axiosInstance.get(
        `/product/addToWishlist/${productId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 flex flex-wrap justify-around">
        {/* Image Section */}
        <div className="w-full md:w-1/3 p-4">
          <img
            src={product?.productImage}
            alt={product?.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-3xl font-normal text-gray-700 mb-2">
            {product?.title}
          </h2>
          <div className="flex items-center mb-2">
            {/* Rating Section */}
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg">★★★★☆</span>
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product?.rating?.length}reviews)
            </span>
          </div>

          {/* Product Details */}
          <p className="text-sm text-gray-600 mb-4">
            <strong>Brand:</strong> {product?.brand}
          </p>
          <p className="text-lg font-bold text-gray-800 mb-4">Price: $749</p>
          <p className="text-sm text-gray-600 mb-4">{product?.description}</p>

          {/* Price and Stock Status */}
          <div className="bg-gray-50 border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Price:</span>
              <span className="font-semibold text-gray-800">
                {product?.price}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-500">
                {product?.stock}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Qty</span>
              <select
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded p-2 w-16"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="flex gap-6">
              {" "}
              {/* Adding space between buttons */}
              {/* Add to Cart Button */}
              <button className="w-full bg-black text-white py-3 font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
                <AiOutlineShoppingCart className="mr-2 text-2xl" />
                ADD TO CART
              </button>
              {/* Add to Wishlist Button */}
              <button
                className="w-full bg-gray-300 text-black py-3 font-semibold rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
                onClick={() => addToWishlist(product?._id)}
              >
                <AiOutlineHeart className="mr-2 text-2xl" />
                ADD TO WISHLIST
              </button>
            </div>
          </div>

          {/* Tags Section */}
          <p className="text-sm text-gray-600">
            Tags: Technology-Electronics-Phone; Apple; Technology-New Arrivals
          </p>
        </div>
      </div>
      <ProductReviews />
    </>
  );
};

export default ProductDetails;
