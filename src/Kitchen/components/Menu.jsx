import React from "react";
import Sidebar from "./Sidebar";
import useSWR from "swr";
import LoadingPPKD from "./LoadingPPKD";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MenuKitchen = () => {
  const { data, error } = useSWR(
    "http://192.168.88.191:5000/api/menus",
    fetcher,
  );
  const loading = !data && !error;
  const menuFoods = data?.menus.filter((item) => item.category === "makanan");
  const menuDrinks = data?.menus.filter((item) => item.category === "minuman");
  return (
    <div className="flex w-full flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-800 md:text-left">
          Menu
        </h2>

        <hr className="my-4 border-gray-300" />

        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:text-left">
          Foods
        </h2>

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
                menuFoods.map((item, index) => {
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
        </div>

        <hr className="my-4 border-gray-300" />
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:text-left">
          Drinks
        </h2>

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
        </div>
      </div>
    </div>
  );
};

export default MenuKitchen;
