"use client";

import { signUp } from "@/actions/auth/sing-up";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { formSignUpSchema } from "@/zod-schema/form-sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonAuth } from "../../_components/ui/button-auth";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export const FormSignUp: FC = ({}) => {
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    control,
  } = useForm<z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(formSignUpSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signUp,
  });

  const handleOnSubmit = async (data: z.infer<typeof formSignUpSchema>) => {
    await mutateAsync({
      email: data.email,
      name: data.name,
      password: data.password,
      username: data.username,
    });
  };

  return (
    <div className="">
      <form
        className="flex flex-col gap-[25px]"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="">
          <Input
            {...register("name")}
            placeholder="Имя"
            className="rounded-lg w-full"
          />

          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="">
          <Input
            {...register("username")}
            placeholder="Имя пользователя"
            className="rounded-lg w-full"
          />

          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="">
          <Input
            {...register("email")}
            placeholder="Почта"
            className="rounded-lg w-full"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="">
          <Input
            {...register("password")}
            placeholder="Пароль"
            className="rounded-lg w-full"
          />

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="">
          <div className="flex items-center lg:gap-[10px] gap-[30px]">
            <Controller
              control={control}
              name="agree"
              render={({ field }) => (
                <>
                  <Checkbox
                    // value={field.value}
                    onCheckedChange={field.onChange}
                    className="w-5 h-5 text-[--neutral-04]"
                  />
                </>
              )}
            />

            <p className="text-[--neutral-04] font-[400] lg:text-base text-sm">
              Я соглашаюсь с{" "}
              <Link
                href={"/"}
                className="text-[--neutral-07] font-[600] lg:hover:underline lg:hover:underline-offset-8"
              >
                Политикой конфиденциальности
              </Link>{" "}
              и{" "}
              <Link
                href={"/"}
                className="text-[--neutral-07] font-[600] lg:hover:underline lg:hover:underline-offset-8"
              >
                Пользовательским соглашением
              </Link>
            </p>
          </div>

          {errors.agree && (
            <p className="text-red-500 text-sm">{errors.agree.message}</p>
          )}
        </div>

        <ButtonAuth disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Создать аккаунт"}
        </ButtonAuth>
      </form>
    </div>
  );
};
