import React from "react";

// Fungsi untuk mengurutkan pengguna berdasarkan timestamp
const sortUsersByTimestamp = (users) => {
  return users.sort((a, b) => {
    const timestampA = new Date(JSON.parse(a.data).timestamp);
    const timestampB = new Date(JSON.parse(b.data).timestamp);
    return timestampA - timestampB; // Urutkan dari yang paling awal ke yang paling akhir
  });
};

const UserCart = ({ users }) => {
  // Mengurutkan pengguna sebelum merender
  const sortedUsers = sortUsersByTimestamp(users);

  return (
    <div>
      {sortedUsers.map((user) => (
        <div key={user.id} style={{ marginBottom: "20px" }}>
          <h2>{user.username}'s Cart</h2>
          <ul>
            {JSON.parse(user.cart).map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity} - Total Price: $
                {item.totalPrice}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Contoh data pengguna yang diberikan
const usersData = [
  {
    id: 3,
    username: "Vendy",
    cart: '[{"id":2,"name":"Pisang Bakar","quantity":5,"unitPrice":1,"category":"makanan","totalPrice":5},{"id":3,"name":"Pisang Bakar","quantity":1,"unitPrice":1,"category":"makanan","totalPrice":1},{"id":1,"name":"Pisang Bakar","quantity":1,"unitPrice":1,"category":"makanan","totalPrice":1},{"id":4,"name":"Kopi Hitam","quantity":1,"unitPrice":1,"category":"minuman","totalPrice":1}]',
    data: '{"process":false,"timestamp":"2024-10-31T03:54:12.362Z"}',
  },
  {
    id: 4,
    username: "adnan",
    cart: '[{"id":1,"name":"Pisang Bakar","quantity":10,"unitPrice":1,"category":"makanan","totalPrice":10}]',
    data: '{"process":false,"timestamp":"2024-10-31T03:54:45.584Z"}',
  },
  {
    id: 5,
    username: "budi",
    cart: '[{"id":3,"name":"Pisang Bakar","quantity":1,"unitPrice":1,"category":"makanan","totalPrice":1}]',
    data: '{"process":false,"timestamp":"2024-10-31T04:04:27.206Z"}',
  },
  {
    id: 6,
    username: "subuh",
    cart: '[{"id":2,"name":"Pisang Bakar","quantity":1,"unitPrice":1,"category":"makanan","totalPrice":1}]',
    data: '{"process":false,"timestamp":"2024-10-31T04:05:39.405Z"}',
  },
  {
    id: 8,
    username: "zinadin",
    cart: '[{"id":2,"name":"Pisang Bakar","quantity":1,"unitPrice":1,"category":"makanan","totalPrice":1}]',
    data: '{"process":false,"timestamp":"2024-10-31T04:08:30.181Z"}',
  },
  {
    id: 9,
    username: "Ryan Kamil",
    cart: '[{"id":5,"name":"Paket 1","quantity":1,"unitPrice":1,"category":"Ayam Kalasan, Tahu, Tempe, Tahu Goreng, Lalapan","totalPrice":1},{"id":7,"name":"Paket 3","quantity":1,"unitPrice":1,"category":"Nasi Putih + Mix Vegetables","totalPrice":1},{"id":8,"name":"Paket 4","quantity":1,"unitPrice":1,"category":"Nasi Putih + Tumis wortel Buncis dan Wortel","totalPrice":1}]',
    data: '{"process":false,"timestamp":"2024-10-31T04:08:53.784Z"}',
  },
  {
    id: 11,
    username: "dwa",
    cart: '[{"id":7,"name":"Paket 3","quantity":1,"unitPrice":1,"category":"Nasi Putih + Mix Vegetables","totalPrice":1}]',
    data: '{"process":false,"timestamp":"2024-10-31T04:22:37.327Z"}',
  },
];
export default UserCart;
