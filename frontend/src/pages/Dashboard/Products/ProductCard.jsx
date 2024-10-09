// /* eslint-disable react/prop-types */
// import ReactStars from "react-rating-stars-component";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
//       {/* Product Image */}
//       <img
//         className="w-full object-fill"
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRhb8uI0vKINdZJCfOmdIWu0uMBsKNCzlAk2myawr1rr3xFE-5g_B575p5H9V5S5nH3E&usqp=CAU"
//         alt={product.title}
//       />

//       {/* Product Details */}
//       <div className="px-6 py-4 text-left">
//         {/* Product Title */}
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">
//           {product.title}
//         </h2>

//         {/* Description */}
//         <p className="text-gray-600 text-sm mb-4 leading-relaxed">
//           {product.description}
//         </p>

//         {/* Price */}
//         <div className="flex items-center justify-between">
//           <div className="text-gray-900 font-bold text-lg mb-2">
//             €{product.price}
//           </div>

//           {/* Brand and Category */}
//           <div className="mb-4">
//             <p className="text-gray-500 text-sm">
//               <span className="font-semibold">Brand:</span> {product.brand}
//             </p>
//             <p className="text-gray-500 text-sm">
//               <span className="font-semibold">Category:</span>{" "}
//               {product.category}
//             </p>
//           </div>
//         </div>

//         {/* Rating */}
//         <div className="flex items-center mb-2">
//           <ReactStars
//             count={5}
//             value={product.rating}
//             size={18}
//             activeColor="#ffd700"
//             edit={false}
//           />
//           <span className="ml-2 text-gray-600 text-sm">
//             {product.rating} / 5
//           </span>
//         </div>

//         {/* Stock */}
//         <div className="text-xs text-gray-500">
//           <span className="font-semibold">Stock:</span> {product.stock} left
//         </div>
//       </div>

//       {/* Add to Cart Button */}
//       <div className="px-6 pb-4 text-center">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-all duration-300">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from "react";

const ProductCard = () => {
  return <div>ProductCard</div>;
};

export default ProductCard;
