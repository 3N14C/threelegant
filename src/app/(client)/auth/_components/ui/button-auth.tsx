"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";

interface IProps {
  title: string;
  onClick: () => Promise<void | null>;
}

export const ButtonAuth: FC<IProps> = ({ title, onClick }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      size={"lg"}
      className="max-[845px]:mb-5"
    >
      {title}
    </Button>
  );
};
