import ProductGrid from "../../components/Products/ProductGrid";
import ProductNav from "../../components/Products/ProductNav";
import Sidebar from "../../components/Products/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  // const products = useSelector((state) => state.products.Products);
  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/product/get-all-products`
        );

        if (response.status === 200) {
          setProducts(response?.data?.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductsData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProductNav />
      <div className="flex">
        <Sidebar />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Products;
