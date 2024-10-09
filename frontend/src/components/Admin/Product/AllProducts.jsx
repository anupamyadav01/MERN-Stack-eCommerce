import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai"; // Import the delete icon
import { FaEye } from "react-icons/fa";

const AllProducts = () => {
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/product/get-products"
        );
        console.log("products", response);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);
  const [products, setProducts] = useState([]);

  const onDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const onEdit = () => {};

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
                    onClick={() => onDelete(product.id)}
                    className="flex items-center bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                  >
                    <AiOutlineDelete className="mr-1 text-xl" />
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(product.id)} // Replace onEdit with your edit function
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
