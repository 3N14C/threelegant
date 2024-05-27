"use client";

import { FC } from "react";
import { DesktopLayout } from "./_components/desktop-layout";
import { MobileLayout } from "./_components/mobile-layout";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="">
      <div className="lg:block hidden">
        <DesktopLayout>{children}</DesktopLayout>
      </div>

      <div className="block lg:hidden px-4">
        <MobileLayout>{children}</MobileLayout>
      </div>
    </div>
  );
};

export default Layout;
