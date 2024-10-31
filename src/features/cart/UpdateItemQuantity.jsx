import { useDispatch } from "react-redux";
import { increaseItem, decreaseItem } from "../cart/cartSlice.js";

const UpdateItemQuantity = ({ pizzaId, quantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* <div className="mx-2">{quantity}</div> */}
    </div>
  );
};

export default UpdateItemQuantity;
