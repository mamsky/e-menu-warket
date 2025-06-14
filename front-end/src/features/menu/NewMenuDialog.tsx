import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useInputForm } from "@/hook/useInputForm";
import { useMutateQuery } from "@/hook/useMutateQuery";
import {
  ItemsSchemas,
  type ItemsSchemasDTO,
} from "@/libs/schemas/itemsSchemas";
import { useEffect, useRef, useState } from "react";

const NewMenuDialog = () => {
  const { errors, handleSubmit, register, watch, reset } =
    useInputForm<ItemsSchemasDTO>(ItemsSchemas);

  const buttonClose = useRef<HTMLButtonElement>(null);

  const { mutateAsync, isPending } = useMutateQuery<ItemsSchemasDTO>({
    endpoint: "/items",
    key: "items",
    method: "post",
    schema: ItemsSchemas,
    invalidate: "items",
    isFormData: true,
  });

  const file = watch("images");
  const [imgPrv, setImgPrv] = useState<string>("");
  useEffect(() => {
    if (file && file.length > 0) {
      const fileData = file[0];
      const image = URL.createObjectURL(fileData);
      setImgPrv(image);
    }
  }, [file]);

  const onSubmit = async (data: ItemsSchemasDTO) => {
    await mutateAsync(data);
    setImgPrv("");
    reset();
    buttonClose.current?.click();
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger className="p-2 border rounded-md bg-blue-500 border-r-8 border-b-6 font-bold hover:scale-105 cursor-pointer">
          New Menu
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Menu</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <label htmlFor="images">
              <img
                src={imgPrv || "https://placehold.co/600x400.png"}
                className=" w-24 h-24 rounded-full cursor-pointer"
              />
            </label>
            <Input {...register("images")} id="images" type="file" hidden />
            {errors.images && (
              <p className="text-red-500">{errors.images.message}</p>
            )}
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name">Name</label>
              <Input
                {...register("name")}
                id="name"
                placeholder="kentang goreng"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                {...register("category")}
                className="p-2 border rounded-md"
                defaultValue="FOOD"
              >
                <option value="FOOD">FOOD</option>
                <option value="DRINK">DRINK</option>
                <option value="SNACK">SNACK</option>
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <label htmlFor="price">Price</label>
              <Input
                id="price"
                {...register("price", { valueAsNumber: true })}
                type="number"
                placeholder="25.000"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild ref={buttonClose}>
              <button className="p-2 rounded-md  border-r-6 border-b-4 hover:scale-105 cursor-pointer bg-red-500 text-white">
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isPending ? true : false}
              className="p-2 rounded-md border-r-6 border-b-4 hover:scale-105 cursor-pointer bg-blue-500 text-white"
            >
              Save changes
            </button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default NewMenuDialog;
