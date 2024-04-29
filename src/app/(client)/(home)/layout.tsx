import { FC } from "react";
import { Header } from "./_components/header";
import { OfferBanner } from "./_components/ui/offer-banner";
import { ContactUsBanner } from "./_components/ui/contact-us-banner";
import { Footer } from "./_components/ui/footer";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="">
      <OfferBanner />

      <div className="lg:max-w-[1440px] lg:mx-auto">
        <Header />
      </div>

      <div className="">{children}</div>

      <div className="mt-[100px] lg:mx-0 mx-[40px]">
        <ContactUsBanner />
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
