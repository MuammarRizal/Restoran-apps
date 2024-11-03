import useSWR from "swr";
import { MenuItem } from "./MenuItem.jsx";
import CartCustom from "../cart/CartCustom/CartCustom.jsx";
import { MenuDrink } from "./MenuDrink.jsx";
import { getMenu } from "../../services/apiRestaurant.js";
const apiUrl = import.meta.env.LOCAL_NETWORK_API;
const apiLocalhost = import.meta.env.LOCALHOST;

const fetcher = async () => {
  const data = await getMenu();
  return data;
};

const Menu = () => {
  // Fetch data menggunakan SWR
  const { data: menu, error } = useSWR(`${apiUrl}/menus`, fetcher, {
    // const { data: menu, error } = useSWR(`${apiLocalhost}/menus`, fetcher, {
    refreshInterval: 2000,
  });

  if (error) return <div>Error loading data...</div>;
  if (!menu) return <div>Loading...</div>;

  // Fungsi untuk merender item berdasarkan kategori
  const renderCategory = (category, Component, title) => (
    <>
      <h1 className="mb-4 text-2xl font-semibold">{title}</h1>
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {menu
          .filter((item) => item.items.category === category)
          .map((item) => (
            <Component key={item.id} menu={item} />
          ))}
      </div>
    </>
  );

  return (
    <div className="container relative flex gap-6 p-4">
      <div className="w-full">
        {renderCategory("food", MenuItem, "Food")}
        {renderCategory("coffee", MenuDrink, "Coffee")}
        {renderCategory("non-coffee", MenuDrink, "Non-Coffee")}
      </div>

      <div className="sticky top-0 hidden h-screen w-[45%] overflow-y-auto rounded border border-gray-300 bg-slate-200 p-4 shadow-lg md:block">
        <CartCustom />
      </div>
    </div>
  );
};

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
