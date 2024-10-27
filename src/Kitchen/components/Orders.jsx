import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Sidebar from "./Sidebar";
import LoadingPPKD from "./LoadingPPKD";
import Notifikasi from "./orderan.mp3";

const fetcher = (url) => fetch(url).then((res) => res.json());

const KitchenOrders = () => {
  const audioRef = useRef(new Audio(Notifikasi));
  const [previousOrderCount, setPreviousOrderCount] = useState(0);

  const { data, error } = useSWR("http://localhost:5000/api/orders", fetcher);
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
  }, [data, previousOrderCount]);

  return (
    <div className="fixed -ms-[3.7rem] -mt-10 flex w-full">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="mb-4 text-2xl font-bold">Orderan</h2>
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Pemesan</th>
              <th className="border-b px-4 py-2">Makanan</th>
              <th className="border-b px-4 py-2">Minuman</th>
              <th className="border-b px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>
                  <LoadingPPKD />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  Error fetching data
                </td>
              </tr>
            ) : (
              data.orders.map((order, index) => {
                const cartJson = JSON.parse(order.cart);
                const { foodItems, drinkItems } =
                  getFoodAndDrinkItems(cartJson);

                return (
                  <tr key={order.id} className="border-b text-center">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{order.username}</td>
                    <td className="px-4 py-2">
                      {foodItems.length > 0
                        ? foodItems.join(", ")
                        : "Tidak Memesan Makanan"}
                    </td>
                    <td className="px-4 py-2">
                      {drinkItems.length > 0
                        ? drinkItems.join(", ")
                        : "Tidak Memesan Minuman"}
                    </td>
                    <td className="px-4 py-2 font-bold">
                      <button
                        type="button"
                        className="mb-2 me-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
                      >
                        {order.status || "Proses"}
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
  );
};

export default KitchenOrders;
