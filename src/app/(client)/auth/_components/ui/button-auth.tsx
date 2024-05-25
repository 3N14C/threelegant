"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => Promise<void | null>;
}

export const ButtonAuth: FC<IProps> = ({ children, onClick, ...props }) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      type="submit"
      size={"lg"}
      className="max-[845px]:mb-5"
    >
      {children}
    </Button>
  );
};
