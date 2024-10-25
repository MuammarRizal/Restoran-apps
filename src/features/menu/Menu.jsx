import { getMenu } from "../../services/apiRestaurant.js";
import { useLoaderData } from "react-router-dom";
import { MenuItem } from "./MenuItem.jsx";
import CartCustom from "../cart/CartCustom/CartCustom.jsx";

const Menu = () => {
  const menu = useLoaderData();

  return (
    <>
      <div className="container flex">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
          {menu.map((item) => (
            <MenuItem key={item.id} pizza={item} />
          ))}
        </div>
        <div className="container w-[45%]">
          <CartCustom />
        </div>
      </div>
    </>
  );
};
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
