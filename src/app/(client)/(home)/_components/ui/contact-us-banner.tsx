import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { FC } from "react";

export const ContactUsBanner: FC = () => {
  return (
    <div className="relative">
      <Image
        src={"/contact-us.jpg"}
        alt="contact us banner"
        width={3000}
        height={1000}
        className="w-full h-[360px] max-[845px]:hidden"
      />

      <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <div className="text-center flex flex-col gap-2">
          <p className="text-[--neutral-07] font-medium lg:text-[40px] text-[28px] -tracking-[0.01rem] leading-[110%] capitalize">
            join our newsletter
          </p>

          <p className="text-[--neutral-07] lg:text-[18px] text-sm leading-[167%]">
            Sign up for deals, new products and promotions
          </p>
        </div>

        <div className="lg:mt-[45px] my-[30px] flex items-center border-b border-[--neutral-04]">
          <Mail size={24} />
          <Input
            placeholder="Email address"
            className="text-base font-medium leading-[175%] -tracking-[0.03rem] text-[--neutral-04] bg-inherit"
          />
          <Link
            href={"/"}
            className="text-[16px] text-[--neutral-04] -tracking-[0.03rem] leading-[175%] font-medium"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};
