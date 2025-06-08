import CardDashboard from "./CardDashboard";

const DashboardFeatures = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly gap-4">
        <CardDashboard title="Total Revenue" data="IDR 50.000.000" />
        <CardDashboard title="Total Item Sold" data="50" />
        <CardDashboard title="Total Items" data="12" />
      </div>
    </>
  );
};

export default DashboardFeatures;
