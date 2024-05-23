"use client";

import { getAllOrders } from "@/actions/order/get-all";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

const tableNames = [
  {
    id: "order-id",
    name: "Номер заказа",
  },

  {
    id: "order-date",
    name: "Дата заказа",
  },

  {
    id: "order-price",
    name: "Сумма заказа",
  },
];

export const OrderTable: FC = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return (
    <div className="">
      <div className="grid lg:grid-cols-4 items-center">
        {tableNames.map((table) => (
          <p key={table.id} className="text-[--neutral-04]">
            {table.name}
          </p>
        ))}
      </div>

      <ScrollArea className="h-[210.5px]">
        <div className="flex flex-col gap-12 mt-12">
          {orders?.map((order) => (
            <div key={order.id} className="grid lg:grid-cols-4 items-start">
              <p>{order.code}</p>
              <p>
                {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                {order.totalSum.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
