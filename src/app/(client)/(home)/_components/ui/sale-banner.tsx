import Image from "next/image";
import { FC } from "react";
import { LinkUnderline } from "./link-underline";

export const SaleBanner: FC = () => {
  return (
    <div className="flex lg:flex-row flex-col items-center lg:gap-[70px] bg-[--neutral-03] relative w-full">
      <Image
        src={"/sale-banner.jpg"}
        alt="sale banner"
        width={1000}
        height={1000}
        className="w-[720px] h-[530px]"
      />

      <div className="flex flex-col gap-[15px] lg:p-0 p-[40px]">
        <p className="font-[700] text-base text-[--blue] leading-[100%]">
          SALE UP TO 35% OFF
        </p>

        <p className="text-[--neutral-07] font-[500] text-[40px] leading-[110%] -tracking-[0.01rem] max-w-[450px]">
          HUNDREDS of New lower prices!
        </p>

        <p className="text-[20px] leading-[160%] text-[--neutral-07]">
          It’s more affordable than ever to give every room in your home a
          stylish makeover
        </p>

        <LinkUnderline title="Shop Now" href="/shop" />
      </div>
    </div>
  );
};
