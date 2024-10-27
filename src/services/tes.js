export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: {
        username: JSON.stringify(newOrder.cart.username),
        data: JSON.stringify(newOrder.cart),
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}
