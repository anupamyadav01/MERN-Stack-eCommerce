import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Button from "@mui/material/Button";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const AllSellers = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  // Hardcoded sellers data to replace dynamic fetching from API or Redux
  const sellers = [
    {
      _id: "1",
      name: "Seller One",
      email: "seller1@example.com",
      address: "123 Main Street",
      createdAt: "2023-09-10",
    },
    {
      _id: "2",
      name: "Seller Two",
      email: "seller2@example.com",
      address: "456 Elm Street",
      createdAt: "2023-08-25",
    },
    {
      _id: "3",
      name: "Seller Three",
      email: "seller3@example.com",
      address: "789 Oak Avenue",
      createdAt: "2023-10-01",
    },
  ];

  // Simulate a function to delete a seller without axios or API
  const handleDelete = (id) => {
    console.log(`Seller with ID ${id} deleted`);
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "previewShop",
      flex: 1,
      minWidth: 150,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/shop/preview/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "deleteSeller",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => setUserId(params.id) || setOpen(true)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  // Create row data from the hardcoded sellers array
  const row = sellers.map((item) => ({
    id: item._id,
    name: item.name,
    email: item.email,
    joinedAt: item.createdAt.slice(0, 10),
    address: item.address,
  }));

  return (
    <div className="w-full flex justify-center pt-5 max-w-[90%] mx-auto">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you want to delete this seller?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => handleDelete(userId)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
