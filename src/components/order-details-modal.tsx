"use client";

import { getOrderById } from "@/actions/order/get-by-id";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  orderId: string;
}

export const OrderDetailsModal: FC<IProps> = ({ open, setOpen, orderId }) => {
  const { data: order, isLoading } = useQuery({
    queryKey: ["order-details"],
    queryFn: async () => await getOrderById({ orderId }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Детали заказа</DialogTitle>
        </DialogHeader>

        <ScrollArea
          className={cn("", {
            "h-[500px]": order?.products && order?.products.length > 4,
          })}
        >
          <div className="flex flex-col gap-4">
            {order?.products.map((product) => (
              <Link
                href={`/product/${product.id}?productPage=info`}
                key={product.id}
                className="flex items-center gap-4"
              >
                <Image
                  src={product.img}
                  alt={product.name}
                  width={1000}
                  height={1000}
                  className="w-[100px] h-[100px]"
                />

                <div className="">
                  <p className="font-medium text-lg leading-[178%] -tracking-[0.02rem] text-[--neutral-07] capitalize">
                    {product.name}
                  </p>

                  <p className="text-[--neutral-04]">{product.measurements}</p>

                  <p className="font-medium text-lg leading-[178%] -tracking-[0.02rem] text-[--neutral-07]">
                    {product.price.toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
