import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateName, updateTable } from "./userSlice";
import Dropdown from "../../Kitchen/components/Dropdown";

const CreateUser = ({ qr_code }) => {
  const [username, setUsername] = useState("");
  const [meja, setMeja] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    dispatch(updateTable(meja));
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <h2 className="mb-4 text-2xl text-stone-600 md:text-base">
          Kode Anda : PPKDJS-{qr_code}
        </h2>
        <p className="mb-4 text-stone-600 md:text-base">
          👋 Halo, Silahkan masukan nama Anda :
        </p>
      </div>

      <input
        type="text"
        placeholder="Nama Lengkap"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 me-3 w-2/3 rounded-md border border-stone-200 p-2 focus:outline-none focus:ring focus:ring-orange-500 sm:w-1/2"
      />
      <Dropdown setMeja={setMeja} />

      {username !== "" && (
        <div>
          <button className="rounded bg-orange-600 px-4 py-2 font-medium text-white">
            Ayo cari menu
          </button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;
