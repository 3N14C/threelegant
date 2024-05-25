import Image from "next/image";
import { FC } from "react";
import { LinkUnderline } from "./link-underline";
import { shopParams } from "@/constants/shop-params";

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
          СКИДКИ ДО 35%
        </p>

        <p className="text-[--neutral-07] font-[500] text-[40px] leading-[110%] -tracking-[0.01rem] max-w-[450px]">
          СОТНИ более новых низких цен!
        </p>

        <p className="text-[20px] leading-[160%] text-[--neutral-07]">
          Это значительно более доступно, чем когда-либо ранее, чтобы дать
          каждой комнате в вашем доме стильный ремонт
        </p>

        <LinkUnderline
          title="Каталог"
          href={`/shop?categoryId=all-rooms&${shopParams}`}
        />
      </div>
    </div>
  );
};
