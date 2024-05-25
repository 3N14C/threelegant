"use client";

import { Logo } from "@/components/ui/logo";
import { FC } from "react";
import { navbar } from "../header";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

export const Footer: FC = () => {
  return (
    <div className="bg-[--neutral-07] pb-10">
      <div className="lg:w-[1440px] lg:mx-auto">
        <div className="flex lg:flex-row flex-col items-center justify-between pt-[80px]">
          <div className="flex lg:flex-row flex-col items-center lg:gap-[30px] gap-2">
            <Logo className="text-white" />
            <div className="bg-[--neutral-04] w-[1px] h-6 rotate-90 lg:rotate-0" />
            <p className="text-[--neutral-03] text-sm leading-[157%]">
              Магазин подарков и украшений
            </p>
          </div>

          <div className="flex lg:flex-row flex-col items-center gap-[40px] lg:mt-0 mt-10">
            {navbar.map((nav, idx) => (
              <Link
                href={nav.href}
                key={nav.id}
                className={cn("text-[--neutral-01] text-sm leading-[157%]")}
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t-[0.50px] border-[--neutral-04] mt-[50px]">
          <div className="flex lg:flex-row flex-col items-center gap-[30px] pt-[15px]">
            <p className="text-[12px] text-[--neutral-03] leading-[167%]">
              Copyright © 2022 3legant. Все права защищены.
            </p>

            <Link
              href={"/privacy-policy"}
              className="text-[12px] font-semibold text-[--neutral-01] leading-[167%] tracking-wider"
            >
              Политика конфиденциальности
            </Link>

            <Link
              href={"/terms-of-use"}
              className="text-[12px] font-semibold text-[--neutral-01] leading-[167%]"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
