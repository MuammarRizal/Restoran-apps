import { useDispatch } from "react-redux";
import { increaseItem, decreaseItem } from "../../cart/cartSlice.js";

const UpdateItemQuantity = ({ id, quantity, category }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* <button
        className="rounded-lg bg-gray-50 px-3 pb-1 pt-0.5 text-xl text-gray-600 transition-all hover:bg-gray-100"
        onClick={() => dispatch(decreaseItem(id))}
      >
        -
      </button> */}
      <div className="">{category}</div>
      {/* <button
        className="rounded-lg bg-orange-400 px-3 pb-1 pt-0.5 text-xl text-white transition-all hover:bg-orange-500"
        onClick={() => dispatch(increaseItem(id))}
      >
        +
      </button> */}
    </div>
  );
};

export default UpdateItemQuantity;
