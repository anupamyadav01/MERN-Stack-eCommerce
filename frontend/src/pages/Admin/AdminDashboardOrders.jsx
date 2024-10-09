import { useEffect } from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader"; // You can replace this with a placeholder header if needed
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar"; // You can replace this with a placeholder sidebar if needed
import { DataGrid } from "@mui/x-data-grid"; // Keeping this for table display functionality

const AdminDashboardOrders = () => {
  // Hardcoded orders data
  const adminOrders = [
    {
      _id: "1",
      cart: [{ qty: 2 }, { qty: 3 }],
      totalPrice: 250,
      status: "Delivered",
      createdAt: "2023-09-28",
    },
    {
      _id: "2",
      cart: [{ qty: 1 }],
      totalPrice: 150,
      status: "Processing",
      createdAt: "2023-10-01",
    },
  ];

  // const adminOrderLoading = false; // Static loading state

  useEffect(() => {
    // Simulating data fetching without Redux or external actions
    // Normally you'd call dispatch(getAllOrdersOfAdmin()), but this is removed
  }, []);

  // Define columns for the DataGrid
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

  // Generate rows for DataGrid from the hardcoded adminOrders data
  const rows = adminOrders.map((item) => ({
    id: item._id,
    itemsQty: item.cart.reduce((acc, curr) => acc + curr.qty, 0),
    total: `${item.totalPrice} $`,
    status: item.status,
    createdAt: item.createdAt.slice(0, 10),
  }));

  return (
    <div>
      {/* You can replace AdminHeader and AdminSideBar with placeholder divs if needed */}
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
