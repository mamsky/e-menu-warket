import {
  Dialog,
  DialogClose,
  DialogContent,
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
import type { ItemsTypes } from "@/types/itemsTypes";
import { useEffect, useRef, useState } from "react";

type Props = {
  data: ItemsTypes;
};

const EditMenuDialog = ({ data }: Props) => {
  const { register, handleSubmit, reset, watch } =
    useInputForm<ItemsSchemasDTO>(ItemsSchemas);
  const btnClose = useRef<HTMLButtonElement>(null);

  const img = watch("images");
  const [imgPrv, setImgPrv] = useState<string>(data.images);
  useEffect(() => {
    if (img && img.length > 0) {
      const fileImg = img[0];
      const images = URL.createObjectURL(fileImg);
      setImgPrv(images);
    }
  }, [img]);

  const { mutateAsync, isPending } = useMutateQuery<ItemsSchemasDTO>({
    endpoint: `/items/${data.id}`,
    key: "update-items",
    method: "put",
    schema: ItemsSchemas,
    invalidate: "items",
    isFormData: true,
  });

  const onSubmit = async (data: ItemsSchemasDTO) => {
    await mutateAsync(data);
    reset();
    btnClose.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger className="border border-r-4 border-b-4 border-black p-2 rounded-sm bg-amber-500 font-bold cursor-pointer hover:scale-105">
        Edit
      </DialogTrigger>
      <DialogContent aria-describedby={data.id}>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Edit Menu</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <label htmlFor="images">
            <img
              src={imgPrv}
              alt={data.name}
              className=" w-24 h-24 rounded-full cursor-pointer border-2"
            />
          </label>
          <Input {...register("images")} id="images" type="file" hidden />
        </div>
        <div>
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <Input defaultValue={data.name} {...register("name")} />
        </div>
        <div>
          <label htmlFor="category" className="font-semibold">
            Category
          </label>
          <select
            id="category"
            className="p-2 border rounded-md w-full"
            defaultValue={data.category}
            {...register("category")}
          >
            <option value="FOOD">FOOD</option>
            <option value="DRINK">DRINK</option>
            <option value="SNACK">SNACK</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <Input
            {...register("price", { valueAsNumber: true })}
            type="number"
            defaultValue={data.price}
          />
        </div>
        <div className="flex gap-4 justify-end">
          <DialogClose
            onClick={() => reset()}
            ref={btnClose}
            className="cursor-pointer border border-r-6 border-b-4  p-2 bg-red-500 text-black font-bold"
          >
            Close
          </DialogClose>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending ? true : false}
            className="cursor-pointer border border-r-6 border-b-4  p-2 bg-blue-500 text-black font-bold"
          >
            Save Change
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenuDialog;
