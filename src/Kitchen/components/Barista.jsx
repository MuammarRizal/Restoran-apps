import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import LoadingPPKD from "./LoadingPPKD";
import Notifikasi from "./orderan.mp3";
import { FaSync } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { removeForbiddenWords } from "../../utils/helpers";
import ConfirmModal from "./ConfirmModal";
import { ApiLocal } from "../../utils/localenv";
const apiUrl = import.meta.env.LOCAL_NETWORK_API;
const apiLocalhost = import.meta.env.LOCALHOST;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Barista = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [processStatus, setProcessStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const audioRef = useRef(new Audio(Notifikasi));

  // const { data, error } = useSWR(`${apiUrl}/orders`, fetcher, {
  //   refreshInterval: 2000,
  // });
  const { data, error } = useSWR(`${ApiLocal}/orders`, fetcher, {
    refreshInterval: 2000,
  });

  const loading = !data && !error;

  useEffect(() => {
    const storedProcessStatus = JSON.parse(
      localStorage.getItem("processStatus") || "{}",
    );
    setProcessStatus(storedProcessStatus);
  }, []);

  useEffect(() => {
    const prevOrdersCount = Number(localStorage.getItem("prevlength_barista"));

    if (data?.orders.length > prevOrdersCount) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }

    if (data) {
      localStorage.setItem("prevlength_barista", data.orders.length.toString());
    }
  }, [data]);

  const handlerProcess = async (id) => {
    setProcessStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus, [id]: true };
      localStorage.setItem("processStatus", JSON.stringify(updatedStatus));
      return updatedStatus;
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openModal = (id) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
  };

  const renderOrdersTable = () => {
    const completedOrders = (
      data?.orders.filter((order) => processStatus[order.id]) || []
    ).sort((a, b) => b.id - a.id);
    const inProcessOrders = (
      data?.orders.filter((order) => !processStatus[order.id]) || []
    ).sort((a, b) => b.id - a.id);

    return (
      <div className="p-4">
        <h3 className="mb-4 text-2xl font-bold text-gray-800">
          Pesanan Sedang Dibuat
        </h3>
        <div className="overflow-x-auto">
          {loading ? (
            <LoadingPPKD />
          ) : error ? (
            <div className="text-center text-red-500">Error fetching data</div>
          ) : inProcessOrders.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100 shadow-md">
              <p className="text-lg font-semibold text-gray-500">
                Tidak ada pesanan saat ini
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-300 rounded-lg border bg-white shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  {["no meja", "Pemesan", "Item", "Type", "STATUS"].map(
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
                {inProcessOrders.map((order, index) => {
                  const cartJson = JSON.parse(order.cart);
                  const food = [
                    "Nasi Liwet",
                    "Ayam Teriyaki",
                    "Ayam Katsu",
                    "Ayam Rica-Rica",
                    "Ayam Geprek",
                  ];
                  const type = ["food"];

                  return (
                    <tr
                      key={order.id}
                      className="border-b text-gray-700 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-sm md:px-6">
                        {JSON.parse(order.data).table}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {order.username}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) => (
                          <div key={item.id}>
                            <p className="font-semibold">
                              {removeForbiddenWords(food, item.items.title)}
                            </p>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) =>
                          removeForbiddenWords(type, item.items.category),
                        )}
                      </td>
                      <td className="px-4 py-2 font-bold">
                        <button onClick={() => openModal(order.id)}>
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-600">
                            <FaSync className="mr-1 animate-spin" />
                            Process
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <h3 className="mb-4 mt-8 text-2xl font-bold text-gray-800">
          Pesanan Telah Selesai
        </h3>
        <div className="overflow-x-auto">
          {completedOrders.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100 shadow-md">
              <p className="text-lg font-semibold text-gray-500">
                Tidak ada pesanan saat ini
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-300 rounded-lg border bg-white shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  {["no meja", "Pemesan", "Item", "Type", "STATUS"].map(
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
                {completedOrders.map((order, index) => {
                  const cartJson = JSON.parse(order.cart);
                  const food = [
                    "Nasi Liwet",
                    "Ayam Teriyaki",
                    "Ayam Katsu",
                    "Ayam Rica-Rica",
                    "Ayam Geprek",
                  ];
                  const type = ["food"];

                  return (
                    <tr
                      key={order.id}
                      className="border-b text-gray-700 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-sm md:px-6">
                        {JSON.parse(order.data).table}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {order.username}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) => (
                          <div key={item.id}>
                            <p className="font-semibold">
                              {removeForbiddenWords(food, item.items.title)}
                            </p>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-2 text-sm md:px-6">
                        {cartJson.map((item) =>
                          removeForbiddenWords(type, item.items.category),
                        )}
                      </td>
                      <td className="px-4 py-2 font-bold">
                        <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                          <IoCheckmarkDoneSharp className="mr-1" />
                          Selesai
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col">
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
          <div className="md:hidden">
            <MdMenu onClick={toggleMenu} size={28} />
          </div>
        </div>
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
      {renderOrdersTable()}
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            handlerProcess(selectedOrderId);
            setIsModalOpen(false);
          }}
          message={
            "Apakah Anda yakin ingin menandai pesanan ini sebagai selesai ?"
          }
        />
      )}
    </div>
  );
};

export default Barista;
