import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/helpers";
import { getCurrentQuantityById, removeItem } from "./cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { id, name, quantity, totalPrice, category } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <div className="flex w-full flex-col items-center justify-between sm:gap-6">
        <div className="flex w-full items-center justify-between">
          <div className=" flex w-full flex-col justify-between">
            <p className="text-1xl mb-1 font-bold sm:mb-0">
              {name.toUpperCase()}
            </p>
            <UpdateItemQuantity
              id={id}
              quantity={currentQuantity}
              category={category}
            />
          </div>
          <div className="div-baru">
            <button
              onClick={() => dispatch(removeItem(id))}
              className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              <FiX />
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-gray-200 p-1"></div>
      </div>
    </li>
  );
};

export default CartItem;
