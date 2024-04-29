import { Logo } from "@/components/ui/logo";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="lg:flex items-center gap-[90px]">
      <div className="relative">
        <Image
          src={"/auth-image.jpg"}
          alt="auth image"
          width={1000}
          height={1000}
          className="h-svh"
        />

        <Logo className="absolute top-[32px] left-[50%] -translate-x-[50%]" />
      </div>

      <div className="w-full lg:px-20 px-8">{children}</div>
    </div>
  );
};

export default Layout;
