import { formatCurrency } from "../../utils/helpers.js";
import { useSelector, useDispatch } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice.js";
import UpdateItemQuantity from "../cart/UpdateItemQuantity.jsx";

export const MenuItem = ({ menu }) => {
  const dispatch = useDispatch();

  const { id, name, image, inStock, category } = menu;
  const unitPrice = 1;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  const addToCart = () => {
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      category,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <div className="rounded-lg bg-white p-2 text-center shadow transition-all hover:shadow-lg">
      <img
        src={`./ImageMenus/${image}`}
        alt={name}
        className="mx-auto mb-2 h-[50%] w-full overflow-hidden object-cover"
      />

      <div className="menu-body">
        <div className="mb-2">
          <h3 className="font-medium">{name}</h3>

          {inStock ? (
            <p className="text-gray-400">Habis</p>
          ) : (
            <p className="text-gray-400">Tersedia</p>
          )}

          <p className="line-clamp-1 text-sm opacity-50">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
        </div>

        {isInCart && (
          <UpdateItemQuantity pizzaId={id} quantity={currentQuantity} />
        )}

        {!inStock && !isInCart && (
          <button
            className="mt-2 w-full rounded bg-slate-600 py-1 text-white transition-all hover:bg-orange-600"
            onClick={addToCart}
          >
            Tambahkan
          </button>
        )}
      </div>
    </div>
  );
};
