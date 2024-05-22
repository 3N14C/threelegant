"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Title } from "@/components/ui/title";
import { useCart } from "@/store/cart-store";
import { ShoppingBag, X } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "sonner";
import { CartProductCounter } from "./cart-prodcut-counter";
import { ProductPrice } from "./product-price";

export const CartMenu: FC = () => {
  const { items, removeItem, totalPrice } = useCart();
  const [open, setOpen] = useState<boolean>(false);

  const handleRemove = (id: string) => {
    removeItem(id);
    toast.success("Товар удален из корзины");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <CartProductCounter />
      </SheetTrigger>

      <SheetContent className="min-w-[30%]">
        <Title title="Корзина" />

        {items.length > 0 ? (
          <div className="">
            <ScrollArea className="mt-5 lg:h-[700px] h-[450px]">
              <div className="flex flex-col gap-5">
                {items.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className="w-[150px] h-[150px]"
                      />

                      <div className="flex flex-col items-start gap-2">
                        <p className="font-medium capitalize">{product.name}</p>
                        <p className="capitalize">{product.measurements}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 items-center">
                      <ProductPrice price={product.price} />

                      <X
                        className="text-[--neutral-04] cursor-pointer hover:text-red-400 transition duration-300"
                        onClick={() => handleRemove(product.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex flex-col gap-10">
              <div className="flex items-center justify-between font-bold text-xl">
                <p>Итого:</p>

                <p>
                  {totalPrice.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <Link
                // При нажатии на ссылку окно корзины закрывается
                onClick={() => setOpen(false)}
                href={"/checkout/cart"}
                className="bg-black h-14 px-4 py-2 text-primary-foreground hover:bg-black/90 gap-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <ShoppingBag /> К оформлению
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-5">Корзина пуста</p>
        )}
      </SheetContent>
    </Sheet>
  );
};
