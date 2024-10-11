/* eslint-disable react/prop-types */
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
