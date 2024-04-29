import { FC } from "react";

export const SimplyText: FC = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
      <div className="capitalize font-[500] lg:text-[72px] text-[40px] text-[--neutral-07]">
        <p className="">
          simply unique<span className="text-[--neutral-04]">/</span>
        </p>
        <p className="">
          simply better<span className="text-[--neutral-04]">.</span>
        </p>
      </div>

      <p className="font-[600] lg:text-base text-[14px] text-[--neutral-05] lg:max-w-[425px]">
        3legant{" "}
        <span className="font-[400] text-[--neutral-04]">
          is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
        </span>
      </p>
    </div>
  );
};
