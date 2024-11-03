import React, { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { FaQrcode, FaCameraRetro } from "react-icons/fa";
import { ApiLocal } from "../utils/localenv";
import LogoPPKD from "../assets/logo.png";

const ValidationQR = () => {
  const [qrCode, setQrCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const formats = [
    "aztec",
    "code_128",
    "code_39",
    "code_93",
    "codabar",
    "databar",
    "databar_expanded",
    "data_matrix",
    "dx_film_edge",
    "ean_13",
    "ean_8",
    "itf",
    "maxi_code",
    "micro_qr_code",
    "pdf417",
    "qr_code",
    "rm_qr_code",
    "upc_a",
    "upc_e",
    "linear_codes",
    "matrix_codes",
    "unknown",
  ];

  const handleScan = async (result) => {
    if (result.length > 0) {
      try {
        const res = await fetch(
          `${ApiLocal}/validation/${result[0].rawValue}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const dataResponse = await res.json();
        if (!res.ok) {
          setErrorMessage(dataResponse.message);
        } else {
          setQrCode(result[0].rawValue);
        }
      } catch (error) {
        console.error("Error fetching validation:", error);
        setErrorMessage("QR Tidak terdeteksi, Coba lagi");
      }
    }
  };

  useEffect(() => {
    if (qrCode && parseInt(qrCode) <= 100) {
      localStorage.setItem("qr_code", qrCode);
      navigate("/");
    }
  }, [qrCode, navigate]);

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
      <div className="container-scanner max-w-md rounded-lg bg-white p-8 text-center shadow-2xl">
        <h1 className="mb-4 flex flex-col items-center text-3xl font-bold text-gray-800">
          <img src={LogoPPKD} alt="Logo PPKD" className="w-40" />
          PPKD Jakarta Selatan
        </h1>
        <p className="mb-6 flex items-center justify-center text-gray-600">
          Arahkan kamera ke QR code untuk memindai
          <FaCameraRetro className="ml-2 inline-block text-yellow-500" />
        </p>

        <div className="relative mb-4 flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-100 shadow-md">
          <Scanner
            allowMultiple={true}
            formats={formats}
            onScan={handleScan}
            classNames="w-full h-full object-cover"
          />
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

      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-red-600">Peringatan</h2>
            <p className="mb-6 text-gray-700">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationQR;
