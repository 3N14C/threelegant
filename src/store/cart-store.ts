import { ProductWithCreatedAt } from "@/app/(client)/(home)/_components/ui/product-card";
import { orderPriceList } from "@/lib/order-price-list";
import { TProduct } from "@/types/product.interface";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IShipping {
  id: string;
  name: string;
  price: number;
}

interface ICartStore {
  items: ProductWithCreatedAt[];
  totalPrice: number;
  shippingType: IShipping;
  changeShipping: (id: string) => void;
  addItem: (product: ProductWithCreatedAt & TProduct) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCart = create<ICartStore>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        totalPrice: 0,
        shippingType: orderPriceList[0],
        addItem: (product: ProductWithCreatedAt & TProduct) => {
          set((state) => ({
            items: [...state.items, product],
            totalPrice: state.totalPrice + product.price,
          }));
        },
        removeItem: (id: string) => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            totalPrice:
              state.totalPrice -
              state.items.find((item) => item.id === id)!.price,
          }));
        },
        changeShipping: (id) => {
          set((state) => ({
            shippingType:
              state.shippingType.id === id
                ? state.shippingType
                : orderPriceList.find((type) => type.id === id)!,
          }));
        },
        clear: () => {
          set({ items: [] });
        },
      }),
      {
        name: "threelegant-cart-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
