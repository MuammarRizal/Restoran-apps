import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import EmptyCart from "../cart/EmptyCart";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import TableOrder from "../TableOrder/TableOrder";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

  const order = {
    username: parseData.username,
    cart: cartMenus,
  };

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
