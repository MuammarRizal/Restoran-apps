import React, { useState } from "react";
import Sidebar from "./Sidebar";
import useSWR from "swr";
import LoadingPPKD from "./LoadingPPKD";
import { Link } from "react-router-dom";
import { ApiLocal } from "../../utils/localenv";
const fetcher = (url) => fetch(url).then((res) => res.json());

const MenuKitchen = () => {
  // Production
  const { data, error } = useSWR(`${ApiLocal}/menus`, fetcher, {
    // const { data: menu, error } = useSWR(`${apiLocalhost}/menus`, fetcher, {
    refreshInterval: 3000,
  });

  // Localhost
  // const { data, error } = useSWR("http://localhost:5000/api/menus", fetcher);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const loading = !data && !error;
  return (
    <div className="flex w-full flex-col">
      {/* Navbar */}
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

      <div className="flex-1 p-4 md:p-6">
        <h3 className="mb-4 text-center text-2xl font-bold text-gray-800 md:text-left">
          Menu
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-500 rounded-lg border bg-white shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  ID
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Image
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Nama
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Item
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Dessert
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6">
                    <LoadingPPKD />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-red-500">
                    Error fetching data
                  </td>
                </tr>
              ) : (
                data?.menus.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-center text-sm font-medium md:px-6">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:px-6">
                        <img
                          src={`../../../public/ImageMenus/${item.name}.jpg`}
                          alt={item.name}
                          className="mx-auto w-32 rounded-md object-cover shadow-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:px-6">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:px-6">
                        <p className="font-semibold">{item.items.title}</p>
                        <ul className=" text-gray-600">
                          {item.items.food.map((food, idx) => (
                            <li key={idx}>- {food}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 text-center">
                        <p className="font-semibold">{item.items.dessert}</p>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <hr className="my-4 border-gray-300" />
        {/* <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:text-left">
          Drinks
        </h2> */}

        {/* <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-500 rounded-lg border bg-white shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  ID
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Image
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Nama
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Kategori
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6">
                    <LoadingPPKD />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-red-500">
                    Error fetching data
                  </td>
                </tr>
              ) : (
                menuDrinks.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-center text-sm font-medium md:px-6">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:px-6">
                        <img
                          src={`../../../public/ImageMenus/${item.image}`}
                          alt={item.name}
                          className="mx-auto w-32 rounded-md object-cover shadow-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:px-6">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:px-6">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-center font-bold">
                        <button
                          type="button"
                          className="inline-block rounded-full bg-red-700 px-4 py-1.5 text-xs font-medium text-white shadow-sm transition-all duration-300 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 md:text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default MenuKitchen;
