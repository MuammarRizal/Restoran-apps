import axios from "axios";
import { ApiLocal } from "../utils/localenv";
// Localhost
// const API_URL = "http://localhost:5000/api";

// Production local PPKD
// const API_URL = "http://192.168.88.191:5000/api";

// wifi rumah
// const API_URL = "http://192.168.100.131:5000/api";

const API_URL = "https://141.11.160.38:3002/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menus`);

  if (!res.ok) throw Error("Failed getting menu");

  const { menus } = await res.json();

  return menus;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  console.log(newOrder);
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify({
        username: newOrder.username,
        table: newOrder.table,
        data: newOrder.cart,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(await res.text());
    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/updateorder/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your order");
  }
}

export async function updateQuantity(id, quantity) {
  try {
    const res = await fetch(`${API_URL}/updateorder/${id}`, {
      method: "put",
      body: JSON.stringify({
        quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
