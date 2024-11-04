import { FaAddressBook } from "react-icons/fa";
import { IoIosRestaurant } from "react-icons/io";

import { Link } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import LogoPPKD from "../assets/logo.jpg";

const Header = () => {
  return (
    <header className="mx-auto mb-4 flex max-w-screen-xl items-center justify-between p-4">
      <div to="/" className="flex w-16 items-center gap-2 sm:w-1/4">
        <div className="hidden sm:block">
          <h1 className="-mb-1 text-2xl font-bold">PPKD Jakarta Selatan</h1>
          <Username />
        </div>
      </div>
      <div className="w-full text-center sm:w-1/2">
        <SearchOrder />
      </div>
      <div className="flex w-16 items-center justify-end gap-2 sm:w-1/4 md:hidden">
        <CartOverview />

        <FaAddressBook className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;
