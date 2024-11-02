// src/components/Sidebar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-bold">Open Kedai</div>
        <div className="hidden items-center gap-4 md:flex">
          <Link to="/kitchen/orders" className="block hover:text-gray-300">
            Order
          </Link>
          <Link to="/kitchen/Menu" className="block hover:text-gray-300">
            Menus
          </Link>
        </div>
        <div className="md:hidden"></div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="space-y-2 bg-gray-700 px-4 py-2 text-white md:hidden">
          <Link to="/kitchen/orders" className="block hover:text-gray-300">
            Order
          </Link>
          <Link to="/kitchen/Menu" className="block hover:text-gray-300">
            Menus
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
