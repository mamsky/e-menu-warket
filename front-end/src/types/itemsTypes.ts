export type ItemsTypes = {
  id?: string;
  name: string;
  images: string;
  category: "FOOD" | "DRINK" | "SNACK";
  price: number;
};

export type ListCartItems = {
  name: string;
  category: string;
  price: number;
  count: number;
};
