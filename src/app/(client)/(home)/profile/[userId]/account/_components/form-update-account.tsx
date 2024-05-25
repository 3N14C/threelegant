"use client";

import { getCurrentSession } from "@/actions/user/currentSession";
import { updateUserById } from "@/actions/user/patch-by-id";
import { Button } from "@/components/ui/button";
import { InputValidated } from "@/components/ui/input-validated";
import { updateProfileSchema } from "@/zod-schema/form-update-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RegisteredDatabaseUserAttributes } from "lucia";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormUpdateAccount: FC = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["account-data"],
    queryFn: async () => {
      const { user } = await getCurrentSession();

      return user;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof updateProfileSchema>>({
    defaultValues: {
      name: user?.name,
      username: user?.username,
      email: user?.email,
      oldPassword: "",
    },
    values: {
      name: user?.name!,
      username: user?.username!,
      email: user?.email!,
      oldPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUserById,

    onSuccess: () => {
      return toast.success("Данные аккаунта обновлены");
    },

    onError: () => {
      return toast.error("Произошла ошибка при обновлении данных аккаунта");
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    try {
      await mutateAsync({
        ...data,
        userId: user?.id!,
      });
    } catch (error) {
      throw new Error("Произошла ошибка при обновлении данных аккаунта");
    }
  };

  return (
    <div className="">
      <p className="font-semibold text-xl">Данные Аккаунта</p>

      <form onSubmit={handleSubmit(handleOnSubmit)} className="mt-7">
        <div className="flex flex-col gap-5">
          {/* PROFILE DETAILS */}
          <div className="">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Имя
            </p>
            <InputValidated
              register={register("name")}
              errors={errors}
              placeholder="Ваше имя"
              disabled={isPending}
            />
          </div>

          <div className="">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Пользовательское имя
            </p>
            <InputValidated
              register={register("username")}
              errors={errors}
              placeholder="Ваше имя пользователя"
              disabled={isPending}
            />
          </div>

          <div className="">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Почтовый адрес
            </p>
            <InputValidated
              register={register("email")}
              errors={errors}
              placeholder="Ваш почтовый адрес"
              disabled={isPending}
            />
          </div>
        </div>

        {/* PASSWORD DETAILS */}
        <div className="mt-10 flex flex-col gap-5">
          <p className="font-semibold text-xl">Пароль</p>

          <div className="">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Старый пароль
            </p>
            <InputValidated
              register={register("oldPassword")}
              errors={errors}
              placeholder="Ваш старый пароль"
              disabled={isPending}
            />
          </div>

          <div className="">
            <p className="text-[--neutral-04] font-semibold tracking-wider">
              Новый пароль
            </p>
            <InputValidated
              register={register("newPassword")}
              errors={errors}
              placeholder="Ваш новый пароль"
              disabled={isPending}
            />
          </div>
        </div>

        <Button type="submit" className="h-14 px-20 mt-10">
          Изменить
        </Button>
      </form>
    </div>
  );
};
