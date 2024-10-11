import ProductGrid from "../../components/Products/ProductGrid";
import ProductNav from "../../components/Products/ProductNav";
import Sidebar from "../../components/Products/Sidebar";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { updateProductsArray } from "../../redux/slices/productSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [sortByValue, setSortByValue] = useState("All");

  const [filterOptions, setFilterOptions] = useState({
    sortbyprice: null,
    sortbyrating: null,
    brands: [],
    types: [],
    discount: null,
  });
  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axios.get(`/product/get-all-products`);

        if (response.status === 200) {
          setProducts(response?.data?.products);
          dispatch(updateProductsArray(response?.data?.products));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductsData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProductNav
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        setSortByValue={setSortByValue}
        sortByValue={sortByValue}
      />
      <div className="flex">
        <Sidebar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
