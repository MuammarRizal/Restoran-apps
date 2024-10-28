import { getMenu } from "../../services/apiRestaurant.js";
import { useLoaderData } from "react-router-dom";
import { MenuItem } from "./MenuItem.jsx";
import CartCustom from "../cart/CartCustom/CartCustom.jsx";

const Menu = () => {
  const menu = useLoaderData();
  return (
    <>
      <div className="container relative flex gap-4">
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          {menu.map((item) => (
            <MenuItem key={item.id} menu={item} />
          ))}
        </div>
        <div className="container sticky top-0 hidden h-screen w-[45%] overflow-y-auto rounded border border-gray-300 bg-slate-200 shadow-lg md:block">
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
