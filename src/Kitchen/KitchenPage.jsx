import React from "react";

import Sidebar from "./components/Sidebar";

const KitchenPage = () => {
  return (
    <div className="fixed -ms-[3.7rem] -mt-10 flex w-full">
      <Sidebar />
      <div className="flex-1 p-6"></div>
    </div>
  );
};

export default KitchenPage;
