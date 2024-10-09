/* eslint-disable react/prop-types */
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import React from "react";

const AdminSideBar = ({ active }) => {
  const menuItems = [
    {
      to: "/admin/dashboard",
      icon: <RxDashboard />,
      label: "Dashboard",
      id: 1,
    },
    {
      to: "/admin-orders",
      icon: <FiShoppingBag />,
      label: "All Orders",
      id: 2,
    },
    { to: "/admin-sellers", icon: <GrWorkshop />, label: "All Sellers", id: 3 },
    {
      to: "/admin-users",
      icon: <HiOutlineUserGroup />,
      label: "All Users",
      id: 4,
    },
    {
      to: "/admin-products",
      icon: <BsHandbag />,
      label: "All Products",
      id: 5,
    },
  ];

  return (
    <div className="w-full bg-white z-10">
      {menuItems.map(({ to, icon, label, id }) => (
        <div key={id} className="w-full p-4">
          <Link to={to} className="flex justify-center">
            {React.cloneElement(icon, {
              size: 30,
              color: active === id ? "crimson" : "#555",
            })}
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === id ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              {label}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminSideBar;