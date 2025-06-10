import type { ItemsTypes } from "@/types/itemsTypes";

type Props = {
  data: ItemsTypes;
};
const CardMenu = ({ data }: Props) => {
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
      <button className="w-full md:p-2 bg-blue-500 hover:bg-blue-700 text-center font-bold text-2xl text-white cursor-pointer">
        Cart
      </button>
    </div>
  );
};

export default CardMenu;
