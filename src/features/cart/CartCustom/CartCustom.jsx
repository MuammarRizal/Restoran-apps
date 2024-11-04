import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";

const CartCustom = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <h1 className="text-xl font-semibold">Keranjang Pesanan</h1>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="mt-6 flex w-full space-x-2">
        <button
          className="w-full rounded bg-slate-100 px-4 py-2 font-medium text-slate-600"
          onClick={() => dispatch(clearCart())}
        >
          Batal
        </button>
        <Link
          to="/order/new"
          className="w-full rounded bg-orange-600 px-4 py-2 text-center  font-medium text-white"
        >
          Pesan
        </Link>
      </div>
    </div>
  );
};

export default CartCustom;
