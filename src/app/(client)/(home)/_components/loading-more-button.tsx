"use client";

import { FC } from "react";

interface IProps {
  onClick: () => void;
  // disabled?: boolean;
}

export const LoadingMoreButton: FC<IProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-[--neutral-07] py-[6px] px-10 rounded-full cursor-pointer"
    >
      <p className="font-medium text-base -tracking-[0.03rem] leading-[175%] text-[--neutral-07]">
        Show more
      </p>
    </div>
  );
};
