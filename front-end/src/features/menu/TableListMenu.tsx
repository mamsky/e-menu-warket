import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableListMenu = () => {
  return (
    <Table className="border border-r-8 border-b-8">
      <TableCaption>A list All Menu.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">01</TableCell>
          <TableCell>Kenthang</TableCell>
          <TableCell>FOOD</TableCell>
          <TableCell>25.000</TableCell>
          <TableCell className="flex gap-4 items-center">
            <button className="border border-r-4 border-b-4 border-black p-2 rounded-sm bg-amber-500 font-bold cursor-pointer hover:scale-105">
              Edit
            </button>
            <button className="border border-r-4 border-b-4 border-black p-2 rounded-sm bg-red-500 font-bold cursor-pointer hover:scale-105">
              Delete
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableListMenu;
