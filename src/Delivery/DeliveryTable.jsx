import React from "react";
import { FaSpinner, FaSync } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import useSWR from "swr";
import LoadingPPKD from "../Kitchen/components/LoadingPPKD";
import LogoPPKD from "../assets/logo.png";
import { ApiLocal } from "../utils/localenv";
const apiUrl = import.meta.env.LOCAL_NETWORK_API;
const apiLocalhost = import.meta.env.LOCALHOST;

const fetcher = (url) => fetch(url).then((res) => res.json());

const DeliveryTable = () => {
  const getFoodAndDrinkItems = (cartJson) => {
    const foodItems = cartJson
      .filter((item) => item.category === "makanan")
      .map((item) => item.name);
    const drinkItems = cartJson
      .filter((item) => item.category === "minuman")
      .map((item) => item.name);
    return { foodItems, drinkItems };
  };

  const { data, error } = useSWR(`${ApiLocal}/orders`, fetcher);
  const loading = !data && !error;

  const completedOrders =
    data?.orders.filter((item) => JSON.parse(item.data).process) || [];
  const inProcessOrders =
    data?.orders.filter((item) => !JSON.parse(item.data).process) || [];

  const renderOrdersTable = (orders, isCompleted) => (
    <div className="">
      <div className="header flex w-full items-center justify-between">
        <h2 className="text-center text-2xl font-extrabold text-gray-800">
          {isCompleted ? "Pesanan Telah Selesai" : "Pesanan Sedang Dibuat"}
        </h2>
        <img src={LogoPPKD} alt="Logo PPKD" className="mb-4 w-40" />
      </div>
      <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow-xl transition-all duration-200 ease-in-out hover:shadow-2xl">
        <thead
          className={`bg-gradient-to-r ${
            isCompleted
              ? "from-green-600 to-green-400"
              : "from-orange-600 to-orange-400"
          } text-white`}
        >
          <tr>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
              No Meja
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
              Nama Pemesan
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
              Image
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
              Pesanan
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
              Estimasi Waktu
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="px-4 py-6">
                <LoadingPPKD />
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center">
                <div className="flex h-full flex-col items-center justify-center py-10">
                  <p className="mb-4 text-xl font-semibold text-gray-700">
                    Pusat Pelatihan Kerja Daerah Jakarta Selatan!
                  </p>
                  <FaSpinner className=" h-12 w-12 animate-spin text-gray-500" />
                  <p className="mt-2 text-gray-500">
                    Tidak ada pesanan saat ini!
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            orders
              .sort((a, b) => b.id - a.id)
              .map((item, index) => {
                const cartJson = JSON.parse(item.cart);
                const dataJson = JSON.parse(item.data);

                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 bg-white text-gray-800 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-md"
                  >
                    <td className="px-4 py-3 text-center text-sm font-medium md:px-6">
                      {JSON.parse(item.data).table}
                    </td>
                    <td className="px-4 py-3 text-center text-xl font-semibold text-gray-700 md:px-6">
                      {item.username}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700 md:px-6">
                      <img
                        src={
                          cartJson[0].image
                            ? `./ImageMenus/${cartJson[0].image}`
                            : `./ImageMenus/${cartJson[0].name}.jpg`
                        }
                        alt={cartJson.name}
                        className="mx-auto mb-2 h-24 w-24 overflow-hidden rounded-lg object-cover shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-2 text-start text-sm md:px-6">
                      <ul className="ml-4 list-disc">
                        {cartJson.map((item, index) => (
                          <li key={index} className="text-gray-600">
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 text-center text-sm md:px-6">
                      {Math.floor(Math.random() * (20 - 10 + 1)) + 10} Menit
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold md:px-6">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          dataJson.process
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {dataJson.process ? (
                          <span className="flex items-center justify-center gap-1 text-xl">
                            <IoFastFood className="mr-1" />
                            Selesai
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1 text-xl">
                            <FaSync className="mr-1 animate-spin" />
                            <span>Proses</span>
                          </span>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex-1">
      <h2 className="text-center text-3xl font-extrabold text-gray-800">
        Proses Pesanan
      </h2>

      <div className="overflow-x-auto">
        {renderOrdersTable(inProcessOrders, false)}
      </div>

      <div className="mt-8 overflow-x-auto">
        {renderOrdersTable(completedOrders, true)}
      </div>
    </div>
  );
};

export default DeliveryTable;
