import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutateQuery } from "@/hook/useMutateQuery";
import { deleteSchemas } from "@/libs/schemas/itemsSchemas";
import type { ItemsTypes } from "@/types/itemsTypes";

type Props = {
  data: ItemsTypes;
};

const DeleteMenuDialog = ({ data }: Props) => {
  const { mutate, isPending } = useMutateQuery({
    endpoint: `/items/${data.id}`,
    key: "delete-items",
    method: "delete",
    schema: deleteSchemas,
    invalidate: "items",
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="border border-r-4 border-b-4 border-black p-2 rounded-sm bg-red-500 font-bold cursor-pointer hover:scale-105">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            do you want to delete this data?
            <img
              src={data.images}
              alt={data.name}
              className="object-cover w-full h-32"
            />
            <h1 className="font-bold text-2xl">{data.name}</h1>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer border-black border border-r-6 border-b-4  p-2 bg-red-500 text-black font-bold">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate({})}
            disabled={isPending ? true : false}
            className="border border-r-4 border-b-4 border-black p-2 rounded-sm bg-red-500 font-bold cursor-pointer hover:scale-105"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMenuDialog;
