"use client";

import { shopParams } from "@/constants/shop-params";
import { useViewOffer } from "@/store/offer-view-store";
import { ArrowRight, TicketPercent, X } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const OfferBanner: FC = () => {
  const { offerView, setOfferView } = useViewOffer();

  if (offerView) {
    return (
      <div className="flex items-center justify-center bg-[--neutral-03] h-12 relative gap-5">
        <TicketPercent size={32} className="text-[--neutral-07]" />
        <p className="flex items-center gap-2 text-[--neutral-05] lg:text-base text-[12px] font-semibold lg:leading-[157%] leading-[167%]">
          30% off storewide - Limited time!{" "}
          <Link
            href={`/shop?${shopParams}`}
            className="capitalize text-[--blue] font-medium text-base leading-[171%] border-b border-[--blue] lg:flex hidden items-center gap-2"
          >
            shop now <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
        <div
          onClick={() => setOfferView(false)}
          className="absolute right-4 cursor-pointer"
        >
          <X />
        </div>
      </div>
    );
  }
};
