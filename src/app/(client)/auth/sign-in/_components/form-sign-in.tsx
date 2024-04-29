"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { formSignInSchema } from "@/zod-schema/form-sign-in-schema";
import { formSignUpSchema } from "@/zod-schema/form-sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonAuth } from "../../_components/ui/button-auth";
import { useRouter } from "next/navigation";

export const FormSignIn: FC = ({}) => {
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
  });

  return (
    <div className="">
      <form
        className="flex flex-col gap-[25px]"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="">
          <Input
            {...register("emailOrUsername")}
            placeholder="Имя пользователя или почта"
            className="rounded-lg w-full"
          />

          {errors.emailOrUsername && (
            <p className="text-red-500 text-sm">
              {errors.emailOrUsername.message}
            </p>
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

        <ButtonAuth
          title="Войти в аккаунт"
          onClick={async () => (isSubmitSuccessful ? router.push("/") : null)}
        />
      </form>
    </div>
  );
};
