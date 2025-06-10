import type { ListCartItems } from "@/types/itemsTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItems = {
  items: ListCartItems[];
  setItems: (items: ListCartItems) => void;
  increment: (index: number) => void;
  decrement: (index: number) => void;
  resetItems: () => void;
};

export const useCartStores = create<CartItems>((set) => ({
  items: [],
  setItems: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.name === item.name &&
          i.category === item.category &&
          i.price === item.price
      );

      if (existingIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex].count += item.count;
        return { items: updatedItems };
      } else {
        return { items: [...state.items, item] };
      }
    }),

  increment: (index) =>
    set((state) => {
      const updatedItems = [...state.items];
      updatedItems[index].count += 1;
      return { items: updatedItems };
    }),

  decrement: (index) =>
    set((state) => {
      const updatedItems = [...state.items];
      if (updatedItems[index].count > 1) {
        updatedItems[index].count -= 1;
      } else {
        updatedItems.splice(index, 1); // hapus jika count = 1
      }
      return { items: updatedItems };
    }),

  resetItems: () => set({ items: [] }),
}));
// Penjelasan:
// setItems: Menambahkan item ke cart, dan jika sudah ada (berdasarkan name, category, dan price), maka akan menambahkan jumlahnya (count).

// increment/decrement: Menambah atau mengurangi jumlah item di indeks tertentu.

// resetItems: Mengosongkan keranjang.

// Kalau kamu ingin menyesuaikan logika identifikasi item (misalnya berdasarkan id jika kamu punya), tinggal ubah bagian findIndex pada setItems.

// Butuh tambahan fitur seperti total harga atau jumlah item? Bisa saya bantu juga

export const useCartStoresV2 = create<CartItems>((set) => ({
  items: [],
  setItems: (item: ListCartItems) =>
    set((state) => {
      const index = state.items.findIndex(
        (i) => i.name === item.name && i.category === item.category
      );
      if (index > -1) {
        // Jika item sudah ada, tambahkan count
        const newItems = [...state.items];
        newItems[index].count += item.count;
        return { items: newItems };
      }
      // Jika item belum ada, tambahkan ke array
      return { items: [...state.items, item] };
    }),
  increment: (index: number) =>
    set((state) => {
      const newItems = [...state.items];
      newItems[index].count += 1;
      return { items: newItems };
    }),
  decrement: (index: number) =>
    set((state) => {
      const newItems = [...state.items];
      if (newItems[index].count > 1) {
        newItems[index].count -= 1;
      } else {
        // Jika count 1, hapus item dari list
        newItems.splice(index, 1);
      }
      return { items: newItems };
    }),
  resetItems: () => set({ items: [] }),
}));

// Penjelasan
// setItems: Menambahkan item baru atau menambahkan count jika item sudah ada.

// increment: Menambah count berdasarkan index.

// decrement: Mengurangi count, dan menghapus item jika count menjadi 0.

// resetItems: Mengosongkan cart.

// Jika kamu ingin menggunakan ID sebagai identifikasi utama daripada name + category, tambahkan properti id di ListCartItems. Ingin saya bantu refactor ke versi dengan id?

export const useCartStoresV3 = create<CartItems>()(
  persist(
    (set) => ({
      items: [],
      setItems: (item) =>
        set((state) => {
          const index = state.items.findIndex(
            (i) => i.name === item.name && i.category === item.category
          );
          if (index > -1) {
            const newItems = [...state.items];
            newItems[index].count += item.count;
            return { items: newItems };
          }
          return { items: [...state.items, item] };
        }),
      increment: (index) =>
        set((state) => {
          const newItems = [...state.items];
          newItems[index].count += 1;
          return { items: newItems };
        }),
      decrement: (index) =>
        set((state) => {
          const newItems = [...state.items];
          if (newItems[index].count > 1) {
            newItems[index].count -= 1;
          } else {
            newItems.splice(index, 1);
          }
          return { items: newItems };
        }),
      resetItems: () => set({ items: [] }),
    }),
    {
      name: "cart-Items",
    }
  )
);
