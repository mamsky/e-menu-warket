import { useGetQuery } from "@/hook/useGetQuery";
import type { ItemsTypes } from "@/types/itemsTypes";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CardMenu from "./CardMenu";
import SkeletonSpinner from "@/components/ui/skeleton-spinner";

const OrderFeatures = () => {
  const { id } = useParams();
  const [btnClick, setBtnClick] = useState<string>("ALL");
  const { data, isLoading } = useGetQuery<ItemsTypes[]>({
    key: "items",
    query: "/items",
  });

  if (isLoading) return <SkeletonSpinner />;

  const filterData =
    btnClick == "ALL"
      ? data
      : data?.filter((fill) => fill.category == btnClick);

  return (
    <div className="w-full h-screen ">
      <div className="h-20 bg-blue-500 flex gap-4 items-center justify-center">
        {["ALL", "FOOD", "DRINK", "SNACK"].map((fielBtn, i) => (
          <button
            key={i}
            onClick={() => setBtnClick(fielBtn)}
            className="border border-r-6 border-b-6 border-black bg-amber-400 p-2 cursor-pointer hover:bg-amber-600"
          >
            {fielBtn}
          </button>
        ))}
      </div>
      <h1 className="my-4 text-center text-2xl font-bold">Table Order {id}</h1>
      <div className="mx-4 ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filterData!.length > 0 ? (
            filterData?.map((field, i) => <CardMenu key={i} data={field} />)
          ) : (
            <p>Data {btnClick} Is Empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderFeatures;
