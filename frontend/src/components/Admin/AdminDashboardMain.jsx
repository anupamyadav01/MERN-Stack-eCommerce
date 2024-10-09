import { useEffect } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../components/Loader.jsx";

const AdminDashboardMain = () => {
  // Hard-coded data to simulate orders and sellers (no external fetching)
  const adminOrders = [
    {
      _id: "1",
      cart: [{ qty: 2 }, { qty: 3 }],
      totalPrice: 200,
      status: "Delivered",
      createdAt: "2023-10-01",
    },
    {
      _id: "2",
      cart: [{ qty: 1 }, { qty: 1 }],
      totalPrice: 150,
      status: "Processing",
      createdAt: "2023-10-03",
    },
  ];
  const adminOrderLoading = false; // Static loading state
  const sellers = [
    { id: "1", name: "Seller 1" },
    { id: "2", name: "Seller 2" },
  ];

  // Simulate an admin earnings calculation
  const adminEarning = adminOrders.reduce(
    (acc, item) => acc + item.totalPrice * 0.1,
    0
  );
  const adminBalance = adminEarning.toFixed(2);

  // Data grid columns and rows
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, "status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const rows = adminOrders.map((item) => ({
    id: item._id,
    itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
    total: `${item.totalPrice} $`,
    status: item.status,
    createdAt: item.createdAt.slice(0, 10),
  }));

  return (
    <>
      {adminOrderLoading ? (
        <Loader /> // If you want to remove the loader dependency, replace it with a div like <div>Loading...</div>
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3 className="!text-[18px] leading-5 !font-[400] text-[#00000085]">
                  Total Earning
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                $ {adminBalance}
              </h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3 className="!text-[18px] leading-5 !font-[400] text-[#00000085]">
                  All Sellers
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {sellers.length}
              </h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3 className="!text-[18px] leading-5 !font-[400] text-[#00000085]">
                  All Orders
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminOrders.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
              </Link>
            </div>
          </div>

          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
