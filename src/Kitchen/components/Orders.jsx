import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Sidebar from "./Sidebar";
import LoadingPPKD from "./LoadingPPKD";
import Notifikasi from "./orderan.mp3";
import { FaSync } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

const fetcher = (url) => fetch(url).then((res) => res.json());

const KitchenOrders = () => {
  const audioRef = useRef(new Audio(Notifikasi));

  const { data, error } = useSWR(
    "http://192.168.88.191:5000/api/orders",
    fetcher,
    { refreshInterval: 2000 },
  );
  const loading = !data && !error;

  const getFoodAndDrinkItems = (cartJson) => {
    const foodItems = cartJson
      .filter((item) => item.category === "makanan")
      .map((item) => item.name);
    const drinkItems = cartJson
      .filter((item) => item.category === "minuman")
      .map((item) => item.name);
    return { foodItems, drinkItems };
  };

  const prevv = Number(localStorage.getItem("prevlength"));
  useEffect(() => {
    if (data?.orders.length > prevv) {
      audioRef.current.play();
    }

    if (data) {
      localStorage.setItem("prevlength", JSON.stringify(data.orders.length));
    }
  }, [data]);

  return (
    <div className="flex w-full flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6">
        {/* sedang proses */}
        <h3 className="mb-4 text-center text-2xl font-bold text-gray-800 md:text-left">
          Sedang Proses
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg border bg-white shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Pemesan
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Makanan
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Minuman
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  STATUS
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
                data.orders.map((order, index) => {
                  const cartJson = JSON.parse(order.cart);
                  const { foodItems, drinkItems } =
                    getFoodAndDrinkItems(cartJson);

                  return (
                    <tr
                      key={order.id}
                      className="border-b text-gray-700 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-sm md:px-6">{index + 1}</td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {order.username}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {foodItems.length > 0
                          ? foodItems.join(", ")
                          : "Tidak Memesan Makanan"}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {drinkItems.length > 0
                          ? drinkItems.join(", ")
                          : "Tidak Memesan Minuman"}
                      </td>
                      <td className="px-4 py-2 text-center font-bold">
                        <button>
                          <span
                            className={`inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-600`}
                          >
                            <FaSync className="mr-1 animate-spin" />
                            Process
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* delivery */}
        <h3 className="mb-2 mt-4 text-center text-2xl font-bold text-gray-800 md:text-left">
          Delivery
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg border bg-white shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Pemesan
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Makanan
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Minuman
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3">
                  Status
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
                data.orders.map((order, index) => {
                  const cartJson = JSON.parse(order.cart);
                  const { foodItems, drinkItems } =
                    getFoodAndDrinkItems(cartJson);

                  return (
                    <tr
                      key={order.id}
                      className="border-b text-gray-700 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-sm md:px-6">{index + 1}</td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {order.username}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {foodItems.length > 0
                          ? foodItems.join(", ")
                          : "Tidak Memesan Makanan"}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {drinkItems.length > 0
                          ? drinkItems.join(", ")
                          : "Tidak Memesan Minuman"}
                      </td>
                      <td className="px-4 py-2 text-center font-bold">
                        <span
                          className={`inline-flex items-center rounded-full bg-green-100  px-3 py-1 text-xs font-medium text-green-600`}
                        >
                          <IoFastFood className="mr-1" />
                          Delivery
                        </span>
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

export default KitchenOrders;
