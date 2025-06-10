import NewMenuDialog from "./NewMenuDialog";
import TableListMenu from "./TableListMenu";

const MenuFeatures = () => {
  return (
    <>
      <div className="flex justify-between my-4 mx-2">
        <h1 className="text-4xl font-bold">List Menu</h1>
        <NewMenuDialog />
      </div>
      <TableListMenu />
    </>
  );
};
export default MenuFeatures;
