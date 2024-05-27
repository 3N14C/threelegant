"use client";

import { useCart } from "@/store/cart-store";
import Image from "next/image";
import { FC } from "react";
import { CartSummary } from "./cart-summary";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const tableNames = [
  {
    id: "product",
    name: "Товар",
  },

  {
    id: "quantity",
    name: "Количество",
  },

  {
    id: "price",
    name: "Цена",
  },

  {
    id: "total",
    name: "Сумма",
  },
];

export const ProductsTable: FC = () => {
  const { items, removeItem } = useCart();

  const handleRemove = (id: string) => {
    removeItem(id);
    toast.success("Товар удален из корзины");
  };

  if (items.length === 0) return null;

  return (
    <div className="">
      <div className="hidden lg:block">
        <div className="grid grid-cols-9 border-b-4 border-[--neutral-03] pb-3">
          {tableNames.map((table) => (
            <div
              key={table.id}
              className={cn("col-span-2", {
                "col-span-3": table.id === "product",
              })}
            >
              <p className="">{table.name}</p>
            </div>
          ))}
        </div>

        <ScrollArea className="h-[400px]">
          {items.map((product) => (
            <div key={product.id} className="grid grid-cols-9 items-center">
              <div className="flex items-center gap-2 col-span-3">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={1000}
                  height={1000}
                  className="w-[150px] h-[150px]"
                />

                <div className="flex flex-col gap-3">
                  <p className="text-md font-semibold capitalize">
                    {product.name}
                  </p>

                  <div
                    className="flex items-center gap-1 text-[--neutral-04] cursor-pointer hover:text-red-400 transition duration-300"
                    onClick={() => handleRemove(product.id)}
                  >
                    <X className="" />
                    <p className="text-sm">Удалить</p>
                  </div>
                </div>
              </div>

              <p className="text-center">1</p>

              <p className="text-center col-span-3">
                {product.price.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                  maximumFractionDigits: 2,
                })}
              </p>

              <p className="text-center col-span-1">
                {product.price.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="block lg:hidden">
        <p className="text-md font-semibold border-b-4 border-[--neutral-03] pb-3">
          Товары
        </p>

        <div className="flex flex-col gap-3 items-center">
          {items.map((product) => (
            <div key={product.id} className="grid grid-cols-2 items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={1000}
                  height={1000}
                  className="w-[150px] h-[150px]"
                />

                <p className="text-md font-semibold capitalize">
                  {product.name}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-semibold">
                  {product.price.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    maximumFractionDigits: 2,
                  })}
                </p>

                <X
                  className="cursor-pointer text-[--neutral-04] w-full"
                  onClick={() => handleRemove(product.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
