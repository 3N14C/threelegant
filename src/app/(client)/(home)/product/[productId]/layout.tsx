"use client";

import { parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
  info: React.ReactNode;
  reviews: React.ReactNode;
}

const Layout: FC<IProps> = ({ children, info, reviews }) => {
  const [productPage] = useQueryState("productPage", parseAsString);

  return (
    <div className="lg:w-[1440px] lg:mx-auto">
      {children}
      <div className="">
        {productPage === "info" && info}
        {productPage === "reviews" && reviews}
      </div>
    </div>
  );
};

export default Layout;
