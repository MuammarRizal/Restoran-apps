import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { Link } from "react-router-dom";

const Home = () => {
  const username = useSelector((state) => state.user.name);

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
        <CreateUser />
      ) : (
        <Link
          to="/menu"
          className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        >
          Continue ordering, {username}!
        </Link>
      )}{" "}
    </div>
  );
};

export default Home;
