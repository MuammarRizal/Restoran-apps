import OrderItem from "./OrderItem";

import { useFetcher, useLoaderData } from "react-router-dom";
import waitingGif from "../../assets/waitinggif.gif";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import UpdateOrder from "./UpdateOrder";
import { useEffect } from "react";
import TableOrder from "../TableOrder/TableOrder";
import { FaHourglassHalf, FaUtensils } from "react-icons/fa";
import { clearCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";

const Order = () => {
  const { detail } = useLoaderData();
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  // console.log(detail);
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const isLoading = fetcher.state === "loading";

  const { id, data, cart, username } = detail;
  const datas = JSON.parse(cart);

  const handlerPesan = () => {
    dispatch(clearCart());
    window.location.href = "/";
  };

  if (isLoading)
    return (
      <>
        <div className="flex h-[100vh] items-center justify-center">
          <div className="flex-shrink flex-grow">
            <div className="mb-2.5 h-6 w-1/2 rounded-full bg-gray-300 "></div>
            <div className="mb-6 h-2 w-2/3 rounded-full bg-gray-300 "></div>
          </div>
          <div className="flex flex-shrink flex-grow items-center justify-end gap-2">
            <div className="mb-2.5 h-8 w-24 rounded-lg bg-gray-300 "></div>
            <div className="mb-2.5 h-8 w-24 rounded-lg bg-gray-300 "></div>
          </div>
        </div>
        <div
          role="status"
          className="animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow md:p-6 "
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 "></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 "></div>
            </div>
            <div className="h-2.5 w-12 rounded-full bg-gray-300 "></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 "></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 "></div>
            </div>
            <div className="h-2.5 w-12 rounded-full bg-gray-300 "></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 "></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 "></div>
            </div>
            <div className="h-2.5 w-12 rounded-full bg-gray-300 "></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 "></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 "></div>
            </div>
            <div className="h-2.5 w-12 rounded-full bg-gray-300 "></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 "></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 "></div>
            </div>
            <div className="h-2.5 w-12 rounded-full bg-gray-300 "></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r">
      {/* Animated Icon at the top */}
      <div className="mb-4 animate-pulse text-blue-600">
        <FaUtensils size={50} />
      </div>

      {/* Bouncing Dots */}
      <div className="mb-6 flex items-center space-x-3">
        <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-green-500 delay-150"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-red-500 delay-300"></div>
      </div>

      {/* Waiting GIF */}
      <div className="mb-6">
        <img
          src={waitingGif}
          alt="waiting gif"
          className=" rounded-lg border border-gray-200 p-2 shadow-lg"
        />
      </div>

      {/* Loading Text with Hourglass Icon */}
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
        <FaHourglassHalf className="animate-spin text-yellow-500" />
        <p>Pesanan sedang dibuat, mohon ditunggu...</p>
      </div>
      <button
        className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        onClick={handlerPesan}
      >
        Pesan Lagi
      </button>
    </div>

    // <div className="space-y-8 px-4 py-6">
    //   <div className="flex flex-wrap items-center justify-between gap-2">
    //     <h2 className="text-xl font-semibold">Order #{id} status</h2>

    //     {/* <div className="space-x-2">
    //       {priority && (
    //         <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
    //           Priority
    //         </span>
    //       )}
    //       <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
    //         {status} order
    //       </span>
    //     </div> */}
    //   </div>

    //   <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
    //     {/* <p className="font-medium">
    //       {deliveryIn >= 0
    //         ? `Pesanan Siap dalam ${calcMinutesLeft(estimatedDelivery)} Menit lagi 😃`
    //         : "Pesanan siap diantar"}
    //     </p>
    //     <p className="text-xs text-stone-500">
    //       (Perkiraan Selesai : {formatDate(estimatedDelivery)})
    //     </p> */}
    //   </div>

    //   <ul className="dive-stone-200 divide-y border-b border-t">
    //     {/* <TableOrder cart={cart} /> */}
    //     {/* <OrderItem item={item} key={item.pizzaId} /> */}
    //   </ul>

    //   <div className="space-y-2 bg-stone-200 px-6 py-5">
    //     <p className="font-bold">Mohon Ditunggu! 😃</p>
    //   </div>
    // </div>
  );
};

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
