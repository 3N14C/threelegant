"use client";

import { getAllOrders } from "@/actions/order/get-all";
import { getOrdersByUser } from "@/actions/order/get-by-user";
import { getCurrentSession } from "@/actions/user/currentSession";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucia";
import { FC, useEffect } from "react";

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
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-all-orders-by-user"],
    queryFn: async () => {
      // return user && (await getOrdersByUser({ userId: user.id }));
      const { user } = await getCurrentSession();
      return await getOrdersByUser({ userId: user?.id! });
    },
  });

  return (
    <div className="">
      {/* DESKTOP VERSION */}
      <div className="lg:block hidden">
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

      {/* MOBILE VERSION */}
      <div className="lg:hidden block">
        <ScrollArea className="h-[210px]">
          <div className="flex flex-col gap-14 items-start">
            {orders?.map((order) => (
              <div key={order.id} className="grid grid-cols-2 gap-20">
                <div className="flex flex-col gap-7 items-start">
                  {tableNames.map((table) => (
                    <p key={table.id} className="text-[--neutral-04]">
                      {table.name}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col gap-7 items-end w-full">
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
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
