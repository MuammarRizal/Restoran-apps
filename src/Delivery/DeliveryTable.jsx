import React from "react";
import { FaSync } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import useSWR from "swr";
import LoadingPPKD from "../Kitchen/components/LoadingPPKD";

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

  const { data, error } = useSWR(
    "http://192.168.88.191:5000/api/orders",
    fetcher,
  );
  const loading = !data && !error;

  return (
    <div className="flex-1 p-4 md:p-6">
      <h2 className="mb-6 text-center text-2xl font-extrabold text-gray-800 md:text-left">
        Proses Pesanan
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border bg-white shadow-lg">
          <thead className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
                No
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
                Nama Pemesan
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6">
                Image
              </th>
              <th
                className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider md:px-6"
                colSpan={2}
              >
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
                <td colSpan={5} className="px-4 py-6">
                  <LoadingPPKD />
                </td>
              </tr>
            ) : (
              data?.orders
                .sort((a, b) => b.id - a.id) // Sort by createdAt
                .map((item, index) => {
                  const cartJson = JSON.parse(item.cart);
                  const { foodItems, drinkItems } =
                    getFoodAndDrinkItems(cartJson);

                  console.log(cartJson);
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 bg-white text-gray-800 transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-lg"
                    >
                      <td className="px-4 py-3 text-center text-sm font-medium md:px-6">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700 md:px-6">
                        {item.username}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700 md:px-6">
                        <img
                          src={`./ImageMenus/${cartJson[0].name}.jpg`}
                          alt={cartJson.name}
                          className="mx-auto mb-2 h-[50%] w-48  overflow-hidden object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) => item.name)}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) => item.category)}
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:px-6">
                        {Math.floor(Math.random() * 60) + 1} Menit
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-semibold md:px-6">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            item.status === "Siap Diantar"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {item.status === "Siap Diantar" ? (
                            <IoFastFood className="mr-1" />
                          ) : (
                            <FaSync className="mr-1 animate-spin" />
                          )}
                          <span>Proses</span>
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
  );
};

export default DeliveryTable;
