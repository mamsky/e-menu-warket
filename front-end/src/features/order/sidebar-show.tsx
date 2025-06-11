import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStoresV3 } from "@/stores/useCartStores";
import { IoCartOutline } from "react-icons/io5";

const SidebarShow = () => {
  const { items, decrement, increment } = useCartStoresV3();
  return (
    <Sheet>
      <SheetTrigger className="text-black cursor-pointer">
        <div className="relative">
          {items.length > 0 && (
            <div className="absolute bg-red-500 rounded-full px-2 -top-2 -right-2">
              {items.length}
            </div>
          )}
          <IoCartOutline size={40} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex gap-2 items-center text-2xl">
            <IoCartOutline size={40} />
            Cart items Warket
          </SheetTitle>
          {items.length == 0 && <p>Empty Cart</p>}
          {items.length > 0 && (
            <ul className="max-h-[70vh] overflow-y-auto">
              <h1 className="text-2xl font-bold">List Items</h1>
              {items.map((item, index) => (
                <li key={index} className="mb-2">
                  <div>
                    <strong>{item.name}</strong> - {item.price} x {item.count} ={" "}
                    {item.price * item.count}
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => decrement(index)}
                      className="px-2 bg-red-500 text-white rounded cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      onClick={() => increment(index)}
                      className="px-2 bg-green-500 text-white rounded cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SheetHeader>
        <SheetFooter>
          <Button className="border py-8 cursor-pointer font-bold text-2xl text-center">
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarShow;
