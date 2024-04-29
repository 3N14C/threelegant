import { ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";
import { FC } from "react";

interface IProps {
  title: string;
  href: string;
  type?: string;
}

export const LinkUnderline: FC<IProps> = ({ title, href, type }) => {
  if (type === "featured") {
    return (
      <p className="font-medium text-base underline underline-offset-8 flex items-center gap-2">
        {title} <ArrowRight className="w-4 h-4" />
      </p>
    );
  }

  return (
    <Link
      href={href}
      className="font-[500] text-base underline underline-offset-8 flex items-center gap-2"
    >
      {title} <ArrowRight className="w-4 h-4" />
    </Link>
  );
};
