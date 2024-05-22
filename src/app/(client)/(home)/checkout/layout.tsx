import { FC } from "react";
import { CheckoutNavigation } from "./_components/checkout-navigation";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="lg:max-w-[1440px] lg:mx-auto px-5">
      <div className="mt-20">
        <CheckoutNavigation />
      </div>

      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
