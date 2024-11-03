import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import LoadingPPKD from "./LoadingPPKD";
import Notifikasi from "./orderan.mp3";
import { FaSync, FaUserCircle } from "react-icons/fa";
import { IoCheckmarkDoneSharp, IoFastFood } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { extractAllowedWords } from "../../utils/helpers";
import ConfirmModal from "./ConfirmModal"; // Import the custom modal
const apiUrl = import.meta.env.LOCAL_NETWORK_API;
const apiLocalhost = import.meta.env.LOCALHOST;

const fetcher = (url) => fetch(url).then((res) => res.json());

const KitchenOrders = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const audioRef = useRef(new Audio(Notifikasi));

  // const { data, error } = useSWR(`${apiUrl}/orders`, fetcher, {
  const { data, error } = useSWR(`http://localhost:5000/api/orders`, fetcher, {
    refreshInterval: 1000,
  });
  const loading = !data && !error;

  useEffect(() => {
    const prevOrdersCount = Number(localStorage.getItem("prevlength_tataboga"));
    if (data?.orders.length > prevOrdersCount) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
    if (data) {
      localStorage.setItem(
        "prevlength_tataboga",
        JSON.stringify(data.orders.length),
      );
    }
  }, [data]);

  const handlerProcess = async (id) => {
    const dataDetail = data.orders.filter((item) => item.id === Number(id));
    const dataJson = JSON.parse(dataDetail[0].data);
    try {
      const response = await fetch(`http://localhost:5000/api/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          process: {
            process: true,
            timestamp: new Date(),
          },
        }),
      });
      if (!response.ok) {
        throw new Error(error);
      }
      const res = await response.json();
      setIsModalOpen(false); // Close modal after processing
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const confirmProcess = (id) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderOrdersTable = (orders, title) => (
    <div className="p-4">
      <h3 className="mb-4 text-2xl font-bold text-gray-800">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 rounded-lg border bg-white shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              {["NO", "Pemesan", "Paket", "Item", "Dessert", "STATUS"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-700 md:px-6 md:py-3"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6">
                  <LoadingPPKD />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-red-500">
                  Error fetching data
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-red-500">
                  <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100 shadow-md">
                    <p className="text-lg font-semibold text-gray-500">
                      Tidak ada pesanan saat ini
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              orders
                .sort((a, b) => b.id - a.id)
                .map((order, index) => {
                  const cartJson = JSON.parse(order.cart);
                  const dataJson = JSON.parse(order.data);

                  const isProcessing = !dataJson.process;
                  return (
                    <tr
                      key={order.id}
                      className={`border-b text-gray-700 hover:bg-gray-50 ${isProcessing ? "bg-yellow-100" : "bg-green-100"}`}
                    >
                      <td className="px-4 py-2 text-sm md:px-6">{index + 1}</td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {order.username}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) => (
                          <div key={item.id}>
                            <p className="font-semibold">
                              {extractAllowedWords(
                                [
                                  "PAKET 1",
                                  "PAKET 2",
                                  "PAKET 3",
                                  "PAKET 4",
                                  "PAKET 5",
                                  "Nasi Liwet",
                                  "Ayam Teriyaki",
                                  "Ayam Katsu",
                                  "Ayam Rica-Rica",
                                  "Ayam Geprek",
                                ],
                                item.name,
                              )}
                            </p>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) => (
                          <div key={item.id}>
                            <p className="font-semibold">
                              {extractAllowedWords(
                                [
                                  "PAKET 1",
                                  "PAKET 2",
                                  "PAKET 3",
                                  "PAKET 4",
                                  "PAKET 5",
                                  "Nasi Liwet",
                                  "Ayam Teriyaki",
                                  "Ayam Katsu",
                                  "Ayam Rica-Rica",
                                  "Ayam Geprek",
                                ],
                                item.items.title,
                              )}
                            </p>
                            <ul className="list-inside list-disc text-gray-600">
                              {item.items.food.map((food, idx) => (
                                <li key={idx}>{food}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) => (
                          <div key={item.id}>
                            <p className="font-semibold">
                              {item.items.dessert}
                            </p>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-2 text-center font-bold">
                        <button onClick={() => confirmProcess(order.id)}>
                          {isProcessing ? (
                            <span className="inline-flex items-center rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-white">
                              <FaSync className="mr-1 animate-spin" />
                              Sedang Proses
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                              <IoCheckmarkDoneSharp className="mr-1" />
                              Selesai
                            </span>
                          )}
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

  // Filter orders based on processing status
  const processingOrders =
    data?.orders.filter((order) => !JSON.parse(order.data).process) || [];
  const completedOrders =
    data?.orders.filter((order) => JSON.parse(order.data).process) || [];

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
              Menu
            </Link>
            <Link to="/kitchen/reports" className="block hover:text-gray-300">
              Reports
            </Link>
          </div>
          <button onClick={toggleMenu} className="md:hidden">
            <MdMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Modal Confirmation */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handlerProcess(selectedOrderId);
        }}
        message="Apakah Anda yakin ingin menandai pesanan ini sebagai selesai?"
      />

      {/* Render the orders tables */}
      {renderOrdersTable(processingOrders, "Pesanan Sedang Dibuat")}
      {renderOrdersTable(completedOrders, "Pesanan Telah Selesai")}
    </div>
  );
};

export default KitchenOrders;
