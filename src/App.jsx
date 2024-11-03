import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout.jsx";
import Home from "./ui/Home.jsx";
import Menu, { loader as menuLoader } from "./features/menu/Menu.jsx";
import Cart from "./features/cart/Cart.jsx";
import Order, { loader as orderLoader } from "./features/order/Order.jsx";
import OrderError from "./features/order/OrderError.jsx";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder.jsx";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import KitchenPage from "./Kitchen/KitchenPage.jsx";
import Orders from "./Kitchen/components/Orders.jsx";
import KitchenOrders from "./Kitchen/components/Orders.jsx";
import MenuKitchen from "./Kitchen/components/Menu.jsx";
import DeliveryTable from "./Delivery/DeliveryTable.jsx";
import Barista from "./Kitchen/components/Barista.jsx";
import ValidationQR from "./ui/ValidationQR.jsx";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: createOrderAction,
        },

        {
          path: "/order/:orderId",
          element: <Order />,
          loader: orderLoader,
          errorElement: <OrderError />,
          action: updateOrderAction,
        },
        {
          path: "/kitchen",
          element: <KitchenPage />,
        },
        {
          path: "/kitchen/tataboga/orders",
          element: <KitchenOrders />,
        },
        {
          path: "/kitchen/barista/orders",
          element: <Barista />,
        },
        {
          path: "/kitchen/Menu",
          element: <MenuKitchen />,
        },
        {
          path: "/delivery",
          element: <DeliveryTable />,
        },
        {
          path: "/validation",
          element: <ValidationQR />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
