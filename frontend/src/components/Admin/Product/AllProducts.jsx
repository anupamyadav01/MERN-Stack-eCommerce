import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { updateProductsArray } from "../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axiosCongig";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axiosInstance.get(`/product/get-all-products`);

        dispatch(updateProductsArray(response?.data?.products));
      } catch (error) {
        console.log(error);
      }
    };
    getProductsData();
  }, [dispatch]);

  const onProductDelete = async (productId) => {
    try {
      const response = await axiosInstance.delete(
        `/product/delete/${productId}`,
        {
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const viewProductDetails = (productId) => {
    console.log(productId);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <div className="container mx-auto p-6 bg-white">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Product List
        </h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="border border-gray-300 py-3 px-4 text-left">ID</th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Product Name
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Price
              </th>
              <th className="border border-gray-300 py-3 px-4 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-normal">
            {products.map((product) => (
              <tr
                key={product._id + product.name}
                className="hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="border border-gray-300 py-3 px-4">
                  {product._id}
                </td>
                <td className="border border-gray-300 py-3 px-4">
                  {product.title}
                </td>
                <td className="border border-gray-300 py-3 px-4">
                  ${product?.price?.toFixed(2)}
                </td>
                <td className="border border-gray-300 py-3 px-4 text-center flex gap-4 justify-center">
                  <button
                    onClick={() => onProductDelete(product._id)}
                    className="flex items-center bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                  >
                    <AiOutlineDelete className="mr-1 text-xl" />
                    Delete
                  </button>
                  <button
                    onClick={() => viewProductDetails(product._id)} // Replace onEdit with your edit function
                    className="flex items-center bg-yellow-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
                  >
                    <FaEye className="mr-1 text-xl" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
