import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import EmptyCart from "../cart/EmptyCart";
import { createOrder, updateQuantity } from "../../services/apiRestaurant";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import TableOrder from "../TableOrder/TableOrder";

const CreateOrder = () => {
  const name = useSelector((state) => state.user.name);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Hallo {name}, Apakah Pesanan sudah sesuai ?
      </h2>

      <Link
        to="/menu"
        className="rounded-md px-3 py-2 font-medium text-orange-600 transition-all duration-300 ease-in-out hover:bg-orange-600 hover:text-white"
      >
        &larr; Back to menu
      </Link>
      <Form method="POST" action="/order/new">
        <TableOrder cart={cart} />
        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify({ username: name, ...cart })}
            className="block"
          />

          <button
            disabled={isSubmitting}
            className="rounded bg-orange-600 px-4 py-2 font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? "Mohon Tungu ..." : "Pesan Sekarang"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const parseData = JSON.parse(data.cart);
  const cartMenus = Object.values(parseData).filter(
    (item) => typeof item === "object",
  );

  // tolong refactor kode ini
  await Promise.all(
    cartMenus.map(async (item) => {
      await updateQuantity(item.id, item.quantity);
    }),
  );

  // await updateQuantity(cartMenus.id,cart)

  const order = {
    username: parseData.username,
    process: false,
    cart: cartMenus,
  };

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
