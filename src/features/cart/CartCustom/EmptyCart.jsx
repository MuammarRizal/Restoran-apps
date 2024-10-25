import { IoFastFoodOutline } from "react-icons/io5";

const EmptyCart = () => {
  return (
    <div className="px-4 py-3">
      <p className="mt-7 font-semibold">
        Kamu belum memesan makanan, Silahkan pesan dahulu!{" "}
        <span className="inline-block">
          <IoFastFoodOutline />
        </span>
      </p>
    </div>
  );
};

export default EmptyCart;
