import React, { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { FaQrcode, FaCameraRetro } from "react-icons/fa"; // Mengimpor ikon dari React Icons

const ValidationQR = () => {
  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Memeriksa apakah qrCode ada dan memenuhi syarat
    if (qrCode && parseInt(qrCode) <= 100) {
      localStorage.setItem("qr_code", qrCode);
      navigate("/"); // Menggunakan useNavigate untuk melakukan redirect
    }
  }, [qrCode, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white">
      <div className="container-scanner max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          <FaQrcode className="mb-1 mr-2 inline-block text-blue-600" />
          PPKD Jakarta Selatan
        </h1>
        <p className="mb-6 text-gray-600">
          Arahkan kamera ke QR code untuk memindai.
          <FaCameraRetro className="mb-1 ml-2 inline-block text-yellow-500" />
        </p>

        <div className="relative mb-4 flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
          <Scanner
            onScan={(result) => {
              if (result.length > 0) {
                setQrCode(result[0].rawValue); // Mengambil nilai QR code
              }
            }}
            classNames="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-semibold text-slate-200">
              Arahkan QR Code ke sini
            </p>
          </div>
        </div>

        {qrCode ? (
          <div className="rounded-lg bg-green-100 p-4 text-green-800 shadow-inner">
            <p className="font-semibold">QR Code Terdeteksi:</p>
            <p className="break-words">PPKDJS-{qrCode}</p>
          </div>
        ) : (
          <p className="italic text-gray-500">Menunggu pemindaian...</p>
        )}
      </div>
    </div>
  );
};

export default ValidationQR;
