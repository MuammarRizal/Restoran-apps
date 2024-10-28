// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sticky top-0 flex h-screen min-h-screen w-64 flex-col bg-gray-800 p-4 text-white">
      <h2 className="mb-8 text-2xl font-bold">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/kitchen/orders"
          className={({ isActive }) =>
            `rounded p-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
          }
        >
          Orderan
        </NavLink>
        <NavLink
          to="/kitchen/menu"
          className={({ isActive }) =>
            `rounded p-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
          }
        >
          Menu
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
