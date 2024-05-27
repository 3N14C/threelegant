"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Title } from "@/components/ui/title";
import { useCart } from "@/store/cart-store";
import { ShoppingBag, X } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { CartProductCounter } from "./cart-prodcut-counter";
import { ProductPrice } from "./product-price";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const CartMenu: FC = () => {
  const pathname = usePathname();
  const { items, removeItem, totalPrice } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    removeItem(id);
    toast.success("Товар удален из корзины");
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
                    className="flex lg:flex-row flex-col lg:items-center justify-between"
                  >
                    <div className="flex lg:flex-row flex-col lg:items-center gap-3">
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className="lg:w-[150px] lg:h-[150px]"
                      />

                      <div className="flex flex-col items-start gap-2">
                        <p className="font-medium capitalize">{product.name}</p>
                        <p className="capitalize">{product.measurements}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-center">
                      <ProductPrice price={product.price} />

                      <div
                        onMouseEnter={() => setHover(product.id)}
                        onMouseLeave={() => setHover(null)}
                        className={cn(
                          "flex items-center justify-end cursor-pointer"
                        )}
                        onClick={() => handleRemove(product.id)}
                      >
                        <X
                          className={cn(
                            "text-[--neutral-04] transition duration-300",
                            {
                              "text-red-500": hover === product.id,
                            }
                          )}
                        />
                        <p
                          className={cn(
                            "text-[--neutral-04] text-sm transition duration-300",
                            {
                              "text-red-500": hover === product.id,
                            }
                          )}
                        >
                          Удалить
                        </p>
                      </div>
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
