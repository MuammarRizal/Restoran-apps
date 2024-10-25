import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const TableOrder = () => {
  // Data contoh untuk tabel
  const data = [
    { id: 1, name: "Nasi Goreng", quantity: 2, progress: "completed" },
    { id: 2, name: "Sate Ayam", quantity: 1, progress: "inProgress" },
    { id: 3, name: "Mie Ayam", quantity: 3, progress: "cancelled" },
  ];

  // Fungsi untuk menampilkan ikon berdasarkan status progress
  const renderProgressIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "inProgress":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow">
        <thead>
          <tr className="bg-gray-200 text-left text-sm font-semibold uppercase text-gray-700">
            <th className="border-b px-4 py-3">NO</th>
            <th className="border-b px-4 py-3">ITEM</th>
            <th className="border-b px-4 py-3">Quantity</th>
            <th className="border-b px-4 py-3">Progress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border-b px-4 py-3 text-gray-800">{index + 1}</td>
              <td className="border-b px-4 py-3 text-gray-800">{item.name}</td>
              <td className="border-b px-4 py-3 text-gray-800">
                {item.quantity}
              </td>
              <td className="flex items-center border-b px-4 py-3 text-gray-800">
                {renderProgressIcon(item.progress)}
                <span className="ml-2 capitalize">{item.progress}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrder;
