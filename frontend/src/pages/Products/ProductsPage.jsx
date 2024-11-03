import ProductGrid from "../../components/Products/ProductGrid";
import ProductNav from "../../components/Products/ProductNav";
import Sidebar from "../../components/Products/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductsArray } from "../../redux/slices/productSlice";
import axiosInstance from "../../axiosCongig";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.products?.products);
  const [sortByValue, setSortByValue] = useState("All");

  const [filterOptions, setFilterOptions] = useState({
    sortbyprice: null,
    sortbyrating: null,
    brands: [],
    types: [],
    discount: null,
    sortByValue,
  });

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axiosInstance.get(`/product/get-all-products`);
        if (response.status === 200) {
          dispatch(updateProductsArray(response?.data?.products));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductsData();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProductNav
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        setSortByValue={setSortByValue}
        sortByValue={sortByValue}
      />
      <div className="flex border border-black justify-center items-start">
        <div className="w-1/4">
          <Sidebar
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
