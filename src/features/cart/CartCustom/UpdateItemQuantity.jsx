import { useDispatch } from "react-redux";
import { increaseItem, decreaseItem } from "../../cart/cartSlice.js";

const UpdateItemQuantity = ({ id, quantity, category }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="">{category}</div>
    </div>
  );
};

export default UpdateItemQuantity;
