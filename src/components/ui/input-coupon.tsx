"use client";

import { FC } from "react";
import { z } from "zod";
import { coupons } from "@/lib/coupons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { Button } from "./button";

interface IProps {}

export const InputCoupon: FC<IProps> = ({}) => {
  const schema = z.object({
    coupon: z
      .string()
      .refine(
        (coupon) => coupons.some((c) => c.code === coupon),
        "Купон недействителен"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleOnSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="flex items-center">
      <div className="relative">
        <Input
          {...register("coupon")}
          placeholder="Код скидочного купона"
          className="border-primary rounded-r-none"
        />

        {errors.coupon && (
          <p className="text-red-500 absolute">
            {errors.coupon.message?.toString()}
          </p>
        )}
      </div>
      <Button type="submit" className="rounded-l-none">
        Применить
      </Button>
    </form>
  );
};
