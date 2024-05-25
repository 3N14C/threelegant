"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const ButtonLink: FC<IProps> = ({ children, href, className }) => {
  return (
    <Link
      href={"/checkout/information"}
      className={cn(
        "mt-5 bg-primary w-full h-12 px-4 py-2 text-primary-foreground hover:bg-primary/90 gap-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {children}
    </Link>
  );
};
