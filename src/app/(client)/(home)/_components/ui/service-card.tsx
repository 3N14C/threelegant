import { FC } from "react";
import { icons } from "lucide-react";

interface IProps {
  icon: keyof typeof icons;
  title: string;
  body: string;
}

export const ServiceCard: FC<IProps> = ({ icon, title, body }) => {
  const Icon = icons[icon];

  return (
    <div className="bg-[--neutral-03] lg:h-[220px] h-[200px]">
      <div className="lg:m-[35px] mx-[16px] my-[32px] flex flex-col lg:gap-[22px] gap-[10px]">
        <Icon size={48} className="text-[--neutral-07]" />

        <p className="font-[500] lg:text-[20px] text-sm leading-[140%] text-[--neutral-07]">
          {title}
        </p>

        <p className="text-sm lg:leading-[171%] leading-[157%] text-[--neutral-04]">
          {body}
        </p>
      </div>
    </div>
  );
};
