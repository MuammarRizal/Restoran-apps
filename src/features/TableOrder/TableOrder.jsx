import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const TableOrder = ({ cart, meja }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow">
        <thead>
          <tr className="bg-gray-200 text-left text-sm font-semibold uppercase text-gray-700">
            <th className="border-b px-4 py-3">NO</th>
            <th className="border-b px-4 py-3">TABLE</th>
            <th className="border-b px-4 py-3">MENU</th>
            <th className="border-b px-4 py-3">Quantity</th>
            <th className="border-b px-4 py-3">Item</th>
            <th className="border-b px-4 py-3">Dessert</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr className="hover:bg-gray-100" key={item.id}>
              <td className="border-b px-4 py-3 text-gray-800">{index + 1}</td>
              <td className="border-b px-4 py-3 text-gray-800">{meja}</td>
              <td className="border-b px-4 py-3 text-gray-800">{item.name}</td>
              <td className="border-b px-4 py-3 text-gray-800">
                {item.quantity}
              </td>

              <td className="border-b px-4 py-3 text-gray-800">
                <p className="font-semibold">{item.items.title}</p>
                <ul className="list-inside list-disc text-gray-600">
                  {item.items.food.map((food, idx) => (
                    <li key={idx}>{food}</li>
                  ))}
                </ul>
              </td>
              <td className="border-b px-4 py-3 text-gray-800">
                {item.items.dessert}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrder;
