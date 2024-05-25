"use client";

import { getOrdersByUser } from "@/actions/order/get-by-user";
import { OrderDetailsModal } from "@/components/order-details-modal";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "next-view-transitions";
import { FC, useState } from "react";

interface IProps {
  profileId: string;
}

const tableNames = [
  {
    id: "order-code",
    name: "номер заказа",
  },

  {
    id: "order-date",
    name: "дата заказа",
  },

  {
    id: "order-price",
    name: "стоимость заказа",
  },

  {
    id: "order-products",
    name: "Кол-во товаров",
  },
];

export const OrdersProfile: FC<IProps> = ({ profileId }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders-profile"],
    queryFn: async () => await getOrdersByUser({ userId: profileId }),
  });

  if (orders?.length === 0) {
    return (
      <div className="">
        <p className="text-3xl font-medium">Список заказов пуст</p>
      </div>
    );
  }

  return (
    <div className="">
      <p className="text-3xl font-medium">Список заказов</p>

      <div className="mt-5">
        <div className="grid lg:grid-cols-4 justify-items-center">
          {tableNames.map((table) => (
            <div key={table.id} className="">
              <p className="first-letter:capitalize">{table.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          {orders?.map((order, idx) => (
            <div key={order.id} className="">
              <OrderDetailsModal
                open={open}
                setOpen={setOpen}
                orderId={order.id}
              />
              <div
                onClick={() => setOpen(true)}
                className={cn(
                  "grid lg:grid-cols-4 justify-items-center py-2 px-3 rounded-lg cursor-pointer",
                  {
                    "bg-zinc-200": idx % 2 === 0,
                  }
                )}
              >
                <p>{order.code}</p>
                <p>{new Date(order.createdAt).toLocaleDateString("ru-RU")}</p>
                <p>{order.totalSum}</p>
                <p>{order.products ? order.products.length : 0}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
