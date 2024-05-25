"use client";

import { Button } from "@/components/ui/button";
import { InputValidated } from "@/components/ui/input-validated";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ContactUsBanner: FC = () => {
  const pathname = usePathname();

  if (
    pathname.includes("/checkout") ||
    pathname.includes("/profile") ||
    pathname.includes("user-profile")
  )
    return null;

  const schema = z.object({
    email: z.string().email("Некорректная почта"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleOnSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    toast.success("Письмо отправлено");
  };

  return (
    <div className="relative">
      <Image
        src={"/contact-us.jpg"}
        alt="contact us banner"
        width={3000}
        height={1000}
        className="w-full h-[360px] max-[845px]:hidden"
      />

      <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <div className="text-center flex flex-col gap-2">
          <p className="text-[--neutral-07] font-medium lg:text-[40px] text-[28px] -tracking-[0.01rem] leading-[110%]">
            Получайте уведомления о новых товарах
          </p>

          <p className="text-[--neutral-07] lg:text-[18px] text-sm leading-[167%]">
            Оставьте свою почту и получайте уведомления о новых товарах
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="lg:mt-[45px] my-[30px] flex items-center border-b border-[--neutral-04]"
        >
          <Mail size={24} />
          <InputValidated
            register={register("email")}
            errors={errors}
            placeholder="Ваша почта"
            className="text-base font-medium leading-[175%] -tracking-[0.03rem] text-[--neutral-04] bg-inherit border-none max-w-full"
          />
          <Button
            variant={"ghost"}
            className="text-[16px] text-[--neutral-04] -tracking-[0.03rem] leading-[175%] font-medium"
          >
            Отправить
          </Button>
        </form>
      </div>
    </div>
  );
};
