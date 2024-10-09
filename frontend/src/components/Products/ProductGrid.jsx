/* eslint-disable react/prop-types */
import ProductCard from "./ProductCard";

// const products = [
//   {
//     name: "Google Pixel Buds",
//     price: 69,
//     image:
//       "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFwcGxlJTIwaXBob25lfGVufDB8fDB8fHww",
//   },
//   {
//     name: "Google Pixel Stand",
//     price: 35,
//     image:
//       "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UF1000,1000_QL80_.jpg",
//   },
//   {
//     name: "Pixel 4 Case",
//     price: 35,
//     image:
//       "https://isolutions.pt/6245-large_default/iphone-14-azul-512gb-novo.jpg",
//   },
//   {
//     name: "Google Pixel Buds",
//     price: 69,
//     image:
//       "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFwcGxlJTIwaXBob25lfGVufDB8fDB8fHww",
//   },
//   // Add more product objects here
// ];

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
