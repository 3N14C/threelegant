import Link from "next/link";
import { FC } from "react";

interface IProps {
  title: string;
  linkTitle: string;
  href: string;
}

export const Subtitle: FC<IProps> = ({ title, linkTitle, href }) => {
  return (
    <div className="flex items-center gap-2 text-[16px] font-[400]">
      <p className="text-[--neutral-04]">{title}</p>

      <Link className="text-[--green] font-[600]" href={href}>
        {linkTitle}
      </Link>
    </div>
  );
};
