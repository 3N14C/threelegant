"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formOrderSchema } from "@/zod-schema/form-order-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { InputValidated } from "@/components/ui/input-validated";
import { useCode } from "@/hooks/use-generate-code";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder } from "@/actions/order/post-order";
import { useCart } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { User } from "lucia";

export const FormOrder: FC = () => {
  const code = useCode();
  const { items, totalPrice, shippingType, clear } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    z.infer<typeof formOrderSchema> & {
      code: string;
      totalSum: number;
      productId: string[];
    }
  >({
    resolver: zodResolver(formOrderSchema),
  });

  const { data: user } = useQuery<User>({
    queryKey: ["current-session"],
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      router.push(`/checkout/order/${data.id}`);
      clear();
    },
  });

  const handleOnSubmit = async (
    data: z.infer<typeof formOrderSchema> & {
      code: string;
      totalSum: number;
      productId: string[];
    }
  ) => {
    if (!user)
      return router.replace("/auth/sign-in?callbackUrl=/checkout/information");

    await mutateAsync({
      ...data,
      productId: items.map((product) => product.id),
      code: code,
      totalSum: totalPrice + shippingType.price,
      userId: user.id,
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(
          async (data) =>
            await handleOnSubmit({
              ...data,
            })
        )}
        className="flex flex-col gap-10"
      >
        {/* Contact information */}
        <div
          className={cn(
            "border border-black rounded-lg p-10 w-full flex flex-col gap-5",
            {
              "bg-zinc-200": isPending,
            }
          )}
        >
          <p
            className={cn("font-semibold text-xl tracking-wider", {
              "text-[--neutral-04]": isPending,
            })}
          >
            Контактная информация
          </p>

          <div className="flex items-center gap-10 mt-5">
            <div className="w-full flex flex-col gap-1">
              <p className="text-[--neutral-04] font-semibold tracking-wider">
                Имя
              </p>
              <InputValidated
                register={register("firstName")}
                errors={errors}
                placeholder="Ваше имя"
                disabled={isPending}
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <p className="text-[--neutral-04] font-semibold tracking-wider">
                Фамилия
              </p>
              <InputValidated
                register={register("lastName")}
                errors={errors}
                placeholder="Ваша фамилия"
                disabled={isPending}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Почтовый адрес
            </p>
            <InputValidated
              register={register("email")}
              errors={errors}
              placeholder="Ваша почта"
              disabled={isPending}
            />
          </div>
        </div>

        {/* Address information */}
        <div
          className={cn(
            "border border-black rounded-lg p-10 w-full flex flex-col gap-5",
            {
              "bg-zinc-200": isPending,
            }
          )}
        >
          <p
            className={cn("font-semibold text-xl tracking-wider", {
              "text-[--neutral-04]": isPending,
            })}
          >
            Адрес доставки
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Город
            </p>
            <InputValidated
              register={register("city")}
              errors={errors}
              placeholder="г. Иркутск"
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Улица
            </p>
            <InputValidated
              register={register("street")}
              errors={errors}
              placeholder="ул. Ленина 27/3"
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Почтовый индекс
            </p>
            <InputValidated
              register={register("zipCode")}
              errors={errors}
              placeholder="660041"
              disabled={isPending}
            />
          </div>
        </div>

        {/* Payment information */}
        <div
          className={cn(
            "border border-black rounded-lg p-10 w-full flex flex-col gap-5",
            {
              "bg-zinc-200": isPending,
            }
          )}
        >
          <p
            className={cn("font-semibold text-xl tracking-wider", {
              "text-[--neutral-04]": isPending,
            })}
          >
            Способ оплаты
          </p>

          <div className="flex flex-col gap-1">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Номер карты
            </p>
            <InputValidated
              max={16}
              maxLength={16}
              register={register("card")}
              errors={errors}
              placeholder="4242 4242 4242 4242"
              disabled={isPending}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[--neutral-04] font-semibold tracking-wider">
                Дата
              </p>
              <InputValidated
                max={4}
                maxLength={4}
                register={register("date")}
                errors={errors}
                placeholder="MM/YY"
                disabled={isPending}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[--neutral-04] font-semibold tracking-wider">
                CVC
              </p>
              <InputValidated
                max={3}
                maxLength={3}
                register={register("cvc")}
                errors={errors}
                placeholder="123"
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        <Button
          disabled={isPending}
          className={cn("h-14 w-full", {
            "bg-primary/50": isPending,
          })}
          type="submit"
        >
          Подтвердить заказ
        </Button>
      </form>
    </div>
  );
};
