import { useGetQuery } from "@/hook/useGetQuery";
import CardDashboard from "./CardDashboard";
import type { ItemsSchemasDTO } from "@/libs/schemas/itemsSchemas";

const DashboardFeatures = () => {
  const { data } = useGetQuery<ItemsSchemasDTO[]>({
    key: "items",
    query: "/items",
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly gap-4 px-2">
        <CardDashboard title="Total Revenue" total="IDR 50.000.000" />
        <CardDashboard title="Total Item Sold" num={50} />
        <CardDashboard title="Total Items" num={data?.length} />
      </div>
    </>
  );
};

export default DashboardFeatures;
