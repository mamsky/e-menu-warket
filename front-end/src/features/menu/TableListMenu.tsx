import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetQuery } from "@/hook/useGetQuery";
import type { ItemsTypes } from "@/types/itemsTypes";
import EditMenuDialog from "./EditMenuDialog";
import DeleteMenuDialog from "./DeleteMenuDialog";

const TableListMenu = () => {
  const { data } = useGetQuery<ItemsTypes[]>({
    key: "items",
    query: "/items",
  });

  return (
    <div className="mx-2 md:mx-0">
      <Table className="border border-r-8 border-b-8">
        <TableCaption>A list All Menu.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                You don't have items
              </TableCell>
            </TableRow>
          )}

          {data?.map((field, i) => (
            <TableRow key={field.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>
                <img
                  src={field.images}
                  alt={field.name}
                  className="max-w-12 max-h-12"
                />
              </TableCell>
              <TableCell>{field.name}</TableCell>
              <TableCell>{field.category}</TableCell>
              <TableCell>{field.price}</TableCell>
              <TableCell className="flex gap-4 items-center">
                <EditMenuDialog data={field} />
                <DeleteMenuDialog data={field} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableListMenu;
