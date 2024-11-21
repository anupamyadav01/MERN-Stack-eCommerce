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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const totalPages = Math.ceil(products?.length / productsPerPage);

  // Slice the products to display based on the current page
  const currentProducts = products?.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

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

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProductNav
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        setSortByValue={setSortByValue}
        sortByValue={sortByValue}
      />
      <div className="flex justify-center items-start flex-col lg:flex-row">
        {/* Sidebar - Adjusted for responsiveness */}
        <div className="w-full lg:w-1/4 px-4 lg:px-0 mb-4 lg:mb-0">
          <Sidebar
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>

        {/* Product Grid - Flex container to make it responsive */}
        <div className="flex-1">
          <ProductGrid products={currentProducts} />
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded-l-md"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded-r-md"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
