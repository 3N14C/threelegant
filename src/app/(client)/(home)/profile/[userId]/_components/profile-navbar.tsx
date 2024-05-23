"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { FC } from "react";

type Tag = "button" | "link";

interface IPropsNAvbarComponent {
  title: string;
  tag: Tag;
  link?: {
    id: string;
    href: string;
  };

  onClick?: () => void;
}

const NavbarComponent: FC<IPropsNAvbarComponent> = ({
  title,
  tag,
  link,
  onClick,
}) => {
  const pathname = usePathname();

  if (tag === "button")
    return (
      <button
        onClick={onClick}
        className="text-lg text-[--neutral-04] tracking-wider text-left"
      >
        {title}
      </button>
    );

  if (tag === "link")
    return (
      <Link
        href={link?.href || "/"}
        className={cn("text-[--neutral-04] text-lg tracking-wider", {
          "text-primary border-b border-primary":
            link?.id && pathname.includes(link?.id),
        })}
      >
        {title}
      </Link>
    );
};

export const ProfileNavbar: FC = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const currentPathname = parts.slice(0, -1).join("/");

  return (
    <div className="flex flex-col gap-5">
      <NavbarComponent
        tag="link"
        title="Аккаунт"
        link={{ id: "account", href: `${currentPathname}/account` }}
      />
      <NavbarComponent
        tag="link"
        title="Заказы"
        link={{ id: "orders", href: `${currentPathname}/orders` }}
      />
      <NavbarComponent tag="button" title="Выход" onClick={() => {}} />
    </div>
  );
};
