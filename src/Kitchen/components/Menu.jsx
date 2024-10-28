// src/pages/Menu.js
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import useSWR from "swr";
import LoadingPPKD from "./LoadingPPKD";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MenuKitchen = () => {
  const menuItems = [
    { id: 1, name: "Pisang Bakar", price: "10,000", category: "Makanan" },
    { id: 2, name: "Es Teh Manis", price: "5,000", category: "Minuman" },
  ];

  const { data, error } = useSWR("http://localhost:5000/api/menus", fetcher);

  const loading = !data && !error;

  return (
    <div className="relative -ms-[3.7rem] -mt-10 flex w-full">
      <Sidebar />
      <div className="flex-1 p-6">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Menu</h2>
          <table className="min-w-full border bg-white">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">ID</th>
                <th className="border-b px-4 py-2">Nama</th>
                <th className="border-b px-4 py-2">Category</th>
                <th className="border-b px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <LoadingPPKD />
                  </td>
                </tr>
              ) : (
                data?.menus.map((item) => (
                  <tr key={item.id} className="border-b text-center">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">
                      <button
                        type="button"
                        className="mb-2 me-2 rounded-full bg-red-700 px-4 py-1.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuKitchen;
