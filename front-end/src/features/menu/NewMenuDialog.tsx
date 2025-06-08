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
import {
  ItemsSchemas,
  type ItemsSchemasDTO,
} from "@/libs/schemas/itemsSchemas";

const NewMenuDialog = () => {
  const { errors, handleSubmit, register } =
    useInputForm<ItemsSchemasDTO>(ItemsSchemas);

  const onSubmit = (data: ItemsSchemasDTO) => {
    console.log(data);
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
            <label htmlFor="image">
              <img
                src="https://placehold.co/600x400.png"
                className=" w-24 h-24 rounded-full cursor-pointer"
              />
            </label>
            <Input {...register("image")} id="image" type="file" hidden />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name-1">Name</label>
              <Input
                {...register("name")}
                id="name-1"
                name="name"
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
            <DialogClose asChild>
              <button className="p-2 rounded-md  border-r-6 border-b-4 hover:scale-105 cursor-pointer bg-red-500 text-white">
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleSubmit(onSubmit)}
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
