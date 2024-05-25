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
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/actions/auth/sign-in";
import { parseAsString, useQueryState } from "nuqs";
import { Loader2 } from "lucide-react";

export const FormSignIn: FC = ({}) => {
  const [callbackUrl] = useQueryState("callbackUrl", parseAsString);
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
  });

  const handleOnsubmit = async (data: z.infer<typeof formSignInSchema>) => {
    await mutateAsync({
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl ?? "/",
    });
  };

  return (
    <div className="">
      <form
        className="flex flex-col gap-[25px]"
        onSubmit={handleSubmit(handleOnsubmit)}
      >
        <div className="">
          <Input
            {...register("email")}
            placeholder="Ваша почта"
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

        <ButtonAuth
          disabled={isPending}
          className="disabled:bg-primary/50"
          onClick={async () =>
            isSubmitSuccessful ? router.push(callbackUrl ?? "/") : null
          }
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Войти в аккаунт"}
        </ButtonAuth>
      </form>
    </div>
  );
};
