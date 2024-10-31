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
      <div className="flex flex-col items-center justify-between sm:gap-6">
        <div className="flex w-full items-center justify-between">
          <div className=" flex w-full flex-col justify-between">
            <p className="mb-1 text-2xl font-bold sm:mb-0">
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
              className="ms-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
