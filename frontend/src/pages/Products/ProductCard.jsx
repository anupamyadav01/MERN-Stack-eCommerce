/* eslint-disable react/prop-types */

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-lg">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
        <p className="text-gray-500 text-sm mt-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl text-blue-500 font-bold">
            ${product.price}
          </span>
          <span className="text-sm text-green-600 font-semibold">
            {product.discountPercentage}% OFF
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-yellow-400 text-sm font-bold">
            Rating: {product.rating} ⭐
          </span>
          <span className="text-sm text-gray-600">Stock: {product.stock}</span>
        </div>
        <button className="w-full bg-blue-500 text-white font-bold py-2 mt-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
