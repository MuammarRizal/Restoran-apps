import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const username = useSelector((state) => state.user.name);
  const navigate = useNavigate();
  const qrCode = localStorage.getItem("qr_code");
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  useEffect(() => {
    // Memeriksa keberadaan qr_code di localStorage
    if (!qrCode) {
      setIsModalOpen(true); // Buka modal jika tidak ada kode QR
    }
  }, [navigate, qrCode]);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/validation"); // Arahkan ke halaman pemindaian setelah menutup modal
  };

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-16 text-3xl font-semibold sm:text-6xl md:text-6xl">
        Selamat Datang Di Open Kedai
        <br />
        <span className="text-orange-500">
          Pusat Pelatihan Kerja Daerah Jakarta Selatan
        </span>
      </h1>
      {username === "" ? (
        <CreateUser qr_code={qrCode} />
      ) : (
        <Link
          to="/menu"
          className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        >
          Continue ordering, {username}!
        </Link>
      )}

      {/* Modal untuk menampilkan pesan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Peringatan!</h2>
            <p className="mb-4 text-gray-700">
              Anda tidak punya kode QR. Silakan pindai kode QR terlebih dahulu.
            </p>
            <button
              className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
