"use client";

import { getOrderById } from "@/actions/order/get-by-id";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  orderId: string;
}

export const OrderProducts: FC<IProps> = ({ orderId }) => {
  const { data: order, isLoading } = useQuery({
    queryKey: ["order-payment"],
    queryFn: async () => {
      const order = await getOrderById({ orderId });

      return order;
    },
  });

  const orderDate =
    order &&
    new Date(order?.createdAt).toLocaleDateString("ru-RU", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-center">
        {order?.products.map((product) => (
          <div key={product.id} className="">
            <Image
              src={product.img}
              alt={product.name}
              width={1000}
              height={1000}
              className="w-[200px] h-[200px]"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-evenly">
        <div className="flex flex-col gap-3">
          <p className="text-[--neutral-04]">Номер заказа:</p>
          <p className="text-[--neutral-04]">Дата:</p>
          <p className="text-[--neutral-04]">Оплачено:</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-primary font-medium">{order?.code}</p>
          <p className="text-primary font-medium">{orderDate}</p>
          <p className="text-primary font-medium">
            {order?.totalSum.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href={"/profile/history"}
          className="mt-5 bg-primary w-fit h-14 px-10 py-2 text-primary-foreground hover:bg-primary/90 gap-3 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          История покупок
        </Link>
      </div>
    </div>
  );
};
