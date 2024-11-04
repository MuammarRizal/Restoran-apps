import React from "react";

const LoadingPPKD = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="flex items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
        <span className="ml-4 block text-2xl font-bold text-blue-600">
          Pusat Pelatihan Kerja Daerah Jakarta Selatan
        </span>
        <span className="ml-4 text-2xl font-bold text-blue-600"></span>
        <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
      </div>
    </div>
  );
};

export default LoadingPPKD;
