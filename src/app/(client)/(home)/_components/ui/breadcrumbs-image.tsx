"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  src: string;
  title: string;
  subtitle: string;

  links: {
    title: string;
    href?: string;
  }[];
}

export const BreadcrumbsImage: FC<IProps> = ({
  src,
  title,
  subtitle,
  links,
}) => {
  return (
    <div className="relative">
      <Image
        src={src}
        alt="image"
        width={1000}
        height={1000}
        className="w-full h-[400px]"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center gap-6">
        <Breadcrumbs links={links} />

        <p className="font-medium lg:text-[54px] text-[40px] -tracking-[0.02rem] leading-[107%] capitalize">
          {title}
        </p>
        <p className="lg:text-[20px] leading-[160%] text-[--neutral-07]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
