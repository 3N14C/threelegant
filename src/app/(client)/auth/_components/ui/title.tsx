import { FC } from "react";

interface IProps {
  title: string;
}

export const Title: FC<IProps> = ({ title }) => {
  return <p className="font-[500] lg:text-[40px text-[35px] text-[--neutral-07]">{title}</p>;
};
