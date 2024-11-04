import { useSelector, useDispatch } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice.js";

export const MenuItem = ({ menu }) => {
  const dispatch = useDispatch();

  const { id, name, image, inStock, category, items } = menu;
  const stockJson = JSON.parse(inStock);
  const unitPrice = 1;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  const cart = useSelector((state) => state.cart.cart);

  const addToCart = () => {
    const newItem = {
      ...menu,
      id,
      name,
      quantity: 1,
      unitPrice,
      category,
      totalPrice: unitPrice * 1,
      items,
    };

    dispatch(addItem(newItem));
  };

  // Cek jika ada item di cart yang namanya mengandung "PAKET"
  const hasPaketInCart = cart.some((item) => item.name.includes("PAKET"));
  return (
    <div className="max-w-sm overflow-hidden rounded bg-blue-200 p-5 text-gray-800 shadow-lg">
      <img
        className="h-48 w-full object-cover"
        src={`./ImageMenus/${image}`}
        alt={name}
      />
      <div className="container-items flex flex-col place-content-between">
        <div className="py-4">
          <h2 className="mb-2 text-xl font-bold">{items.title}</h2>
          <div className="flex justify-between">
            <p className="text-sm text-gray-700">{name}</p>
            {stockJson.quantity !== 0 ? (
              <p className="text-sm text-gray-700">
                Tersisa {stockJson.quantity}x
              </p>
            ) : (
              <p className="text-sm text-gray-700">Habis</p>
            )}
          </div>
          {stockJson.quantity !== 0 ? (
            <p
              type="button"
              className="my-1 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            >
              Tersedia
            </p>
          ) : (
            <p
              type="button"
              className="my-1 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            >
              Habis
            </p>
          )}

          <div className="mt-4">
            <p className="font-semibold">Makanan:</p>
            <ul className="ml-4 list-disc">
              {items.food.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <p className="font-semibold">Dessert:</p>
            <p className="ml-4">{items.dessert}</p>
          </div>
        </div>
        <div className="mt-4">
          {stockJson.quantity !== 0 && (
            <div className="buttonItem w-full ">
              <button
                className={`mt-2 w-full rounded py-1 text-white transition-all ${
                  hasPaketInCart
                    ? "cursor-not-allowed bg-gray-500"
                    : "bg-slate-600 hover:bg-orange-600"
                }`}
                onClick={hasPaketInCart ? null : addToCart}
                disabled={hasPaketInCart} // Nonaktifkan tombol jika ada paket di keranjang
              >
                Tambahkan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
