import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const TableOrder = ({ cart }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow">
        <thead>
          <tr className="bg-gray-200 text-left text-sm font-semibold uppercase text-gray-700">
            <th className="border-b px-4 py-3">NO</th>
            <th className="border-b px-4 py-3">MENU</th>
            <th className="border-b px-4 py-3">Quantity</th>
            <th className="border-b px-4 py-3">KATEGORI</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr className="hover:bg-gray-100" key={index}>
              <td className="border-b px-4 py-3 text-gray-800">{index + 1}</td>
              <td className="border-b px-4 py-3 text-gray-800">{item.name}</td>
              <td className="border-b px-4 py-3 text-gray-800">
                {item.quantity}
              </td>
              <td className="border-b px-4 py-3 text-gray-800">
                {item.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrder;
