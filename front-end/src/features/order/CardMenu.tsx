import { useCartStoresV3 } from "@/stores/useCartStores";
import type { ItemsTypes } from "@/types/itemsTypes";
import toast from "react-hot-toast";

type Props = {
  data: ItemsTypes;
};
const CardMenu = ({ data }: Props) => {
  const { setItems } = useCartStoresV3();
  const cartItems = (name: string) => {
    setItems({
      name: data.name,
      price: data.price,
      category: data.category,
      count: 1,
    });
    toast.success(`Add ${name} +1`);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full max-h-44 h-44 object-cover"
        src={data.images}
        alt="Sunset in the mountains"
      />
      <div className="p-2">
        <div className="">Name: {data.name}</div>
        <div className="">price: {data.price}</div>
      </div>
      <button
        onClick={() => cartItems(data.name)}
        className="w-full md:p-2 bg-blue-500 hover:bg-blue-700 text-center font-bold text-2xl text-white cursor-pointer"
      >
        Cart
      </button>
    </div>
  );
};

export default CardMenu;
