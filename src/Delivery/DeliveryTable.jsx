import React from "react";
import { FaSync } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

const DeliveryTable = () => {
  const data = [
    {
      id: 1,
      name: "Pemesan A",
      order: "Makanan A",
      status: "Dalam Proses",
      estimatedTime: "30 menit",
    },
    {
      id: 2,
      name: "Pemesan B",
      order: "Makanan B",
      status: "Siap Diantar",
      estimatedTime: "1 jam",
    },
    {
      id: 3,
      name: "Pemesan C",
      order: "Makanan C",
      status: "Dalam Proses",
      estimatedTime: "45 menit",
    },
    // Tambahkan data lain jika diperlukan
  ];

  const handleStatusChange = (item) => {
    // Implementasikan logika untuk mengubah status barang
    console.log(`Status changed for item ID: ${item.id}`);
  };

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
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 bg-white text-gray-800 transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-lg"
              >
                <td className="px-4 py-3 text-center text-sm font-medium md:px-6">
                  {item.id}
                </td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700 md:px-6">
                  {item.name}
                </td>
                <td className="px-4 py-3 text-center text-sm md:px-6">
                  {item.order}
                </td>
                <td className="px-4 py-3 text-center text-sm md:px-6">
                  {item.estimatedTime}
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
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryTable;
